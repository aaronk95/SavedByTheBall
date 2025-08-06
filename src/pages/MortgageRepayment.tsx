import React, { useEffect, useState } from "react";
import InputBoxPound from "../components/inputBoxes/InputBoxPound.tsx";
import InputBoxPercentage from "../components/inputBoxes/InputBoxPercentage.tsx";
import InputBoxDropdown from "../components/inputBoxes/InputBoxDropdown.tsx";

const MortgageRepayment = ({ darkMode }) => {
    const [loanAmount, setLoanAmount] = useState(300000);
    const [interestRate, setInterestRate] = useState(5.5);
    const [loanTerm, setLoanTerm] = useState(25);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const calculatePayment = () => {
        const principal = loanAmount;
        const monthlyRate = interestRate / 100 / 12;
        const numPayments = loanTerm * 12;
        
        if (monthlyRate === 0) {
            setMonthlyPayment(principal / numPayments);
        } else {
            const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                           (Math.pow(1 + monthlyRate, numPayments) - 1);
            setMonthlyPayment(payment);
        }
    };

    useEffect(() => {
        calculatePayment();
    }, [loanAmount, interestRate, loanTerm]);

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
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '1.5rem',
        marginBottom: '2rem',
    };



    return (
        <div style={containerStyle}>
            <div style={mainContainerStyle}>
                <h1 style={titleStyle}>
                    Mortgage Repayments
                </h1>

                {/* Input Form */}
                <div style={cardStyle}>
                    
                    <div style={gridStyle}>
                        <InputBoxPound label="Loan Amount" value={loanAmount} onChange={(value) => setLoanAmount(value)} darkMode={darkMode} />
                        <InputBoxPercentage label="Interest Rate" value={interestRate} onChange={(value) => setInterestRate(value)} darkMode={darkMode} />
                        <InputBoxDropdown label={"Mortgage Term"} value={loanTerm} onChange={(value) => setLoanTerm(value)} darkMode={darkMode} measurements=" Years" listNumber={[15,20,25,30,35,40]} />
                    </div>
                </div>
<div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    backgroundColor: '#059669',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Monthly Payment</h4>
                    <p style={{ 
                        color: 'white', 
                        fontSize: '2rem', 
                        fontWeight: 'bold',
                        margin: 0
                    }}>
                        £{monthlyPayment.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );





};
export default MortgageRepayment;