import React from "react";

interface RiskGraphProps {
    propertyPrice: number;
    deposit: number;
    applicant1Salary: number;
    applicant2Salary: number;
    interestRate: number;
    mortgageTerm: number;

    darkMode?: boolean;
}

function RiskGraph({ 
    propertyPrice, 
    deposit, 
    applicant1Salary, 
    applicant2Salary,
    interestRate,
    mortgageTerm,
    darkMode = false,
}: RiskGraphProps) {
    const cardStyle: React.CSSProperties = {
        borderRadius: "1rem",
        padding: "2rem",
        marginBottom: "1.5rem",
    };

    // Calculate current income multiple
    const currentIncomeMultiple =
        propertyPrice > 0
            ? (propertyPrice - deposit) / (applicant1Salary + applicant2Salary)
            : 0;

    // Calculate monthly repayments
    const loanAmount = propertyPrice - deposit;
    const annualInterestRate = interestRate / 100; // 5% typical rate
    const loanTermYears = mortgageTerm;
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = loanTermYears * 12;
    
    const monthlyPayment = loanAmount > 0 ? 
        (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) : 0;

    return (
        <div style={cardStyle}>
            <div
                style={{
                    position: "relative",
                    height: "160px",
                    marginBottom: "2rem",
                }}
            >
                {/* User Position Indicator - ABOVE the graph */}
                {(() => {
                    // Calculate position: 3.0x = 0%, 6.0x = 100%
                    const position = Math.min(
                        Math.max(
                            ((currentIncomeMultiple - 3.0) / 3.0) * 100,
                            0
                        ),
                        100
                    );

                    return (
                        <div
                            style={{
                                position: "absolute",
                                left: `${position}%`,
                                top: "-70px",
                                transform: "translateX(-50%)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                zIndex: 10,
                            }}
                        >
                            {/* "YOU" label at the top */}
                            <div
                                style={{
                                    fontSize: "0.875rem",
                                    fontWeight: "bold",
                                    color: darkMode ? "#ffffff" : "#1f2937",
                                    backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                                    padding: "6px 12px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                    border: darkMode ? "2px solid #d1d5db":"2px solid #1f2937",
                                    marginBottom: "12px",
                                }}
                            >
                                YOU ({currentIncomeMultiple.toFixed(1)}x)
                            </div>

                            {/* Arrow pointing down */}
                            <div
                                style={{
                                    width: "0",
                                    height: "0",
                                    borderLeft: "15px solid transparent",
                                    borderRight: "15px solid transparent",
                                    borderTop: darkMode ? "20px solid #d1d5db" : "20px solid #1f2937",
                                }}
                            ></div>
                        </div>
                    );
                })()}
                {/* Color Bands */}
                <div
                    style={{
                        display: "flex",
                        height: "80px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        marginBottom: "1rem",
                        marginTop: "80px",
                    }}
                >
                    {/* Green: 3x to 4x (1 unit out of 3 total units) */}
                    <div
                        style={{
                            flex: "1",
                            backgroundColor: "#10b981",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: "1rem",
                            fontWeight: "700",
                            flexDirection: "column",
                        }}
                    >
                        <div>LOW RISK</div>
                        <div style={{ fontSize: "0.75rem", opacity: 0.9 }}>
                            {"< 4.0x"}
                        </div>
                    </div>

                    {/* Orange: 4x to 4.5x (0.5 units out of 3 total units) */}
                    <div
                        style={{
                            flex: "0.5",
                            backgroundColor: "#f59e0b",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: "0.875rem",
                            fontWeight: "700",
                            flexDirection: "column",
                        }}
                    >
                        <div>MEDIUM</div>
                        <div style={{ fontSize: "0.7rem", opacity: 0.9 }}>
                            4.0-4.5x
                        </div>
                    </div>

                    {/* Light Red: 4.5x to 5x (0.5 units out of 3 total units) */}
                    <div
                        style={{
                            flex: "0.5",
                            backgroundColor: "#ef4444",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: "0.875rem",
                            fontWeight: "700",
                            flexDirection: "column",
                        }}
                    >
                        <div>HIGH</div>
                        <div style={{ fontSize: "0.7rem", opacity: 0.9 }}>
                            4.5-5.0x
                        </div>
                    </div>

                    {/* Dark Red: 5x to 6x (1 unit out of 3 total units) */}
                    <div
                        style={{
                            flex: "1",
                            backgroundColor: "#dc2626",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: "0.875rem",
                            fontWeight: "700",
                            flexDirection: "column",
                        }}
                    >
                        <div>VERY HIGH</div>
                        <div style={{ fontSize: "0.7rem", opacity: 0.9 }}>
                            5.0x+
                        </div>
                    </div>
                </div>
                {/* Scale Labels */}
                <div
                    style={{
                        position: "relative",
                        fontSize: "0.875rem",
                        color: darkMode ? "#9ca3af" : "#6b7280",
                        fontWeight: "600",
                        marginBottom: "1rem",
                        height: "1.5rem",
                    }}
                >
                    {/* Positioned proportionally based on actual values */}
                    <span style={{ position: "absolute", left: "0%" }}>
                        3.0x
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            left: "33.33%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        4.0x
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        4.5x
                    </span>
                    <span
                        style={{
                            position: "absolute",
                            left: "66.67%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        5.0x
                    </span>
                    <span style={{ position: "absolute", right: "0%" }}>
                        6.0x+
                    </span>
                </div>
            </div>

            {/* Combined Box with Risk Level and Monthly Repayments */}
            <div
                style={{
                    padding: "1.5rem",
                    borderRadius: "0.75rem",
                    border: `3px solid ${(() => {
                        if (currentIncomeMultiple < 4) return "#10b981";
                        if (currentIncomeMultiple < 4.5) return "#f59e0b";
                        if (currentIncomeMultiple < 5) return "#ef4444";
                        return "#dc2626";
                    })()}`,
                    marginBottom: "2rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "2rem",
                        alignItems: "stretch",
                    }}
                >
                    {/* Left Side - Risk Level */}
                    <div
                        style={{
                            flex: "1",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1.25rem",
                                fontWeight: "700",
                                color: (() => {
                                    if (currentIncomeMultiple < 4) return "#10b981";
                                    if (currentIncomeMultiple < 4.5) return "#f59e0b";
                                    if (currentIncomeMultiple < 5) return "#ef4444";
                                    return "#dc2626";
                                })(),
                                marginBottom: "0.75rem",
                            }}
                        >
                            {(() => {
                                if (currentIncomeMultiple < 4) return "LOW RISK LOAN";
                                if (currentIncomeMultiple < 4.5) return "MEDIUM RISK LOAN";
                                if (currentIncomeMultiple < 5) return "HIGH RISK LOAN";
                                return "VERY HIGH RISK LOAN";
                            })()}
                        </div>
                        <div
                            style={{
                                fontSize: "0.95rem",
                                color: darkMode ? "#d1d5db" : "#6b7280",
                                lineHeight: "1.5",
                            }}
                        >
                            {(() => {
                                if (currentIncomeMultiple < 4)
                                    return "Excellent chance of approval with most lenders. Conservative borrowing approach.";
                                if (currentIncomeMultiple < 4.5)
                                    return "Good chance of approval. Standard lending criteria for most UK lenders.";
                                if (currentIncomeMultiple < 5)
                                    return "May require specialist lenders. Stricter affordability checks and stress testing required.";
                                return "Very difficult to obtain. Requires specialist high-risk lenders with very strict criteria.";
                            })()}
                        </div>
                                                <div
                            style={{
                                fontSize: "0.95rem",
                                color: darkMode ? "#d1d5db" : "#6b7280",
                                lineHeight: "1.5",
                            }}
                        >
                            This {currentIncomeMultiple.toFixed(1)}x your household income.
                        </div>

                    </div>

                    {/* Vertical Divider */}
                    <div
                        style={{
                            width: "1px",
                            backgroundColor: darkMode ? "#6b7280" : "#d1d5db",
                            margin: "0 0.5rem",
                        }}
                    ></div>

                    {/* Right Side - Monthly Repayments */}
                    <div
                        style={{
                            flex: "1",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1.25rem",
                                fontWeight: "700",
                                color: darkMode ? "#ffffff" : "#1f2937",
                                marginBottom: "0.75rem",
                            }}
                        >
                            MONTHLY REPAYMENTS
                        </div>
                        <div
                            style={{
                                fontSize: "2rem",
                                fontWeight: "700",
                                color: "#059669",
                                marginBottom: "0.5rem",
                            }}
                        >
                            £{monthlyPayment.toLocaleString('en-GB', { 
                                minimumFractionDigits: 0, 
                                maximumFractionDigits: 0 
                            })}
                        </div>
                        <div
                            style={{
                                fontSize: "0.875rem",
                                color: darkMode ? "#9ca3af" : "#6b7280",
                                marginBottom: "1rem",
                            }}
                        >
                            Based on {interestRate}% interest rate over {mortgageTerm} years
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Demo component to show both light and dark modes

export default RiskGraph;
