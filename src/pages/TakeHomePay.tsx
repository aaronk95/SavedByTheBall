import React, { useEffect, useState } from "react";
import InputBoxPound from "../components/inputBoxes/InputBoxPound.tsx";
import InputBoxPercentage from "../components/inputBoxes/InputBoxPercentage.tsx";
import InputBoxDropdown from "../components/inputBoxes/InputBoxDropdown.tsx";

const TakeHomePay = ({ darkMode }) => {
    const [annualSalary, setAnnualSalary] = useState(35000);
    const [taxYear, setTaxYear] = useState("2025/26");
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    // Tax bands and allowances for different tax years
    const getTaxData = (year) => {
        const taxData = {
            "2025/26": {
                personalAllowance: 12570,
                basicRateLimit: 50270,
                higherRateLimit: 125140,
                basicRate: 0.20,
                higherRate: 0.40,
                additionalRate: 0.45,
                niLowerLimit: 12570,
                niUpperLimit: 50270,
                niBasicRate: 0.08,
                niHigherRate: 0.02
            },
            "2024/25": {
                personalAllowance: 12570,
                basicRateLimit: 50270,
                higherRateLimit: 125140,
                basicRate: 0.20,
                higherRate: 0.40,
                additionalRate: 0.45,
                niLowerLimit: 12570,
                niUpperLimit: 50270,
                niBasicRate: 0.08,
                niHigherRate: 0.02
            },
            "2023/24": {
                personalAllowance: 12570,
                basicRateLimit: 50270,
                higherRateLimit: 125140,
                basicRate: 0.20,
                higherRate: 0.40,
                additionalRate: 0.45,
                niLowerLimit: 12570,
                niUpperLimit: 50270,
                niBasicRate: 0.115,
                niHigherRate: 0.02
            },
            "2022/23": {
                personalAllowance: 12570,
                basicRateLimit: 50270,
                higherRateLimit: 150000,
                basicRate: 0.20,
                higherRate: 0.40,
                additionalRate: 0.45,
                niLowerLimit: 12570,
                niUpperLimit: 50270,
                niBasicRate: 0.12,
                niHigherRate: 0.02
            },
            "2021/22": {
                personalAllowance: 12570,
                basicRateLimit: 50270,
                higherRateLimit: 150000,
                basicRate: 0.20,
                higherRate: 0.40,
                additionalRate: 0.45,
                niLowerLimit: 12570,
                niUpperLimit: 50270,
                niBasicRate: 0.12,
                niHigherRate: 0.02
            }
        };
        return taxData[year];
    };

    const calculateIncomeTax = (annualSalary, taxData) => {
        let tax = 0;
        let taxableIncome = Math.max(0, annualSalary - taxData.personalAllowance);
        
        if (taxableIncome <= 0) return 0;
        
        // Basic rate tax
        if (taxableIncome > 0) {
            const basicRateTaxable = Math.min(taxableIncome, taxData.basicRateLimit - taxData.personalAllowance);
            tax += basicRateTaxable * taxData.basicRate;
        }
        
        // Higher rate tax
        if (taxableIncome > (taxData.basicRateLimit - taxData.personalAllowance)) {
            const higherRateTaxable = Math.min(
                taxableIncome - (taxData.basicRateLimit - taxData.personalAllowance),
                taxData.higherRateLimit - taxData.basicRateLimit
            );
            tax += higherRateTaxable * taxData.higherRate;
        }
        
        // Additional rate tax
        if (taxableIncome > (taxData.higherRateLimit - taxData.personalAllowance)) {
            const additionalRateTaxable = taxableIncome - (taxData.higherRateLimit - taxData.personalAllowance);
            tax += additionalRateTaxable * taxData.additionalRate;
        }
        
        return tax;
    };

    const calculateNationalInsurance = (annualSalary, taxData) => {
        let ni = 0;
        
        if (annualSalary <= taxData.niLowerLimit) return 0;
        
        // Basic rate NI
        if (annualSalary > taxData.niLowerLimit) {
            const basicRateNI = Math.min(annualSalary - taxData.niLowerLimit, taxData.niUpperLimit - taxData.niLowerLimit);
            ni += basicRateNI * taxData.niBasicRate;
        }
        
        // Higher rate NI
        if (annualSalary > taxData.niUpperLimit) {
            const higherRateNI = annualSalary - taxData.niUpperLimit;
            ni += higherRateNI * taxData.niHigherRate;
        }
        
        return ni;
    };

    const calculatePayment = () => {
        const taxData = getTaxData(taxYear);
        const salary = annualSalary;
        
        // Calculate income tax
        const incomeTax = calculateIncomeTax(salary, taxData);
        
        // Calculate National Insurance
        const nationalInsurance = calculateNationalInsurance(salary, taxData);
        
        // Calculate net annual pay
        const netAnnualPay = salary - incomeTax - nationalInsurance;
        
        // Convert to monthly
        const monthlyTakeHome = netAnnualPay / 12;
        
        setMonthlyPayment(monthlyTakeHome);
    };

    useEffect(() => {
        calculatePayment();
    }, [annualSalary, taxYear]);

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
                    Take-home Pay
                </h1>

                {/* Input Form */}
                <div style={cardStyle}>
                    
                    <div style={gridStyle}>
                        <InputBoxPound label="Annual Salary (Pre-tax)" value={annualSalary} onChange={(value) => setAnnualSalary(value)} darkMode={darkMode} />
                        <InputBoxDropdown label={"Tax Year"} value={taxYear} onChange={(value) => setTaxYear(value)} darkMode={darkMode} listString={["2025/26", "2024/25", "2023/24", "2022/23", "2021/22"]} />
                    </div>
                </div>
<div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    backgroundColor: '#059669',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Monthly Take-home Pay</h4>
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
export default TakeHomePay;