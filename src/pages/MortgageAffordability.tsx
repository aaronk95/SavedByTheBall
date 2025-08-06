import React, { useState, useEffect } from "react";
import RiskGraph from "../components/RiskGraph.tsx";
import InputBoxPound from "../components/inputBoxes/InputBoxPound.tsx";
import InputBoxPercentage from "../components/inputBoxes/InputBoxPercentage.tsx";
import InputBoxDropdown from "../components/inputBoxes/InputBoxDropdown.tsx";

function MortgageAffordability({ darkMode = false }) {
    const [propertyPrice, setPropertyPrice] = useState(300000);
    const [deposit, setDeposit] = useState(60000);
    const [interestRate, setInterestRate] = useState(5.5);
    const [mortgageTerm, setMortgageTerm] = useState(25);
    const [applicant1Salary, setApplicant1Salary] = useState(35000);
    const [applicant2Salary, setApplicant2Salary] = useState(28000);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [borrowingCapacity, setBorrowingCapacity] = useState({
        conservative: 0,
        standard: 0,
        aggressive: 0,
    });

    const calculateMortgage = () => {
        const totalAnnualIncome = applicant1Salary + applicant2Salary;

        setBorrowingCapacity({
            conservative: totalAnnualIncome * 4,
            standard: totalAnnualIncome * 4.5,
            aggressive: totalAnnualIncome * 5,
        });

        if (propertyPrice > 0) {
            const loanAmount = propertyPrice - deposit;
            const monthlyRate = interestRate / 100 / 12;
            const numberOfPayments = mortgageTerm * 12;

            if (loanAmount > 0 && monthlyRate > 0 && numberOfPayments > 0) {
                const payment =
                    (loanAmount *
                        (monthlyRate *
                            Math.pow(1 + monthlyRate, numberOfPayments))) /
                    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                setMonthlyPayment(payment);
            } else {
                setMonthlyPayment(0);
            }
        } else {
            setMonthlyPayment(0);
        }
    };

    useEffect(() => {
        calculateMortgage();
    }, [
        propertyPrice,
        deposit,
        interestRate,
        mortgageTerm,
        applicant1Salary,
        applicant2Salary,
    ]);

    // Inline styles
    const containerStyle: React.CSSProperties = {
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '2rem',
        transition: 'all 0.3s ease',
    };

    const mainContainerStyle: React.CSSProperties = {
        maxWidth: '64rem',
        margin: '0 auto',
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '2rem',
        color: darkMode ? '#ffffff' : '#111827',
    };

    const cardStyle: React.CSSProperties = {
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '2rem',
        transition: 'all 0.3s ease',
    };

    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '1.5rem',
        marginBottom: '2rem',
    };

    const emptyStateStyle: React.CSSProperties = {
        ...cardStyle,
        textAlign: 'center',
        color: darkMode ? '#9ca3af' : '#6b7280',
    };

    return (
        <div style={containerStyle}>
            <div style={mainContainerStyle}>
                <h1 style={titleStyle}>
                    Mortgage Affordability
                </h1>

                {/* Input Form */}
                <div style={cardStyle}>
                    
                    <div style={gridStyle}>
                        <InputBoxPound label="Property Value" value={propertyPrice} onChange={(value) => setPropertyPrice(value)} darkMode={darkMode} />
                        <InputBoxPound label="Deposit" value={deposit} onChange={(value) => setDeposit(value)} darkMode={darkMode} />
                        <InputBoxPercentage label="Interest Rate" value={interestRate} onChange={(value) => setInterestRate(value)} darkMode={darkMode} />
                        <InputBoxDropdown label={"Mortgage Term"} value={mortgageTerm} onChange={(value) => setMortgageTerm(value)} darkMode={darkMode} measurements=" Years" listNumber={[15,20,25,30,35,40]} />
                        <InputBoxPound label="Primary Applicant - Annual Salary" value={applicant1Salary} onChange={(value) => setApplicant1Salary(value)} darkMode={darkMode} />
                        <InputBoxPound label="Secondary Applicant - Annual Salary" value={applicant2Salary} onChange={(value) => setApplicant2Salary(value)} darkMode={darkMode} />
                    </div>
                </div>

                {/* Results */}
                {propertyPrice > 0 ? (

                        <RiskGraph
                            propertyPrice={propertyPrice}
                            deposit={deposit}
                            applicant1Salary={applicant1Salary}
                            applicant2Salary={applicant2Salary}
                            interestRate={interestRate}
                            darkMode={darkMode}
                            mortgageTerm= {mortgageTerm}
                        />
                ) : (
                    <div style={emptyStateStyle}>
                        <div>
                            Enter a property price to see your mortgage calculations
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MortgageAffordability;