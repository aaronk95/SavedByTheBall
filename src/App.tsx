import React, { useState, useEffect } from "react";
import MortgageAffordability from "./pages/MortgageAffordability.tsx";
import UndergraduateLoanCalculator from "./pages/UndergraduateRepayments.tsx";
import MortgageRepayment from "./pages/MortgageRepayment.tsx";
import PostgraduateLoanCalculator from "./pages/PostgraduateRepayments.tsx";
import TakeHomePay from "./pages/TakeHomePay.tsx";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// AdSense Component
const AdSenseUnit = ({ isDarkMode, slot = "1234567890", format = "auto", responsive = true }) => {
    useEffect(() => {
        try {
            // Push the ad after component mounts
            if (window.adsbygoogle && window.adsbygoogle.push) {
                window.adsbygoogle.push({});
            }
        } catch (error) {
            console.log('AdSense error:', error);
        }
    }, []);

    return (
        <div
            style={{
                backgroundColor: isDarkMode ? "#374151" : "white",
                borderRadius: "8px",
                padding: "0.5rem",
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "250px", // Minimum height for ad space
                width: "100%",
                maxWidth: "300px",
            }}
        >
            {/* Ad label */}
            <div
                style={{
                    fontSize: "0.75rem",
                    color: isDarkMode ? "#9ca3af" : "#6b7280",
                    marginBottom: "0.5rem",
                }}
            >
                Advertisement
            </div>
            
            {/* Actual AdSense ad unit */}
            <ins
                className="adsbygoogle"
                style={{
                    display: "block",
                    width: "100%",
                    minHeight: "200px",
                }}
                data-ad-client="ca-pub-3068416484564307"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive.toString()}
            ></ins>
        </div>
    );
};

// Page Components - Create separate components for each page
const HomePage = ({ isDarkMode }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
            style={{
                padding: "2rem",
                backgroundColor: isDarkMode ? "#4b5563" : "#f8fafc",
                borderRadius: "8px",
                border: `1px solid ${isDarkMode ? "#6b7280" : "#e2e8f0"}`,
            }}
        >
            <h3
                style={{
                    color: isDarkMode ? "#f9fafb" : "#1e293b",
                    marginBottom: "1rem",
                    fontSize: "1.25rem",
                }}
            >
                Welcome to PaySaver
            </h3>
            <p
                style={{
                    color: isDarkMode ? "#d1d5db" : "#64748b",
                    lineHeight: "1.6",
                }}
            >
                Your one-stop solution for financial calculations. Navigate
                through our tools using the sidebar to calculate mortgage
                repayments, affordability, and student loan repayments.
            </p>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                    marginTop: "2rem",
                }}
            >
                <div
                    style={{
                        padding: "1rem",
                        backgroundColor: isDarkMode ? "#374151" : "white",
                        borderRadius: "6px",
                        border: `1px solid ${
                            isDarkMode ? "#4b5563" : "#e5e7eb"
                        }`,
                    }}
                >
                    <h4
                        style={{
                            color: isDarkMode ? "#f9fafb" : "#1f2937",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Mortgages
                    </h4>
                    <p
                        style={{
                            color: isDarkMode ? "#d1d5db" : "#6b7280",
                            fontSize: "0.9rem",
                        }}
                    >
                        Calculate repayments and affordability
                    </p>
                </div>
                <div
                    style={{
                        padding: "1rem",
                        backgroundColor: isDarkMode ? "#374151" : "white",
                        borderRadius: "6px",
                        border: `1px solid ${
                            isDarkMode ? "#4b5563" : "#e5e7eb"
                        }`,
                    }}
                >
                    <h4
                        style={{
                            color: isDarkMode ? "#f9fafb" : "#1f2937",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Student Loans
                    </h4>
                    <p
                        style={{
                            color: isDarkMode ? "#d1d5db" : "#6b7280",
                            fontSize: "0.9rem",
                        }}
                    >
                        Understand your repayment schedule
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const PostgraduateRepaymentPage = ({ isDarkMode }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
            style={{
                padding: "1.5rem",
                backgroundColor: isDarkMode ? "#4b5563" : "#f8fafc",
                borderRadius: "8px",
                border: `1px solid ${isDarkMode ? "#6b7280" : "#e2e8f0"}`,
            }}
        >
            <h3
                style={{
                    color: isDarkMode ? "#f9fafb" : "#1e293b",
                    marginBottom: "1rem",
                    fontSize: "1.25rem",
                }}
            >
                Postgraduate Student Loan Repayment
            </h3>
            <p
                style={{
                    color: isDarkMode ? "#d1d5db" : "#64748b",
                    lineHeight: "1.6",
                }}
            >
                Calculate your postgraduate loan repayments and understand your
                options.
            </p>
        </div>
    </div>
);

const InfoPage = ({ isDarkMode }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
            style={{
                padding: "1.5rem",
                backgroundColor: isDarkMode ? "#4b5563" : "#f8fafc",
                borderRadius: "8px",
                border: `1px solid ${isDarkMode ? "#6b7280" : "#e2e8f0"}`,
            }}
        >
            <h3
                style={{
                    color: isDarkMode ? "#f9fafb" : "#1e293b",
                    marginBottom: "1rem",
                    fontSize: "1.25rem",
                }}
            >
                About PaySaver
            </h3>
            <p
                style={{
                    color: isDarkMode ? "#d1d5db" : "#64748b",
                    lineHeight: "1.6",
                }}
            >
                PaySaver is your trusted companion for financial calculations.
                We provide accurate, easy-to-use tools to help you make informed
                decisions about mortgages, student loans, and other financial
                matters.
            </p>
        </div>
    </div>
);

function App() {
    const [activeNav, setActiveNav] = useState("Home");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSunHovered, setIsSunHovered] = useState(false);
    const [navScrolling, setNavScrolling] = useState(false);
    const [mainScrolling, setMainScrolling] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Handle scrollbar visibility for individual elements
    useEffect(() => {
        let navScrollTimer = null;
        let mainScrollTimer = null;

        const handleNavScroll = () => {
            setNavScrolling(true);
            if (navScrollTimer) clearTimeout(navScrollTimer);
            navScrollTimer = setTimeout(() => setNavScrolling(false), 1000);
        };

        const handleMainScroll = () => {
            setMainScrolling(true);
            if (mainScrollTimer) clearTimeout(mainScrollTimer);
            mainScrollTimer = setTimeout(() => setMainScrolling(false), 1000);
        };

        // Add scroll listeners to specific elements
        const navElement = document.querySelector(".nav-scrollbar");
        const mainElement = document.querySelector(".main-scrollbar");

        if (navElement) {
            navElement.addEventListener("scroll", handleNavScroll);
        }
        if (mainElement) {
            mainElement.addEventListener("scroll", handleMainScroll);
        }

        return () => {
            if (navScrollTimer) clearTimeout(navScrollTimer);
            if (mainScrollTimer) clearTimeout(mainScrollTimer);
            if (navElement) {
                navElement.removeEventListener("scroll", handleNavScroll);
            }
            if (mainElement) {
                mainElement.removeEventListener("scroll", handleMainScroll);
            }
        };
    }, []);

    // Handle URL changes and navigation
    useEffect(() => {
        // Get initial route from URL
        const path = window.location.pathname.slice(1) || "Home";
        setActiveNav(path === "" ? "Home" : path);

        // Listen for browser back/forward buttons
        const handlePopState = () => {
            const path = window.location.pathname.slice(1) || "Home";
            setActiveNav(path === "" ? "Home" : path);
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    // Initialize Google AdSense
    useEffect(() => {
        // Load AdSense script if not already loaded
        if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3068416484564307';
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
            
            script.onload = () => {
                console.log('AdSense script loaded successfully');
            };
            
            script.onerror = () => {
                console.log('AdSense script failed to load');
            };
        }

        // Initialize the global adsbygoogle array
        window.adsbygoogle = window.adsbygoogle || [];
    }, []);

    const handleNavClick = (navId) => {
        setActiveNav(navId);
        // Update URL without page reload - home goes to root, others get their path
        const url = navId === "Home" ? "/" : `/${navId}`;
        window.history.pushState(null, "", url);
    };

    // Function to render the appropriate page component
    const renderPageContent = () => {
        switch (activeNav) {
            case "Home":
                return <HomePage isDarkMode={isDarkMode} />;
            case "MortgageRepayments":
                return <MortgageRepayment darkMode={isDarkMode} />;
            case "MortgageAffordability":
                return <MortgageAffordability darkMode={isDarkMode} />;
            case "UndergraduateRepayment":
                return <UndergraduateLoanCalculator darkMode={isDarkMode} />;
            case "PostgraduateRepayment":
                return <PostgraduateLoanCalculator darkMode={isDarkMode} />;
            case "TakeHomePay":
                return <TakeHomePay darkMode={isDarkMode} />;
            case "Info":
                return <InfoPage isDarkMode={isDarkMode} />;

            default:
                return <HomePage isDarkMode={isDarkMode} />;
        }
    };

    // Minimal scrollbar styles - just the moving green bar
    const scrollbarStyles = `
        html, body {
            overflow: hidden;
            margin: 0;
            padding: 0;
            height: 100%;
            box-sizing: border-box;
        }
        * {
            box-sizing: border-box;
        }
        .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: transparent transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 4px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            border: none;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
            display: none;
        }
        .custom-scrollbar::-webkit-scrollbar-corner {
            background: transparent;
        }
        
        /* Cool green moving bar for navigation */
        .nav-scrollbar.scrolling::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%);
            opacity: 1;
            box-shadow: 
                0 0 8px rgba(5, 150, 105, 0.4),
                0 2px 4px rgba(5, 150, 105, 0.2);
        }
        .nav-scrollbar.scrolling::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
            box-shadow: 
                0 0 12px rgba(5, 150, 105, 0.6),
                0 3px 6px rgba(5, 150, 105, 0.3);
            transform: scaleX(1.2);
        }
        
        /* Cool green moving bar for main content */
        .main-scrollbar.scrolling::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%);
            opacity: 1;
            box-shadow: 
                0 0 8px rgba(5, 150, 105, 0.4),
                0 2px 4px rgba(5, 150, 105, 0.2);
        }
        .main-scrollbar.scrolling::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
            box-shadow: 
                0 0 12px rgba(5, 150, 105, 0.6),
                0 3px 6px rgba(5, 150, 105, 0.3);
            transform: scaleX(1.2);
        }
        
        /* Firefox scrollbar styling - minimal */
        .nav-scrollbar.scrolling {
            scrollbar-color: #059669 transparent;
        }
        .main-scrollbar.scrolling {
            scrollbar-color: #059669 transparent;
        }
        
        /* Smooth appearance animation */
        .nav-scrollbar.scrolling::-webkit-scrollbar-thumb,
        .main-scrollbar.scrolling::-webkit-scrollbar-thumb {
            animation: fadeInGlow 0.3s ease-out;
        }
        
        @keyframes fadeInGlow {
            0% {
                opacity: 0;
                transform: scaleY(0.8);
                box-shadow: 0 0 3px rgba(5, 150, 105, 0.2);
            }
            100% {
                opacity: 1;
                transform: scaleY(1);
                box-shadow: 
                    0 0 8px rgba(5, 150, 105, 0.4),
                    0 2px 4px rgba(5, 150, 105, 0.2);
            }
        }
    `;

    // Navigation items with categories
    const navItems = [
        { type: "category", label: "Main" },
        { type: "nav", id: "Home", label: "Home" },

        { type: "category", label: "Income" },
        { type: "nav", id: "TakeHomePay", label: "Take-home pay" },

        { type: "category", label: "Mortgages & Homes" },
        { type: "nav", id: "MortgageRepayments", label: "Mortgage Repayments" },
        {
            type: "nav",
            id: "MortgageAffordability",
            label: "Mortgage Affordability",
        },
        { type: "nav", id: "StampDuty", label: "Stamp duty" },

        { type: "category", label: "University Loan" },
        {
            type: "nav",
            id: "UndergraduateRepayment",
            label: "Undergrad Repayment",
        },
        {
            type: "nav",
            id: "PostgraduateRepayment",
            label: "Postgrad Repayment",
        },

        { type: "category", label: "About Us" },
        { type: "nav", id: "Info", label: "Info" },
    ];

    const renderNavItem = (item, index) => {
        // Category header
        if (item.type === "category") {
            return (
                <div
                    key={`category-${index}`}
                    style={{
                        padding: "0.75rem 1rem 0.5rem 1rem",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: isDarkMode ? "#9ca3af" : "#6b7280",
                        marginTop: index > 0 ? "0.5rem" : "0",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                    }}
                >
                    <span>{item.label}</span>
                    <div
                        style={{
                            flex: 1,
                            height: "1px",
                            backgroundColor: isDarkMode ? "#374151" : "#e5e7eb",
                        }}
                    />
                </div>
            );
        }

        // Navigation button
        if (item.type === "nav") {
            return (
                <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        padding: "0.75rem 1rem",
                        borderRadius: "8px",
                        textAlign: "left",
                        transition: "all 0.2s",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        backgroundColor:
                            activeNav === item.id ? "#059669" : "transparent",
                        color:
                            activeNav === item.id
                                ? "white"
                                : isDarkMode
                                ? "#d1d5db"
                                : "#4b5563",
                        boxShadow:
                            activeNav === item.id
                                ? "0 1px 2px 0 rgb(0 0 0 / 0.1)"
                                : "none",
                    }}
                    onMouseOver={(e) => {
                        if (activeNav !== item.id) {
                            e.currentTarget.style.backgroundColor = isDarkMode
                                ? "#374151"
                                : "#e5e7eb";
                            e.currentTarget.style.color = isDarkMode
                                ? "#f9fafb"
                                : "#1f2937";
                        }
                    }}
                    onMouseOut={(e) => {
                        if (activeNav !== item.id) {
                            e.currentTarget.style.backgroundColor =
                                "transparent";
                            e.currentTarget.style.color = isDarkMode
                                ? "#d1d5db"
                                : "#4b5563";
                        }
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.outline = "none";
                        if (activeNav !== item.id) {
                            e.currentTarget.style.backgroundColor = isDarkMode
                                ? "#374151"
                                : "#e5e7eb";
                            e.currentTarget.style.color = isDarkMode
                                ? "#f9fafb"
                                : "#1f2937";
                        }
                    }}
                    onBlur={(e) => {
                        if (activeNav !== item.id) {
                            e.currentTarget.style.backgroundColor =
                                "transparent";
                            e.currentTarget.style.color = isDarkMode
                                ? "#d1d5db"
                                : "#4b5563";
                        }
                    }}
                >
                    <span
                        style={{
                            fontWeight: "500",
                            pointerEvents: "none",
                            fontSize: "0.95rem",
                        }}
                    >
                        {item.label}
                    </span>
                </button>
            );
        }

        return null;
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
            <div
                style={{
                    height: "100vh",
                    display: "grid",
                    gridTemplateRows: "70px 1fr",
                    gridTemplateColumns: "250px 1fr 300px",
                    backgroundColor: isDarkMode ? "#1f2937" : "#f3f4f6",
                }}
            >
                {/* Header - spans full width */}
                <header
                    style={{
                        gridColumn: "span 3",
                        backgroundColor: "#059669",
                        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                        paddingLeft: "1.5rem",
                        paddingRight: "1.5rem",
                        height: "70px",
                        display: "flex",
                        alignItems: "center",
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <h1
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    color: "white",
                                }}
                            >
                                PAYSAVER
                            </h1>
                            <div
                                style={{
                                    borderLeft: "3px solid white",
                                    paddingLeft: "0.75rem",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: "500",
                                        color: "white",
                                        lineHeight: "1.2",
                                    }}
                                >
                                    Crunching Numbers
                                </span>
                                <span
                                    style={{
                                        fontSize: "0.875rem",
                                        fontWeight: "400",
                                        color: "#dcfce7",
                                        lineHeight: "1.2",
                                    }}
                                >
                                    Saving Pounds
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={toggleDarkMode}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                cursor: "pointer",
                                padding: "0",
                                transition: "all 0.2s",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "scale(1.1)";
                                setIsSunHovered(true);
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                setIsSunHovered(false);
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width: "20px",
                                    height: "20px",
                                }}
                            >
                                {/* Sun Icon */}
                                <div
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                        backgroundColor: isSunHovered
                                            ? isDarkMode
                                                ? "#fbbf24"
                                                : "#1f2937"
                                            : "white",
                                        borderRadius: "50%",
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        transition: "background-color 0.2s",
                                    }}
                                ></div>
                                {/* Sun rays */}
                                {[0, 45, 90, 135, 180, 225, 270, 315].map(
                                    (angle, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                position: "absolute",
                                                width: "2px",
                                                height: "6px",
                                                backgroundColor: isSunHovered
                                                    ? isDarkMode
                                                        ? "#fbbf24"
                                                        : "#1f2937"
                                                    : "white",
                                                top: "50%",
                                                left: "50%",
                                                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-9px)`,
                                                borderRadius: "1px",
                                                transition:
                                                    "background-color 0.2s",
                                            }}
                                        ></div>
                                    )
                                )}
                            </div>
                        </button>
                    </div>
                </header>

                {/* Left Navigation */}
                <nav
                    className={`custom-scrollbar nav-scrollbar ${
                        navScrolling ? "scrolling" : ""
                    }`}
                    style={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#f3f4f6",
                        padding: "1rem",
                        position: "relative",
                        zIndex: 10,
                        overflowY: "auto",
                        overflowX: "hidden",
                        height: "calc(100vh - 70px)",
                        maxHeight: "calc(100vh - 70px)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                        }}
                    >
                        {navItems.map((item, index) =>
                            renderNavItem(item, index)
                        )}
                    </div>
                </nav>

                {/* Main Content Area - Scrollable */}
                <main
                    className={`custom-scrollbar main-scrollbar ${
                        mainScrolling ? "scrolling" : ""
                    }`}
                    style={{
                        overflowY: "auto",
                        overflowX: "hidden",
                        padding: "1.5rem",
                        position: "relative",
                        zIndex: 20,
                        height: "calc(100vh - 70px)",
                        maxHeight: "calc(100vh - 70px)",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: isDarkMode ? "#374151" : "white",
                            borderRadius: "12px",
                            boxShadow:
                                "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                            padding: "1.5rem",
                            minHeight: "calc(100vh - 70px - 4.5rem - 24px)",
                        }}
                    >
                        {/* Render the appropriate page content based on activeNav */}
                        {renderPageContent()}
                    </div>
                </main>

                {/* Right Sidebar - Ads */}
                <aside
                    style={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#f3f4f6",
                        padding: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        position: "relative",
                        zIndex: 10,
                        borderLeft: `1px solid ${
                            isDarkMode ? "#374151" : "#d1d5db"
                        }`,
                        gap: "1rem",
                    }}
                >

                    
                    <AdSenseUnit 
                        isDarkMode={isDarkMode} 
                        slot="0987654321" 
                        format="vertical"
                        responsive={true}
                        data-adtest="on"
                    />
                </aside>
            </div>
        </>
    );
}

export default App;