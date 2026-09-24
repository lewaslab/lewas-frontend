// src/pages/index.js
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout title="LEWAS Lab Environmental Monitoring">
      <div className="home-container">
        {/* Main Content Section */}
        <section className="main-content-section">
          <div className="content-text">
            <p style={{ 
              maxWidth: '90vw', 
              width: '90vw', 
              minWidth: '90vw',
              margin: '0 0 1.5rem 0',
              fontSize: '1.1rem',
              color: '#2c3e50',
              lineHeight: '1.8',
              textAlign: 'justify'
            }}>
              The Learning Enhanced Watershed Assessment System (LEWAS) is a unique real-time water and weather monitoring system. 
              The system has developed from NSF grants, namely DLR, TUES, REU, and RET sites. The purpose of LEWAS is to enhance 
              water sustainability education and research at Virginia Tech.
            </p>
            <p style={{ 
              maxWidth: '90vw', 
              width: '90vw', 
              minWidth: '90vw',
              margin: '0 0 1.5rem 0',
              fontSize: '1.1rem',
              color: '#2c3e50',
              lineHeight: '1.8',
              textAlign: 'justify'
            }}>
              The LEWAS monitoring site is installed at the outfall of the Webb Branch watershed on Virginia Tech&apos;s campus. 
              Webb Branch is an urban stream with a 2.78 square kilometer (about one square mile) watershed consisting of 
              residential and commercial properties. The stream is routed through man-made channels and culverts until it 
              discharges at the LEWAS monitoring site.
            </p>
          </div>
          
          {/* Image Section */}
          <div className="image-section">
            <Image 
              src="/images/stroubles_watershed.png" 
              alt="Stroubles Watershed at Virginia Tech Campus" 
              width={0}
              height={0}
              sizes="28.8vw"
              priority
              className="watershed-image"
              style={{ width: '28.8%', height: 'auto' }}
            />
          </div>

          {/* Additional Text Section */}
          <div className="additional-text">
            <p style={{ 
              maxWidth: '90vw', 
              width: '90vw', 
              minWidth: '90vw',
              margin: '0 0 1.5rem 0',
              fontSize: '1.1rem',
              color: '#2c3e50',
              lineHeight: '1.8',
              textAlign: 'justify'
            }}>
              In order to capture the acute hydrologic activity due to impervious pavement in urban watersheds, the monitoring station collects water quality and flow data at high frequencies. A water quality Sonde collects water temperature, pH, dissolved oxygen, turbidity, specific conductivity, and oxidation reduction potential data every three minutes. An acoustic Doppler current profiler (ADCP) collects velocity of the water every minute which is used to calculate the stream&apos;s flow rate. These parameters, along with weather data from the Vaisala transmitter and videos from the on-site camera, provide an opportunity for individuals to experience the health of the urban stream and watershed.
            </p>
          </div>

          {/* Site Image Section */}
          <div className="site-image-section">
            <Image 
              src="/images/site.png" 
              alt="LEWAS Monitoring Site" 
              width={0}
              height={0}
              sizes="28.8vw"
              priority
              className="site-image"
              style={{ width: '28.8%', height: 'auto' }}
            />
          </div>

          {/* Third Text Block Section */}
          <div className="third-text-block">
            <p style={{ 
              maxWidth: '90vw', 
              width: '90vw', 
              minWidth: '90vw',
              margin: '0 0 1.5rem 0',
              fontSize: '1.1rem',
              color: '#2c3e50',
              lineHeight: '1.8',
              textAlign: 'justify'
            }}>
              The LEWAS monitoring station is unique because the instant the data is collected from the sensors individuals can view it online. A Raspberry Pi is a microcontroller at the monitoring station connected to the sensors and wireless internet router. The data travels from the sensors through Virginia Tech&apos;s wireless network into the LEWAS database. The Online Watershed Learning System (OWLS) is a website which allows students, researchers, or community members to view and download the real-time data.
            </p>
            <p style={{ 
              maxWidth: '90vw', 
              width: '90vw', 
              minWidth: '90vw',
              margin: '0 0 1.5rem 0',
              fontSize: '1.1rem',
              color: '#2c3e50',
              lineHeight: '1.8',
              textAlign: 'justify'
            }}>
              Stroubles Creek is an impaired waterbody located downstream of Webb Branch and Central Branch. The urban headwaters emit a large amount of sediment and urban pollution into the creek during rainstorms. Stroubles Creek is a well-studied creek as it continues downstream through fields containing agriculture and livestock. The Stroubles Creek is a sub-watershed of the New River Watershed, but LEWAS is interested in capturing acute hydrologic events and urban pollution at the headwaters.
            </p>
            <p style={{ 
              maxWidth: '90vw', 
              width: '90vw', 
              minWidth: '90vw',
              margin: '0 0 1.5rem 0',
              fontSize: '1.1rem',
              color: '#2c3e50',
              lineHeight: '1.8',
              textAlign: 'justify'
            }}>
              Throughout the years, LEWAS has documented record flooding events, water main breaks, road salt runoff, and illicit discharges that may have gone unnoticed without high-frequency real-time environmental data.
            </p>
            <p style={{ 
              maxWidth: '90vw', 
              width: '90vw', 
              minWidth: '90vw',
              margin: '0 0 1.5rem 0',
              fontSize: '1.1rem',
              color: '#2c3e50',
              lineHeight: '1.8',
              textAlign: 'justify'
            }}>
              If you would like to visit the LEWAS monitoring station, it is located near North Hahn Hall, just off of West Campus Drive, downstream of the Perry Street parking lots, and upstream of the Duck Pond.
            </p>
          </div>
        </section>
      </div>

      <style jsx>{`
        .home-container {
          width: 100%;
          max-width: 100vw;
          margin: 0 auto;
          padding: 2rem;
          overflow-x: hidden;
        }

        /* Main Content Section */
        .main-content-section {
          margin-bottom: 3rem;
          width: 100%;
          max-width: 100%;
        }

        .content-text {
          width: 100%;
          max-width: 100%;
          margin: 0 auto 3rem;
          text-align: left;
          overflow-wrap: break-word;
          word-wrap: break-word;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }

        .content-text p {
          font-size: 1.1rem;
          color: #2c3e50;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          text-align: justify;
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        /* Image Section */
        .image-section {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .watershed-image {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          max-width: 100%;
          height: auto;
        }

        /* Additional Text Section */
        .additional-text {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .additional-text p {
          font-size: 1.1rem;
          color: #2c3e50;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          text-align: justify;
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        /* Site Image Section */
        .site-image-section {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .site-image {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          max-width: 100%;
          height: auto;
        }

        /* Third Text Block Section */
        .third-text-block {
          width: 100%;
          max-width: 100%;
          margin: 0 auto 3rem;
          text-align: left;
          overflow-wrap: break-word;
          word-wrap: break-word;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }

        .third-text-block p {
          font-size: 1.1rem;
          color: #2c3e50;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          text-align: justify;
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .home-container {
            padding: 1rem;
          }

          .content-text {
            margin-bottom: 2rem;
          }

          .content-text p {
            font-size: 1rem;
            text-align: left;
          }

          .watershed-image {
            width: 100%;
            height: auto;
          }

          .additional-text {
            margin-bottom: 2rem;
          }

          .site-image-section {
            margin-bottom: 2rem;
          }

          .site-image {
            width: 100%;
            height: auto;
          }

          .third-text-block {
            margin-bottom: 2rem;
          }

          .third-text-block p {
            font-size: 1rem;
            text-align: left;
          }
        }
      `}</style>
    </Layout>
  );
}