// src/services/api.js

// The backend lists instruments by name but returns numeric IDs on each observation
const INSTRUMENT_IDS = {
    'sonde': 1,
    'argonaut': 2,
    'weather-station': 3
};

// Browsers allow ~6 concurrent HTTP/1.1 connections per host (the Lambda URL has no HTTP/2)
const MAX_CONCURRENT_REQUESTS = 6;
// Backend cost is ~2ms per observation, so small chunks fetched in parallel load much faster
const CHUNK_MS = 7 * 24 * 60 * 60 * 1000;
// DynamoDB caps each page at 1MB (~4500 observations) regardless of this value
const PAGE_LIMIT = 5000;

let activeRequests = 0;
const requestQueue = [];

const withRequestSlot = async (fn) => {
    if (activeRequests >= MAX_CONCURRENT_REQUESTS) {
        await new Promise(resolve => requestQueue.push(resolve));
    }
    activeRequests++;
    try {
        return await fn();
    } finally {
        activeRequests--;
        requestQueue.shift()?.();
    }
};

const chunkCache = new Map();

export const ApiService = {
    // Base API configuration
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1/sensors`,
    apiKey: process.env.NEXT_PUBLIC_API_KEY,

    // Helper method to make API calls
    async makeRequest(endpoint, params = {}, { signal } = {}) {
        const url = new URL(`${this.baseURL}${endpoint}`);

        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined) {
                url.searchParams.append(key, params[key]);
            }
        });

        return withRequestSlot(async () => {
            signal?.throwIfAborted();
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': this.apiKey
                },
                signal
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
            }

            return response.json();
        });
    },

    clearCache() {
        chunkCache.clear();
    },

    // Fetch observations with filtering
    async fetchObservations(filters = {}) {
        const {
            instrument,
            metric,
            medium,
            unit,
            startTime,
            endTime,
            limit = 1000
        } = filters;

        console.log('🎯 Fetching observations with filters:', filters);

        return await this.makeRequest('/observations', {
            instrument,
            metric,
            medium,
            unit,
            start_time: startTime,
            end_time: endTime,
            limit
        });
    },

    // Fetch every observation of one metric in [startTime, endTime], following pagination
    async fetchAllPages(metric, medium, startTime, endTime, { signal } = {}) {
        const observations = [];
        let nextToken = null;
        do {
            // Omitting the instrument makes the backend query the metric_id index directly;
            // with an instrument it scans every metric of that instrument and filters afterwards.
            const page = await this.makeRequest('/observations', {
                metric,
                medium,
                start_time: startTime,
                end_time: endTime,
                limit: PAGE_LIMIT,
                next_token: nextToken
            }, { signal });
            observations.push(...page.observations);
            nextToken = page.next_token;
        } while (nextToken);
        return observations;
    },

    // Fetch specific parameter data for LEWAS frontend, split into parallel time chunks
    async fetchParameterData(parameterConfig, startTime, endTime, { signal, onProgress } = {}) {
        const { metric, medium, instrument } = parameterConfig;
        const startMs = new Date(startTime).getTime();
        const endMs = new Date(endTime).getTime();

        const chunks = [];
        for (let t = startMs; t < endMs; t += CHUNK_MS) {
            chunks.push([new Date(t).toISOString(), new Date(Math.min(t + CHUNK_MS, endMs)).toISOString()]);
        }
        onProgress?.(chunks.length, 0);

        const fetchChunk = async (chunkStart, chunkEnd) => {
            const key = `${metric}|${medium}|${chunkStart}|${chunkEnd}`;
            while (true) {
                if (!chunkCache.has(key)) {
                    const request = this.fetchAllPages(metric, medium, chunkStart, chunkEnd, { signal });
                    chunkCache.set(key, request);
                    request.catch(() => chunkCache.delete(key));
                }
                try {
                    return await chunkCache.get(key);
                } catch (error) {
                    // A cached request started by an earlier, cancelled load: retry with our own signal
                    if (error.name !== 'AbortError' || signal?.aborted) throw error;
                }
            }
        };

        const results = await Promise.all(chunks.map(async ([chunkStart, chunkEnd]) => {
            const chunkObservations = await fetchChunk(chunkStart, chunkEnd);
            onProgress?.(0, 1);
            return chunkObservations;
        }));

        // Chunk boundaries are inclusive on both ends, so drop repeated timestamps
        const instrumentId = INSTRUMENT_IDS[instrument];
        let lastTimestamp = null;
        const observations = results.flat().filter(o => {
            if (instrumentId && o.instrument_id !== instrumentId) return false;
            if (o.timestamp === lastTimestamp) return false;
            lastTimestamp = o.timestamp;
            return true;
        });

        return { observations, count: observations.length };
    },

    // Test connection to backend
    async testConnection() {
        try {
            console.log('🔗 Testing connection to backend...');
            console.log('Base URL:', this.baseURL);

            // Try to fetch just the base URL or a simple endpoint
            const response = await fetch(this.baseURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': this.apiKey
                }
            });

            console.log('Connection test status:', response.status);
            return response.ok;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }
};

// Parameter configuration mapping from frontend to backend
export const PARAMETER_CONFIG = {
    // Water Quantity Parameters
    'stage': {
        metric: 'velocity-z',
        medium: 'water',
        instrument: 'argonaut',
        processing: 'stage_correction'
    },
    'smoothed_velocity': {
        metric: 'velocity-x',
        medium: 'water',
        instrument: 'argonaut',
        processing: 'smoothed_velocity'
    },
    'flow_rate': {
        metric: 'velocity-x',
        medium: 'water',
        instrument: 'argonaut',
        processing: 'flow_rate_calculation'
    },
    'downstream_velocity': {
        metric: 'velocity-x',
        medium: 'water',
        instrument: 'argonaut',
        processing: 'velocity_correction'
    },

    // Water Quality Parameters
    'ph': {
        metric: 'ph',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },
    'specific_conductance': {
        metric: 'specific-conductance',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },
    'salinity': {
        metric: 'salinity',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },
    'turbidity': {
        metric: 'turbidity',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },
    'dissolved_oxygen': {
        metric: 'ldo',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },
    'water_temperature': {
        metric: 'temperature',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },
    'orp': {
        metric: 'redox',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },

    // Weather Parameters
    'air_temperature': {
        metric: 'temperature',
        medium: 'air',
        instrument: 'weather-station',
        processing: 'none'
    },
    'humidity': {
        metric: 'humidity',
        medium: 'air',
        instrument: 'weather-station',
        processing: 'none'
    },
    'air_pressure': {
        metric: 'pressure',
        medium: 'air',
        instrument: 'weather-station',
        processing: 'pressure_correction'
    },
    'rain_intensity': {
        metric: 'intensity',
        medium: 'rain',
        instrument: 'weather-station',
        processing: 'none'
    },
    'rain_accumulation': {
        metric: 'accumulation',
        medium: 'rain',
        instrument: 'weather-station',
        processing: 'none'
    },
    'rain_duration': {
        metric: 'duration',
        medium: 'rain',
        instrument: 'weather-station',
        processing: 'none'
    }
};

// Helper functions
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
};

export const formatDateForAPI = (date) => {
    return date.toISOString();
};

export const getYesterdaysDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
};

export const parseStartDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day, 0, 0, 0);
};

export const parseEndDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day, 23, 59, 59);
};