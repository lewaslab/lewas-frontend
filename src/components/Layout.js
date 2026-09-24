// src/components/Layout.js - Fixed for Next.js 15
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Layout = ({ children, title = 'LEWAS Lab Data' }) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="container">
                <header>
                    <div className="logo-container">
                        <Image 
                            src="/images/logo.png" 
                            alt="LEWAS Lab Logo" 
                            width={540} 
                            height={144} 
                            priority
                        />
                    </div>
                    <nav>
                        <div className="nav-links">
                            <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>
                                Home
                            </Link>
                            <Link href="/live-data" className={`nav-link ${router.pathname === '/live-data' ? 'active' : ''}`}>
                                Live Creek Data
                            </Link>
                            <Link href="/chatbot" className={`nav-link ${router.pathname === '/chatbot' ? 'active' : ''}`}>
                                Chatbot
                            </Link>
                            <Link href="/team" className={`nav-link ${router.pathname === '/team' ? 'active' : ''}`}>
                                Team
                            </Link>
                            <Link href="/research" className={`nav-link ${router.pathname.startsWith('/research') ? 'active' : ''}`}>
                                Research
                            </Link>
                        </div>
                    </nav>
                </header>
                <main>{children}</main>
                <footer>
                    <p>LEWAS Lab Environmental Monitoring</p>
                </footer>
            </div>

            <style jsx>{`
                .container {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    font-family: "Franklin Gothic", Arial, sans-serif;
                }
                
                header {
                    background: #f8f9fa;
                    border-bottom: 1px solid #dee2e6;
                    padding: 1rem 2rem;
                }
                
                .logo-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                
                nav {
                    margin-top: 1rem;
                }
                
                .nav-links {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                
                .nav-links :global(a) {
                    color: #007bff;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }
                
                .nav-links :global(a:hover) {
                    background: #e9ecef;
                    color: #0056b3;
                }
                
                .nav-links :global(a.active) {
                    background: #007bff;
                    color: white;
                    border-color: #0056b3;
                }
                
                main {
                    flex: 1;
                    padding: 0;
                }
                
                footer {
                    background: #f8f9fa;
                    border-top: 1px solid #dee2e6;
                    padding: 1rem;
                    text-align: center;
                    margin-top: auto;
                }
                
                footer p {
                    margin: 0;
                    color: #666;
                }
                
                @media (max-width: 768px) {
                    header {
                        padding: 1rem;
                    }
                    
                    .nav-links {
                        justify-content: center;
                    }
                    
                    main {
                        padding: 1rem;
                    }
                }
            `}</style>
        </>
    );
};

export default Layout;