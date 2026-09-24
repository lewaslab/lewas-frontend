// pages/live-data.js - Improved styling and functionality
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Layout from '../components/Layout';
import { ApiService, PARAMETER_CONFIG } from '../services/api';
import { dataProcessor } from '../utils/dataProcessor';

const DAY_MS = 24 * 60 * 60 * 1000;
// Earliest observation in the database (the station's data starts on this date)
const FIRST_DATA_DATE = new Date(2025, 3, 15);

// Local-time YYYY-MM-DD, the format used by <input type="date">
const toDateInputValue = (date) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const fromDateInputValue = (value, endOfDay) => {
    const [year, month, day] = value.split('-').map(Number);
    return endOfDay
        ? new Date(year, month - 1, day, 23, 59, 59, 999)
        : new Date(year, month - 1, day, 0, 0, 0, 0);
};

const LiveDataPage = () => {
    // State management
    const [unitSystem, setUnitSystem] = useState('US');
    const [selectedParameters, setSelectedParameters] = useState({
        axis1: 'water_temperature',
        axis2: 'dissolved_oxygen',
        axis3: 'air_temperature'
    });
    const [showAxis, setShowAxis] = useState({
        axis2: true,
        axis3: true
    });
    const [timeRange, setTimeRange] = useState('1day');
    const [dateRange, setDateRange] = useState(() => {
        const end = new Date();
        return { start: new Date(end.getTime() - DAY_MS), end };
    });
    // Date picker values; only applied to dateRange when "Update Chart" is clicked
    const [dateInputs, setDateInputs] = useState(() => ({
        start: toDateInputValue(dateRange.start),
        end: toDateInputValue(dateRange.end)
    }));
    const [dateError, setDateError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState({ total: 0, done: 0 });
    const [data, setData] = useState({});
    const abortRef = useRef(null);

    // D3 refs
    const svgRef = useRef();
    const containerRef = useRef();

    // Much larger chart dimensions for better visibility
    const margin = { left: 200, right: 400, top: 80, bottom: 100 };
    const width = 1400 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Parameter options for dropdowns
    const parameterOptions = {
        'Water Quantity': [
            { value: 'stage', label: 'Stage' },
            { value: 'smoothed_velocity', label: 'Smoothed Velocity' },
            { value: 'flow_rate', label: 'Est. Flow Rate' },
            { value: 'flow_rate_rating_curve', label: 'Est. Flowrate - Rating Curve' },
            { value: 'downstream_velocity', label: 'Downstream Velocity' }
        ],
        'Water Quality': [
            { value: 'ph', label: 'pH' },
            { value: 'specific_conductance', label: 'Specific conductance' },
            { value: 'salinity', label: 'Salinity' },
            { value: 'turbidity', label: 'Turbidity' },
            { value: 'dissolved_oxygen', label: 'DO' },
            { value: 'water_temperature', label: 'Water temp.' },
            { value: 'orp', label: 'ORP' }
        ],
        'Weather': [
            { value: 'air_temperature', label: 'Air temp.' },
            { value: 'humidity', label: 'Humidity' },
            { value: 'air_pressure', label: 'Air pressure' },
            { value: 'rain_intensity', label: 'Rain Intensity' },
            { value: 'rain_accumulation', label: 'Rain Accumulation' },
            { value: 'rain_duration', label: 'Rain Duration' }
        ]
    };

    const applyDateRange = (start, end) => {
        setDateRange({ start, end });
        setDateInputs({ start: toDateInputValue(start), end: toDateInputValue(end) });
        setDateError('');
    };

    // Load data when parameters change
    useEffect(() => {
        loadAllData();
    }, [selectedParameters, dateRange, unitSystem, showAxis]);

    useEffect(() => () => abortRef.current?.abort(), []);

    // Update chart when data changes
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            updateChart();
        }
    }, [data, showAxis]);

    // Initialize chart on mount
    useEffect(() => {
        initializeChart();
    }, []);

    // Load data for all selected parameters
    const loadAllData = async () => {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;
        const fetchOptions = {
            signal: controller.signal,
            onProgress: (addTotal, addDone) => setProgress(prev => ({
                total: prev.total + addTotal,
                done: prev.done + addDone
            }))
        };

        setIsLoading(true);
        setProgress({ total: 0, done: 0 });
        try {
            console.log('Loading data with date range:', {
                start: dateRange.start.toISOString(),
                end: dateRange.end.toISOString()
            });

            const axesToLoad = Object.entries(selectedParameters)
                .filter(([axis, parameterType]) => parameterType && (axis === 'axis1' || showAxis[axis]));

            const loaded = await Promise.all(axesToLoad.map(async ([axis, parameterType]) => {
                const parameterData = await loadParameterData(parameterType, fetchOptions);
                console.log(`Loaded ${parameterData.length} points for ${parameterType}`);
                const aggregate = parameterType.startsWith('rain_') ? 'max' : 'mean';
                return [axis, dataProcessor.prepareForChart(parameterData, { aggregate })];
            }));

            if (controller.signal.aborted) return;
            setData(Object.fromEntries(loaded));
        } catch (error) {
            if (controller.signal.aborted) return;
            console.error('Error loading data:', error);
            alert('Error loading data: ' + error.message);
        } finally {
            if (abortRef.current === controller) setIsLoading(false);
        }
    };

    // Load rating curve flow rate data based on stage
    const loadRatingCurveFlowRate = async (fetchOptions) => {
        try {
            // Get stage data first
            const stageConfig = PARAMETER_CONFIG['stage'];
            if (!stageConfig) {
                console.error('No stage config found for rating curve calculation');
                return [];
            }

            const startTime = dateRange.start.toISOString();
            const endTime = dateRange.end.toISOString();
            console.log('Fetching stage data for rating curve calculation:', stageConfig);

            const response = await ApiService.fetchParameterData(stageConfig, startTime, endTime, fetchOptions);
            console.log('Raw stage response for rating curve:', response);

            if (!response.observations || response.observations.length === 0) {
                console.warn('No stage data found for rating curve calculation');
                return [];
            }

            console.log(`Found ${response.observations.length} stage observations for rating curve`);

            // Process stage data
            let processedStageData = dataProcessor.processParameterData(
                response.observations,
                'stage',
                'SI' // Always process in SI for the formula
            );

            // Apply rating curve formula: Q (m³/s) = 1.27 × Stage (m) ^ 4.19
            const ratingCurveData = processedStageData.map(point => {
                const stageInMeters = point.value; // Stage is already in meters from SI processing
                const flowRateInCubicMetersPerSecond = 1.27 * Math.pow(stageInMeters, 4.19);
                
                // Convert to US units if needed
                let finalFlowRate;
                if (unitSystem === 'US') {
                    // Convert m³/s to ft³/s (1 m³ = 35.3147 ft³)
                    finalFlowRate = flowRateInCubicMetersPerSecond * 35.3147;
                } else {
                    finalFlowRate = flowRateInCubicMetersPerSecond;
                }

                return {
                    ...point,
                    value: finalFlowRate
                };
            });

            console.log(`Calculated ${ratingCurveData.length} rating curve flow rate points`);
            console.log('Sample rating curve data:', ratingCurveData.slice(0, 2));

            // Format for visualization
            const formattedData = dataProcessor.formatForVisualization(ratingCurveData);
            console.log(`After formatting: ${formattedData.length} rating curve points`);

            return formattedData;
        } catch (error) {
            if (error.name === 'AbortError') return [];
            console.error('Error calculating rating curve flow rate:', error);
            return [];
        }
    };

    // Load data for a specific parameter
    const loadParameterData = async (parameterType, fetchOptions) => {
        // Special handling for rating curve flow rate
        if (parameterType === 'flow_rate_rating_curve') {
            return await loadRatingCurveFlowRate(fetchOptions);
        }

        const config = PARAMETER_CONFIG[parameterType];
        if (!config) {
            console.error(`No config found for parameter: ${parameterType}`);
            return [];
        }

        try {
            const startTime = dateRange.start.toISOString();
            const endTime = dateRange.end.toISOString();
            console.log(`Fetching ${parameterType}:`, config);

            const response = await ApiService.fetchParameterData(config, startTime, endTime, fetchOptions);
            console.log(`Raw response for ${parameterType}:`, response);

            if (!response.observations || response.observations.length === 0) {
                console.warn(`No data found for parameter: ${parameterType}`);
                return [];
            }

            console.log(`Found ${response.observations.length} raw observations for ${parameterType}`);
            console.log('Sample raw data:', response.observations.slice(0, 2));

            // Process the data
            let processedData = dataProcessor.processParameterData(
                response.observations,
                parameterType,
                unitSystem
            );
            console.log(`After processing: ${processedData.length} points for ${parameterType}`);

            // Format for visualization - this now handles your timestamp field correctly
            const formattedData = dataProcessor.formatForVisualization(processedData);
            console.log(`After formatting: ${formattedData.length} points for ${parameterType}`);
            console.log('Sample formatted data:', formattedData.slice(0, 2));

            return formattedData;
        } catch (error) {
            if (error.name === 'AbortError') return [];
            console.error(`Error loading data for ${parameterType}:`, error);
            return [];
        }
    };

    // Initialize D3 chart
    const initializeChart = () => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // Set up SVG dimensions
        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("background-color", "white");

        // Create main group
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add title
        g.append("text")
            .attr("class", "chart-title")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", -margin.top / 2)
            .style("font-size", "22px")
            .style("font-weight", "bold")
            .style("fill", "#333")
            .text("Interactive Live LEWAS Data");

        // Create tooltip
        d3.select(containerRef.current)
            .selectAll(".tooltip")
            .data([null])
            .join("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("padding", "10px")
            .style("background", "rgba(0, 0, 0, 0.9)")
            .style("color", "white")
            .style("border-radius", "6px")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("font-size", "12px")
            .style("z-index", 1000)
            .style("box-shadow", "0 4px 8px rgba(0,0,0,0.3)")
            .style("min-width", "120px");
    };

    // Update chart with current data
    const updateChart = () => {
        const svg = d3.select(svgRef.current);
        const g = svg.select("g");

        // Clear existing content except title
        g.selectAll(".axis").remove();
        g.selectAll(".dots").remove();
        g.selectAll(".bars").remove();
        g.selectAll(".axis-label").remove();
        g.selectAll(".line-path").remove();
        g.selectAll(".no-data").remove();

        // Colors for each axis
        const colors = ["steelblue", "red", "green"];

        // Get all data points to set domain
        const allData = Object.values(data).flat();
        console.log('All data for chart:', allData.length, 'points');

        if (allData.length === 0) {
            g.append("text")
                .attr("class", "no-data")
                .attr("x", width / 2)
                .attr("y", height / 2)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("fill", "#666")
                .text("No data available. Try changing the time range or updating the chart.");
            return;
        }

        // Set up scales
        const xScale = d3.scaleTime().range([0, width]);
        const yScales = [
            d3.scaleLinear().range([height, 0]),
            d3.scaleLinear().range([height, 0]),
            d3.scaleLinear().range([height, 0])
        ];

        // Set x domain
        const xExtent = d3.extent(allData, d => d.x);
        console.log('Time extent:', xExtent);
        xScale.domain(xExtent);

        // Determine appropriate time format based on data range
        const timeSpan = xExtent[1] - xExtent[0];
        const hours = timeSpan / (1000 * 60 * 60);
        let timeFormat, tickCount;

        if (hours <= 2) {
            timeFormat = d3.timeFormat("%H:%M");
            tickCount = 6;
        } else if (hours <= 24) {
            timeFormat = d3.timeFormat("%H:%M");
            tickCount = 8;
        } else if (hours <= 72) {
            timeFormat = d3.timeFormat("%m/%d %H:%M");
            tickCount = 6;
        } else if (hours <= 24 * 90) {
            timeFormat = d3.timeFormat("%m/%d");
            tickCount = 8;
        } else {
            timeFormat = d3.timeFormat("%b %Y");
            tickCount = 10;
        }
        const tooltipTimeFormat = hours <= 72
            ? d3.timeFormat("%a %I:%M %p")
            : d3.timeFormat("%b %d, %Y %I:%M %p");

        // Create x-axis
        const xAxis = d3.axisBottom(xScale)
            .ticks(tickCount)
            .tickFormat(timeFormat)
            .tickSize(-height)
            .tickPadding(10);

        g.append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis)
            .selectAll("line")
            .style("stroke", "#e0e0e0")
            .style("stroke-width", 1);

        // Style x-axis
        g.select(".x-axis")
            .selectAll("text")
            .style("fill", "#666")
            .style("font-size", "12px");

        // Add x-axis label
        g.append("text")
            .attr("class", "axis-label")
            .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 20})`)
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .style("fill", "#333")
            .text("Time (EDT)");

        // Create tooltip
        const tooltip = d3.select(containerRef.current).select(".tooltip");

        // Process each axis
        Object.entries(data).forEach(([axis, seriesData], index) => {
            // seriesData contains { y: null } gap markers; axisData is only the real points
            const axisData = seriesData.filter(d => d.y != null);
            if (axisData.length === 0) return;

            console.log(`Processing axis ${index} (${axis}):`, axisData.length, 'points');

            // Set y domain with buffer
            const yExtent = d3.extent(axisData, d => d.y);
            const buffer = Math.max((yExtent[1] - yExtent[0]) * 0.1, 0.01);
            
            // For rain intensity, invert the scale (zero at top, increasing toward bottom)
            if (selectedParameters[axis] === 'rain_intensity') {
                yScales[index].domain([yExtent[1] + buffer, 0]);
            } else if (selectedParameters[axis] === 'stage') {
                // For stage, add natural margin at the top based on unit system
                const naturalMargin = unitSystem === 'SI' ? 0.5 : 2; // 0.5m for SI, 2ft for US
                yScales[index].domain([0, yExtent[1] + naturalMargin]);
            } else if (selectedParameters[axis] === 'flow_rate_rating_curve') {
                // For rating curve flow rate, add natural margin at the top based on unit system
                const naturalMargin = unitSystem === 'SI' ? 0.5 : 2; // 0.5 m³/s for SI, 2 ft³/s for US
                yScales[index].domain([0, yExtent[1] + naturalMargin]);
            } else {
                yScales[index].domain([yExtent[0] - buffer, yExtent[1] + buffer]);
            }

            // Create y axis
            const yAxis = d3.axisLeft(yScales[index])
                .ticks(8)
                .tickSize(index === 0 ? -width : 0)
                .tickPadding(10);

            // Much better y-axis positioning with generous spacing
            const yAxisPos = index === 0 ? 0 : (index === 1 ? width + 100 : width + 280);

            const yAxisGroup = g.append("g")
                .attr("class", `axis y-axis y${index + 1}-axis`)
                .attr("transform", `translate(${yAxisPos}, 0)`)
                .call(yAxis);

            // Style y-axis
            yAxisGroup.selectAll("line")
                .style("stroke", index === 0 ? "#e0e0e0" : colors[index])
                .style("stroke-width", 1);

            yAxisGroup.selectAll("text")
                .style("fill", colors[index])
                .style("font-size", "12px")
                .style("font-weight", "bold");

            // Add y-axis label with perfect alignment to axis tick numbers
            let labelX, textAnchor;
            if (index === 0) {
                // Left axis - center above the tick numbers (which are positioned to the left)
                labelX = -40;
                textAnchor = "middle";
            } else {
                // Right axes - center above their tick numbers (which are positioned to the right)
                labelX = yAxisPos + 30;
                textAnchor = "middle";
            }
            const labelY = -40;

            g.append("text")
                .attr("class", "axis-label")
                .attr("transform", `translate(${labelX}, ${labelY})`)
                .style("text-anchor", textAnchor)
                .style("font-size", "13px")
                .style("fill", colors[index])
                .style("font-weight", "bold")
                .text(getParameterLabel(selectedParameters[axis], unitSystem));

            // Check if this is rain intensity - render as bars instead of line
            const isRainIntensity = selectedParameters[axis] === 'rain_intensity';
            
            if (isRainIntensity) {
                // Render rain intensity as bars spanning between mid-points
                // Calculate bar positions and widths based on adjacent data points
                // Cap bar half-width so bars next to an outage don't stretch across it
                const maxHalfWidth = Math.max(2, width / axisData.length);
                const bars = axisData.map((d, i) => {
                    let xStart, xEnd;
                    
                    if (i === 0) {
                        // First bar: from start of chart to midpoint with next point
                        xStart = 0;
                        xEnd = axisData.length > 1 ? 
                            (xScale(d.x) + xScale(axisData[i + 1].x)) / 2 : 
                            xScale(d.x) + (width / axisData.length) / 2;
                    } else if (i === axisData.length - 1) {
                        // Last bar: from midpoint with previous point to end of chart
                        xStart = (xScale(axisData[i - 1].x) + xScale(d.x)) / 2;
                        xEnd = width;
                    } else {
                        // Middle bars: from midpoint with previous to midpoint with next
                        xStart = (xScale(axisData[i - 1].x) + xScale(d.x)) / 2;
                        xEnd = (xScale(d.x) + xScale(axisData[i + 1].x)) / 2;
                    }
                    xStart = Math.max(xStart, xScale(d.x) - maxHalfWidth);
                    xEnd = Math.min(xEnd, xScale(d.x) + maxHalfWidth);
                    
                    // For rain intensity with inverted scale: bars start from top (y=0) and extend down
                    const barY = 0; // Start from top of chart
                    const barHeight = yScales[index](d.y); // Height extends down from top
                    
                    return {
                        data: d,
                        x: xStart,
                        width: xEnd - xStart,
                        y: barY,
                        height: barHeight
                    };
                });
                
                g.selectAll(`.bars-${index}`)
                    .data(bars)
                    .join("rect")
                    .attr("class", `bars bars-${index}`)
                    .attr("x", d => d.x)
                    .attr("y", d => d.y)
                    .attr("width", d => Math.max(1, d.width)) // Ensure minimum width of 1px
                    .attr("height", d => d.height)
                    .style("fill", colors[index])
                    .style("opacity", 0.7)
                    .style("cursor", "pointer")
                    .on("mouseover", function (event, d) {
                        // Get container bounds for better positioning
                        const containerBounds = containerRef.current.getBoundingClientRect();
                        const chartBounds = svgRef.current.getBoundingClientRect();

                        // Calculate position relative to the chart container
                        const x = event.clientX - containerBounds.left;
                        const y = event.clientY - containerBounds.top;

                        // Adjust tooltip position to stay within bounds
                        const tooltipX = Math.min(x + 15, containerBounds.width - 150);
                        const tooltipY = Math.max(y - 70, 10);

                        tooltip.transition()
                            .duration(200)
                            .style("opacity", 0.95);

                        tooltip.html(`
                            <div style="font-weight: bold; margin-bottom: 5px;">
                                ${getParameterLabel(selectedParameters[axis], unitSystem)}
                            </div>
                            <div style="margin-bottom: 3px;">
                                ${tooltipTimeFormat(d.data.x)}
                            </div>
                            <div style="font-size: 14px; font-weight: bold;">
                                ${d.data.y.toFixed(2)} ${getUnitAbbr(selectedParameters[axis], unitSystem)}
                            </div>
                        `)
                            .style("background", colors[index])
                            .style("left", tooltipX + "px")
                            .style("top", tooltipY + "px");

                        d3.select(this)
                            .transition()
                            .duration(100)
                            .style("opacity", 1);
                    })
                    .on("mouseout", function (event, d) {
                        tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);

                        d3.select(this)
                            .transition()
                            .duration(200)
                            .style("opacity", 0.7);
                    });
            } else {
                // Create line generator for non-rain intensity parameters
                const line = d3.line()
                    .defined(d => d.y != null)
                    .x(d => xScale(d.x))
                    .y(d => yScales[index](d.y))
                    .curve(d3.curveMonotoneX);

                // Add line path
                g.append("path")
                    .datum(seriesData)
                    .attr("class", `line-path line-${index}`)
                    .attr("fill", "none")
                    .attr("stroke", colors[index])
                    .attr("stroke-width", 2)
                    .attr("opacity", 0.8)
                    .attr("d", line);
            }

            // Add data points (only for non-rain intensity parameters)
            if (!isRainIntensity) {
                const dotRadius = axisData.length > 500 ? 1.5 : 3;
                g.selectAll(`.dots-${index}`)
                    .data(axisData)
                    .join("circle")
                    .attr("class", `dots dots-${index}`)
                    .attr("cx", d => xScale(d.x))
                    .attr("cy", d => yScales[index](d.y))
                    .attr("r", dotRadius)
                    .style("fill", colors[index])
                    .style("stroke", dotRadius < 3 ? "none" : "white")
                    .style("stroke-width", 1)
                    .style("cursor", "pointer")
                    .on("mouseover", function (event, d) {
                        // Get container bounds for better positioning
                        const containerBounds = containerRef.current.getBoundingClientRect();
                        const chartBounds = svgRef.current.getBoundingClientRect();

                        // Calculate position relative to the chart container
                        const x = event.clientX - containerBounds.left;
                        const y = event.clientY - containerBounds.top;

                        // Adjust tooltip position to stay within bounds
                        const tooltipX = Math.min(x + 15, containerBounds.width - 150);
                        const tooltipY = Math.max(y - 70, 10);

                        tooltip.transition()
                            .duration(200)
                            .style("opacity", 0.95);

                        tooltip.html(`
                            <div style="font-weight: bold; margin-bottom: 5px;">
                                ${getParameterLabel(selectedParameters[axis], unitSystem)}
                            </div>
                            <div style="margin-bottom: 3px;">
                                ${tooltipTimeFormat(d.x)}
                            </div>
                            <div style="font-size: 14px; font-weight: bold;">
                                ${d.y.toFixed(2)} ${getUnitAbbr(selectedParameters[axis], unitSystem)}
                            </div>
                        `)
                            .style("background", colors[index])
                            .style("left", tooltipX + "px")
                            .style("top", tooltipY + "px");

                        d3.select(this)
                            .transition()
                            .duration(100)
                            .attr("r", 6)
                            .style("stroke-width", 2);
                    })
                    .on("mouseout", function (event, d) {
                        tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);

                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr("r", dotRadius)
                            .style("stroke-width", 1);
                    });
            }
        });
    };

    // Get parameter label
    const getParameterLabel = (parameterType, unitSystem) => {
        const labels = {
            'stage': `Stage [${unitSystem === 'US' ? 'ft' : 'm'}]`,
            'smoothed_velocity': `Smoothed Velocity [${unitSystem === 'US' ? 'ft/s' : 'm/s'}]`,
            'flow_rate': `Est. Flow Rate [${unitSystem === 'US' ? 'ft³/s' : 'm³/s'}]`,
            'flow_rate_rating_curve': `Est. Flowrate - Rating Curve [${unitSystem === 'US' ? 'ft³/s' : 'm³/s'}]`,
            'downstream_velocity': `Downstream Velocity [${unitSystem === 'US' ? 'ft/s' : 'm/s'}]`,
            'ph': 'pH',
            'specific_conductance': 'Specific Conductance [μS/cm]',
            'salinity': 'Salinity [ppt]',
            'turbidity': 'Turbidity [NTU]',
            'dissolved_oxygen': 'Dissolved Oxygen [mg/l]',
            'water_temperature': `Water Temperature [${unitSystem === 'US' ? '°F' : '°C'}]`,
            'orp': 'Oxidation Reduct. Potent. [mV]',
            'air_temperature': `Air Temperature [${unitSystem === 'US' ? '°F' : '°C'}]`,
            'humidity': 'Humidity [%RH]',
            'air_pressure': `Air Pressure [${unitSystem === 'US' ? 'inHg' : 'hPa'}]`,
            'rain_intensity': `Rain Intensity [${unitSystem === 'US' ? 'in/h' : 'mm/h'}]`,
            'rain_accumulation': `Rain Accumulation [${unitSystem === 'US' ? 'in' : 'mm'}]`,
            'rain_duration': 'Rain Duration [s]'
        };
        return labels[parameterType] || parameterType;
    };

    // Get unit abbreviation
    const getUnitAbbr = (parameterType, unitSystem) => {
        const units = {
            'stage': unitSystem === 'US' ? 'ft' : 'm',
            'smoothed_velocity': unitSystem === 'US' ? 'ft/s' : 'm/s',
            'flow_rate': unitSystem === 'US' ? 'ft³/s' : 'm³/s',
            'flow_rate_rating_curve': unitSystem === 'US' ? 'ft³/s' : 'm³/s',
            'downstream_velocity': unitSystem === 'US' ? 'ft/s' : 'm/s',
            'ph': '',
            'specific_conductance': 'μS/cm',
            'salinity': 'ppt',
            'turbidity': 'NTU',
            'dissolved_oxygen': 'mg/l',
            'water_temperature': unitSystem === 'US' ? '°F' : '°C',
            'orp': 'mV',
            'air_temperature': unitSystem === 'US' ? '°F' : '°C',
            'humidity': '%RH',
            'air_pressure': unitSystem === 'US' ? 'inHg' : 'hPa',
            'rain_intensity': unitSystem === 'US' ? 'in/h' : 'mm/h',
            'rain_accumulation': unitSystem === 'US' ? 'in' : 'mm',
            'rain_duration': 's'
        };
        return units[parameterType] || '';
    };

    // Handle parameter selection change
    const handleParameterChange = (axis, value) => {
        setSelectedParameters(prev => ({
            ...prev,
            [axis]: value
        }));
    };

    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
        if (range === 'custom') return;

        const end = new Date();
        const presetDays = { '1day': 1, '7days': 7, '30days': 30 };
        const start = range === 'all'
            ? FIRST_DATA_DATE
            : new Date(end.getTime() - presetDays[range] * DAY_MS);

        applyDateRange(start, end);
    };

    // Editing the dates only updates the pickers; nothing loads until "Update Chart"
    const handleDateInputChange = (field, value) => {
        setDateInputs(prev => ({ ...prev, [field]: value }));
        setTimeRange('custom');
        setDateError('');
    };

    const handleUpdateChart = () => {
        ApiService.clearCache();
        if (timeRange !== 'custom') {
            handleTimeRangeChange(timeRange);
            return;
        }

        if (!dateInputs.start || !dateInputs.end) {
            setDateError('Pick both a "From" and a "To" date.');
            return;
        }
        const start = fromDateInputValue(dateInputs.start, false);
        const end = new Date(Math.min(fromDateInputValue(dateInputs.end, true).getTime(), Date.now()));
        if (start >= end) {
            setDateError('"From" must be before "To".');
            return;
        }
        setDateError('');
        setDateRange({ start, end });
    };

    // Render dropdown options
    const renderParameterOptions = () => {
        return Object.entries(parameterOptions).map(([category, options]) => (
            <optgroup key={category} label={category}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </optgroup>
        ));
    };

    return (
        <Layout title="LEWAS Live Data - Interactive Environmental Monitoring">
            <div ref={containerRef} className="lewas-container">
                <div className="chart-section">
                    <svg ref={svgRef} />
                </div>

                <div className="controls-container">
                    <div className="control-row">
                        <div className="control-group">
                            <label>Units:</label>
                            <select
                                value={unitSystem}
                                onChange={(e) => setUnitSystem(e.target.value)}
                            >
                                <option value="SI">SI</option>
                                <option value="US">Common US</option>
                            </select>
                        </div>

                        <div className="control-group">
                            <label>Time Range:</label>
                            <select
                                value={timeRange}
                                onChange={(e) => handleTimeRangeChange(e.target.value)}
                            >
                                <option value="1day">Past 24 hours</option>
                                <option value="7days">Past 7 days</option>
                                <option value="30days">Past 30 days</option>
                                <option value="all">All available data</option>
                                <option value="custom">Custom range</option>
                            </select>
                        </div>

                        <div className="control-group">
                            <label htmlFor="date-from">From:</label>
                            <input
                                id="date-from"
                                type="date"
                                value={dateInputs.start}
                                min={toDateInputValue(FIRST_DATA_DATE)}
                                max={dateInputs.end || undefined}
                                onChange={(e) => handleDateInputChange('start', e.target.value)}
                            />
                            <label htmlFor="date-to" className="inline-label">To:</label>
                            <input
                                id="date-to"
                                type="date"
                                value={dateInputs.end}
                                min={dateInputs.start || undefined}
                                max={toDateInputValue(new Date())}
                                onChange={(e) => handleDateInputChange('end', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="range-hint">
                        {dateError ? (
                            <span className="range-error">{dateError}</span>
                        ) : (
                            <>
                                Data is available from <strong>Apr 15, 2025</strong>. For a custom range, pick
                                the dates and click <strong>Update Chart</strong>.
                                {timeRange === 'all' && ' Loading all data can take up to a minute.'}
                            </>
                        )}
                    </div>

                    <div className="control-row">
                        <div className="control-group">
                            <label style={{ color: 'steelblue', fontWeight: 'bold' }}>Axis 1:</label>
                            <select
                                value={selectedParameters.axis1}
                                onChange={(e) => handleParameterChange('axis1', e.target.value)}
                                style={{ color: 'steelblue' }}
                            >
                                {renderParameterOptions()}
                            </select>
                        </div>
                    </div>

                    <div className="control-row">
                        <div className="control-group">
                            <label style={{ color: 'red', fontWeight: 'bold' }}>Axis 2:</label>
                            <select
                                value={selectedParameters.axis2}
                                onChange={(e) => handleParameterChange('axis2', e.target.value)}
                                style={{ color: 'red' }}
                            >
                                {renderParameterOptions()}
                            </select>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={showAxis.axis2}
                                    onChange={(e) => setShowAxis(prev => ({ ...prev, axis2: e.target.checked }))}
                                />
                                Show?
                            </label>
                        </div>
                    </div>

                    <div className="control-row">
                        <div className="control-group">
                            <label style={{ color: 'green', fontWeight: 'bold' }}>Axis 3:</label>
                            <select
                                value={selectedParameters.axis3}
                                onChange={(e) => handleParameterChange('axis3', e.target.value)}
                                style={{ color: 'green' }}
                            >
                                {renderParameterOptions()}
                            </select>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={showAxis.axis3}
                                    onChange={(e) => setShowAxis(prev => ({ ...prev, axis3: e.target.checked }))}
                                />
                                Show?
                            </label>
                        </div>
                    </div>

                    <div className="control-row action-row">
                        <button onClick={handleUpdateChart} disabled={isLoading} className="action-btn">
                            {isLoading ? 'Updating Chart...' : 'Update Chart'}
                        </button>
                    </div>
                </div>

                {isLoading && (
                    <div className="loading-overlay">
                        <div className="loading-spinner">
                            <div>Loading LEWAS data...</div>
                            <div className="spinner-animation"></div>
                            {progress.total > 1 && (
                                <div className="loading-progress">
                                    {Math.round((100 * progress.done) / progress.total)}% loaded
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .lewas-container {
                    max-width: 1800px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: "Franklin Gothic", Arial, sans-serif;
                    position: relative;
                }

                .chart-section {
                    background: white;
                    border: 2px solid #ddd;
                    border-radius: 10px;
                    padding: 30px;
                    margin-bottom: 30px;
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                    overflow-x: auto;
                    min-width: 1600px;
                }

                .controls-container {
                    background: linear-gradient(145deg, #f8f9fa, #e9ecef);
                    border: 1px solid #dee2e6;
                    border-radius: 12px;
                    padding: 25px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .control-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 25px;
                    align-items: center;
                    margin-bottom: 20px;
                    padding: 10px 0;
                }

                .control-row:last-child {
                    margin-bottom: 0;
                }

                .action-row {
                    justify-content: center;
                    padding: 15px 0;
                    border-top: 1px solid #dee2e6;
                    margin-top: 10px;
                }

                .control-group {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: white;
                    padding: 12px 15px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    border: 1px solid #e9ecef;
                }

                .control-group label {
                    font-weight: bold;
                    min-width: 80px;
                    font-size: 14px;
                }

                .checkbox-label {
                    min-width: auto !important;
                    font-size: 13px !important;
                    margin-left: 10px;
                }

                .control-group select {
                    padding: 10px 14px;
                    border: 2px solid #e9ecef;
                    border-radius: 6px;
                    font-size: 14px;
                    min-width: 200px;
                    background: white;
                    font-weight: 500;
                    transition: all 0.2s ease;
                }

                .control-group input[type="date"] {
                    padding: 8px 12px;
                    border: 2px solid #e9ecef;
                    border-radius: 6px;
                    font-size: 14px;
                    font-family: inherit;
                    background: white;
                }

                .control-group .inline-label {
                    min-width: auto;
                }

                .range-hint {
                    font-size: 13px;
                    color: #555;
                    margin: -10px 0 20px;
                }

                .range-error {
                    color: #c0392b;
                    font-weight: bold;
                }

                .loading-progress {
                    margin-top: 15px;
                    font-size: 14px;
                    color: #555;
                }

                .control-group select:focus,
                .control-group input[type="date"]:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                }

                .control-group input[type="checkbox"] {
                    margin-right: 6px;
                    transform: scale(1.1);
                }

                .action-btn {
                    padding: 12px 30px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    background: linear-gradient(145deg, #ff6600, #e55a00);
                    color: white;
                    box-shadow: 0 4px 8px rgba(255, 102, 0, 0.3);
                    min-width: 160px;
                }

                .action-btn:hover:not(:disabled) {
                    background: linear-gradient(145deg, #e55a00, #cc4f00);
                    box-shadow: 0 6px 12px rgba(255, 102, 0, 0.4);
                    transform: translateY(-2px);
                }

                .action-btn:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                    box-shadow: none;
                    transform: none;
                }

                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.75);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .loading-spinner {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    text-align: center;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                }

                .loading-spinner div:first-child {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: #333;
                }

                .spinner-animation {
                    width: 40px;
                    height: 40px;
                    margin: 0 auto;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #ff6600;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Bar chart styling for rain intensity */
                .bars {
                    transition: opacity 0.2s ease;
                }

                .bars:hover {
                    opacity: 1 !important;
                }

                @media (max-width: 768px) {
                    .lewas-container {
                        padding: 15px;
                    }
                    
                    .chart-section {
                        padding: 15px;
                        overflow-x: scroll;
                        -webkit-overflow-scrolling: touch;
                    }
                    
                    .control-row {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 15px;
                    }
                    
                    .control-group {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 8px;
                    }
                    
                    .control-group label {
                        min-width: auto;
                        text-align: center;
                    }
                    
                    .control-group select {
                        min-width: auto;
                        width: 100%;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default LiveDataPage;