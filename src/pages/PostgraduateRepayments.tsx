import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    ComposedChart,
    ReferenceLine,
} from "recharts";
import InputBoxPound from "../components/inputBoxes/InputBoxPound.tsx";
import InputBoxDropdown from "../components/inputBoxes/InputBoxDropdown.tsx";
import InputBoxPercentage from "../components/inputBoxes/InputBoxPercentage.tsx";

interface LoanDataPoint {
    year: number;
    balance: number;
    monthlyPayment: number;
    annualPayment: number;
    interestRate: number;
    salary: number;
    totalPaid: number;
    interestAccrued?: number;
    writtenOff?: number;
}

interface PlanDetails {
    threshold: number;
    rate: number;
    writeOffYears: number;
    baseInterestRate: number;
    maxInterestRate: number;
    highIncomeThreshold: number;
    name: string;
}

interface Props {
    darkMode?: boolean;
}

function PostgraduateLoanCalculator({ darkMode = false }: Props) {
    const [loanAmount, setLoanAmount] = useState(50000);
    const [currentSalary, setCurrentSalary] = useState(30000);
    const [expectedSalaryGrowth, setExpectedSalaryGrowth] = useState(2.5);
    const [loanPlan, setLoanPlan] = useState("postgrad");
    const [graduationYear, setGraduationYear] = useState(2024);

    const [annualRepayment, setAnnualRepayment] = useState(0);
    const [monthlyRepayment, setMonthlyRepayment] = useState(0);
    const [totalRepaid, setTotalRepaid] = useState(0);
    const [remainingDebt, setRemainingDebt] = useState(0);
    const [writeOffYear, setWriteOffYear] = useState(0);
    const [willBeWrittenOff, setWillBeWrittenOff] = useState(false);
    const [payoffYear, setPayoffYear] = useState<number | null>(null);
    const [currentInterestRate, setCurrentInterestRate] = useState(0);
    const [loanData, setLoanData] = useState<LoanDataPoint[]>([]);

    const containerStyle: React.CSSProperties = {
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "2rem",
        transition: "all 0.3s ease",
    };

    const mainContainerStyle: React.CSSProperties = {
        maxWidth: "64rem",
        margin: "0 auto",
    };
    const titleStyle: React.CSSProperties = {
        fontSize: "2.5rem",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "2rem",
        color: darkMode ? "#ffffff" : "#111827",
    };
    const cardStyle: React.CSSProperties = {
        borderRadius: "1rem",
        padding: "2rem",
        marginBottom: "2rem",
        transition: "all 0.3s ease",
    };
    const gridStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: "1.5rem",
        marginBottom: "2rem",
    };

    const loanPlans: Record<string, PlanDetails> = {
        postgrad: {
            threshold: 21000,
            rate: 6,
            writeOffYears: 30,
            baseInterestRate: 3.0,
            maxInterestRate: 6.0,
            highIncomeThreshold: 42000,
            name: "Postgraduate Loan",
        },
    };

    const getInterestRate = (salary: number, plan: PlanDetails): number => {
        if (plan.baseInterestRate === plan.maxInterestRate) {
            return plan.baseInterestRate;
        }

        if (salary <= plan.threshold) {
            return plan.baseInterestRate;
        } else if (salary >= plan.highIncomeThreshold) {
            return plan.maxInterestRate;
        } else {
            const range = plan.highIncomeThreshold - plan.threshold;
            const position = (salary - plan.threshold) / range;
            const rateRange = plan.maxInterestRate - plan.baseInterestRate;
            return plan.baseInterestRate + position * rateRange;
        }
    };

    const calculateRepayments = () => {
        const plan = loanPlans[loanPlan];
        const currentYear = new Date().getFullYear();

        // Find when they first earn over threshold (when write-off countdown starts)
        let firstRepaymentYear: number | null = null;

        // Check if currently earning over threshold
        if (currentSalary > plan.threshold) {
            // Work backwards to find when they first earned over threshold
            for (let year = graduationYear; year <= currentYear; year++) {
                const yearsFromCurrent = currentYear - year;
                const salaryForYear =
                    currentSalary /
                    Math.pow(1 + expectedSalaryGrowth / 100, yearsFromCurrent);

                if (salaryForYear > plan.threshold) {
                    firstRepaymentYear = year;
                    break;
                }
            }
        }

        // If not currently earning over threshold OR couldn't find historical start
        if (firstRepaymentYear === null) {
            // Project forward to find when they will earn over threshold
            for (
                let year = Math.max(currentYear, graduationYear);
                year <= graduationYear + 20;
                year++
            ) {
                const yearsFromCurrent = year - currentYear;
                const salaryForYear =
                    currentSalary *
                    Math.pow(1 + expectedSalaryGrowth / 100, yearsFromCurrent);

                if (salaryForYear > plan.threshold) {
                    firstRepaymentYear = year;
                    break;
                }
            }
        }

        // Final fallback - assume they start repaying 2 years after graduation
        if (firstRepaymentYear === null) {
            firstRepaymentYear = graduationYear + 2;
        }

        // Write-off is 30 years from first repayment year
        const writeOffYearCalculated = firstRepaymentYear + plan.writeOffYears;

        const currentRate = getInterestRate(currentSalary, plan);
        setCurrentInterestRate(currentRate);

        let currentAnnualRepayment = 0;
        if (currentSalary > plan.threshold) {
            currentAnnualRepayment =
                (currentSalary - plan.threshold) * (plan.rate / 100);
        }

        let remainingBalance = loanAmount;
        let totalPaid = 0;
        const chartData: LoanDataPoint[] = [];
        let yearsPaidOff: number | null = null;
        let writtenOffAmount = 0;

        // Simulate from graduation to write-off
        for (
            let year = graduationYear;
            year <= writeOffYearCalculated;
            year++
        ) {
            let salaryThisYear;
            if (year <= currentYear) {
                const yearsFromCurrent = currentYear - year;
                salaryThisYear =
                    currentSalary /
                    Math.pow(1 + expectedSalaryGrowth / 100, yearsFromCurrent);
            } else {
                const yearsFromCurrent = year - currentYear;
                salaryThisYear =
                    currentSalary *
                    Math.pow(1 + expectedSalaryGrowth / 100, yearsFromCurrent);
            }

            let annualPayment = 0;
            const yearlyRate = getInterestRate(salaryThisYear, plan);
            let interestAccrued = 0;

            if (remainingBalance > 0) {
                if (year < writeOffYearCalculated) {
                    // Apply interest every year
                    interestAccrued = remainingBalance * (yearlyRate / 100);
                    remainingBalance += interestAccrued;

                    // Only apply payments if earning over threshold AND after first repayment year
                    if (
                        salaryThisYear > plan.threshold &&
                        year >= firstRepaymentYear
                    ) {
                        annualPayment =
                            (salaryThisYear - plan.threshold) *
                            (plan.rate / 100);
                        const actualPayment = Math.min(
                            annualPayment,
                            remainingBalance
                        );
                        remainingBalance -= actualPayment;
                        totalPaid += actualPayment;

                        if (remainingBalance <= 0 && yearsPaidOff === null) {
                            yearsPaidOff = year;
                            remainingBalance = 0;
                        }
                    }

                    chartData.push({
                        year: year,
                        balance: remainingBalance,
                        monthlyPayment: annualPayment / 12,
                        annualPayment: annualPayment,
                        interestRate: yearlyRate,
                        salary: salaryThisYear,
                        totalPaid: totalPaid,
                        interestAccrued: interestAccrued,
                    });
                } else if (year === writeOffYearCalculated) {
                    // Write-off year
                    interestAccrued = remainingBalance * (yearlyRate / 100);
                    remainingBalance += interestAccrued;

                    if (salaryThisYear > plan.threshold) {
                        annualPayment =
                            (salaryThisYear - plan.threshold) *
                            (plan.rate / 100);
                        const actualPayment = Math.min(
                            annualPayment,
                            remainingBalance
                        );
                        remainingBalance -= actualPayment;
                        totalPaid += actualPayment;
                    }

                    writtenOffAmount = remainingBalance;

                    chartData.push({
                        year: year,
                        balance: 0,
                        monthlyPayment: annualPayment / 12,
                        annualPayment: annualPayment,
                        interestRate: yearlyRate,
                        salary: salaryThisYear,
                        totalPaid: totalPaid,
                        interestAccrued: interestAccrued,
                        writtenOff: writtenOffAmount,
                    });

                    remainingBalance = 0;
                }
            } else {
                chartData.push({
                    year: year,
                    balance: 0,
                    monthlyPayment: 0,
                    annualPayment: 0,
                    interestRate: 0,
                    salary: salaryThisYear,
                    totalPaid: totalPaid,
                    interestAccrued: 0,
                });
            }
        }

        setLoanData(chartData);
        setAnnualRepayment(currentAnnualRepayment);
        setMonthlyRepayment(currentAnnualRepayment / 12);
        setTotalRepaid(totalPaid);
        setRemainingDebt(writtenOffAmount);
        setWriteOffYear(writeOffYearCalculated);
        setWillBeWrittenOff(writtenOffAmount > 0);
        setPayoffYear(yearsPaidOff);
    };

    useEffect(() => {
        calculateRepayments();
    }, [
        loanAmount,
        currentSalary,
        expectedSalaryGrowth,
        loanPlan,
        graduationYear,
    ]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatPercentage = (value: number) => {
        return `${value.toFixed(1)}%`;
    };

    const getRepaymentStatus = () => {
        if (currentSalary <= loanPlans[loanPlan].threshold) {
            return {
                text: "No repayments required",
                color: "#10b981",
                level: "none",
            };
        } else if (annualRepayment <= currentSalary * 0.05) {
            return {
                text: "Low repayment burden",
                color: "#3b82f6",
                level: "low",
            };
        } else if (annualRepayment <= currentSalary * 0.1) {
            return {
                text: "Moderate repayment burden",
                color: "#f59e0b",
                level: "medium",
            };
        } else {
            return {
                text: "High repayment burden",
                color: "#ef4444",
                level: "high",
            };
        }
    };

    const repaymentStatus = getRepaymentStatus();
    const plan = loanPlans[loanPlan];

    return (
        <div style={containerStyle}>
            <div style={mainContainerStyle}>
                <h1 style={titleStyle}>Postgraduate Loan Repayments</h1>

                {/* Input Form */}
                <div style={cardStyle}>
                    <div style={gridStyle}>
                        <InputBoxPound
                            label="Total Loan Amount"
                            value={loanAmount}
                            onChange={(value) => setLoanAmount(value)}
                            darkMode={darkMode}
                        />
                        <InputBoxPound
                            label="Current Annual Salary"
                            value={currentSalary}
                            onChange={(value) => setCurrentSalary(value)}
                            darkMode={darkMode}
                        />
                        <InputBoxPercentage
                            label="Expected Annual Salary Growth"
                            value={expectedSalaryGrowth}
                            onChange={(value) => setExpectedSalaryGrowth(value)}
                            darkMode={darkMode}
                        />

                        <InputBoxDropdown
                            label={"Graduation Year"}
                            value={graduationYear}
                            onChange={(value) => setGraduationYear(value)}
                            darkMode={darkMode}
                            listNumber={Array.from({length: 40}, (_, i) => new Date().getFullYear() - i)}
                        />
                    </div>
                </div>

                {loanAmount > 0 && loanData.length > 0 && (
                    <div
                        style={{
                            borderRadius: "1rem",
                            padding: "2rem",
                            marginBottom: "2rem",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "1.25rem",
                                fontWeight: "600",
                                marginBottom: "1.5rem",
                                color: darkMode ? "#e5e7eb" : "#1f2937",
                            }}
                        >
                            Loan Repayment Timeline
                        </h2>

                        <div style={{ height: "400px", marginBottom: "2rem" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={loanData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke={
                                            darkMode ? "#374151" : "#e5e7eb"
                                        }
                                    />
                                    <XAxis
                                        dataKey="year"
                                        stroke={
                                            darkMode ? "#9ca3af" : "#6b7280"
                                        }
                                    />
                                    <YAxis
                                        stroke={
                                            darkMode ? "#9ca3af" : "#6b7280"
                                        }
                                        tickFormatter={(value) =>
                                            `£${(value / 1000).toFixed(0)}k`
                                        }
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: darkMode
                                                ? "#1f2937"
                                                : "#ffffff",
                                            border: darkMode
                                                ? "1px solid #374151"
                                                : "1px solid #e5e7eb",
                                            borderRadius: "0.5rem",
                                        }}
                                        content={({
                                            active,
                                            payload,
                                            label,
                                        }) => {
                                            if (
                                                active &&
                                                payload &&
                                                payload.length
                                            ) {
                                                const data = payload[0].payload;
                                                return (
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                darkMode
                                                                    ? "#1f2937"
                                                                    : "#ffffff",
                                                            border: darkMode
                                                                ? "1px solid #374151"
                                                                : "1px solid #e5e7eb",
                                                            borderRadius:
                                                                "0.5rem",
                                                            padding: "12px",
                                                            boxShadow:
                                                                "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                                marginBottom:
                                                                    "8px",
                                                                color: darkMode
                                                                    ? "#ffffff"
                                                                    : "#000000",
                                                            }}
                                                        >
                                                            Year: {label}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: "#ef4444",
                                                                margin: "4px 0",
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            Remaining Balance: £
                                                            {Math.round(
                                                                data.balance
                                                            ).toLocaleString()}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: "#10b981",
                                                                margin: "4px 0",
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            Total Paid: £
                                                            {Math.round(
                                                                data.totalPaid
                                                            ).toLocaleString()}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: "#3b82f6",
                                                                margin: "4px 0",
                                                                fontSize:
                                                                    "14px",
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            Monthly Payment: £
                                                            {Math.round(
                                                                data.monthlyPayment
                                                            ).toLocaleString()}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: "#f59e0b",
                                                                margin: "4px 0",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Annual Salary: £
                                                            {Math.round(
                                                                data.salary
                                                            ).toLocaleString()}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: "#8b5cf6",
                                                                margin: "4px 0",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Interest Rate:{" "}
                                                            {data.interestRate?.toFixed(
                                                                1
                                                            )}
                                                            %
                                                        </p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Legend />
                                    {willBeWrittenOff && (
                                        <ReferenceLine
                                            x={writeOffYear}
                                            stroke="#ff6b35"
                                            strokeWidth={3}
                                            strokeDasharray="8 8"
                                            label={{
                                                value: `Debt Written Off (${writeOffYear})`,
                                                position: "top",
                                                style: {
                                                    fontSize: "12px",
                                                    fontWeight: "bold",
                                                    fill: "#ff6b35",
                                                },
                                            }}
                                        />
                                    )}
                                    {payoffYear && (
                                        <ReferenceLine
                                            x={payoffYear}
                                            stroke="#22c55e"
                                            strokeWidth={3}
                                            strokeDasharray="8 8"
                                            label={{
                                                value: `Loan Paid Off (${payoffYear})`,
                                                position: "top",
                                                style: {
                                                    fontSize: "12px",
                                                    fontWeight: "bold",
                                                    fill: "#22c55e",
                                                },
                                            }}
                                        />
                                    )}
                                    <Area
                                        type="monotone"
                                        dataKey="balance"
                                        fill="#ef444420"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        name="Remaining Balance"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="totalPaid"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        name="Total Paid"
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {loanAmount > 0 && (
                    <div
                        style={{
                            borderRadius: "1rem",
                            padding: "2rem",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "1.25rem",
                                fontWeight: "600",
                                marginBottom: "1.5rem",
                                color: darkMode ? "#e5e7eb" : "#1f2937",
                            }}
                        >
                            Current Position Summary
                        </h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: "1rem",
                            }}
                        >
                            <div
                                style={{
                                    padding: "1rem",
                                    borderRadius: "0.5rem",
                                    backgroundColor: "#3b82f620",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "0.875rem",
                                        color: "#3b82f6",
                                    }}
                                >
                                    Monthly Repayment
                                </div>
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                        color: "#3b82f6",
                                    }}
                                >
                                    {formatCurrency(monthlyRepayment)}
                                </div>
                            </div>

                            <div
                                style={{
                                    padding: "1rem",
                                    borderRadius: "0.5rem",
                                    backgroundColor: "#f59e0b20",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "0.875rem",
                                        color: "#f59e0b",
                                    }}
                                >
                                    Current Interest Rate
                                </div>
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                        color: "#f59e0b",
                                    }}
                                >
                                    {formatPercentage(currentInterestRate)}
                                </div>
                            </div>

                            <div
                                style={{
                                    padding: "1rem",
                                    borderRadius: "0.5rem",
                                    backgroundColor: "#10b98120",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "0.875rem",
                                        color: "#10b981",
                                    }}
                                >
                                    Total Expected Repayment
                                </div>
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                        color: "#10b981",
                                    }}
                                >
                                    {formatCurrency(totalRepaid)}
                                </div>
                            </div>

                            <div
                                style={{
                                    padding: "1rem",
                                    borderRadius: "0.5rem",
                                    backgroundColor: payoffYear
                                        ? "#10b98120"
                                        : "#ef444420",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "0.875rem",
                                        color: payoffYear
                                            ? "#10b981"
                                            : "#ef4444",
                                    }}
                                >
                                    {payoffYear
                                        ? "Loan Paid Off By"
                                        : "Loan Written Off In"}
                                </div>
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                        color: payoffYear
                                            ? "#10b981"
                                            : "#ef4444",
                                    }}
                                >
                                    {payoffYear || writeOffYear}
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: "1.5rem",
                                padding: "1rem",
                                borderRadius: "0.5rem",
                                borderLeft: `4px solid ${repaymentStatus.color}`,
                                backgroundColor: darkMode
                                    ? "#374151"
                                    : "#f9fafb",
                            }}
                        >
                            <div
                                style={{
                                    color: repaymentStatus.color,
                                    fontWeight: "600",
                                }}
                            >
                                {repaymentStatus.text}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.75rem",
                                    color: darkMode ? "#9ca3af" : "#6b7280",
                                    marginTop: "0.5rem",
                                }}
                            >
                                <strong>Plan Details:</strong> {plan.name} •
                                Threshold: {formatCurrency(plan.threshold)} •
                                Rate: {plan.rate}% above threshold
                                <br />
                                <strong>Interest Rate:</strong>{" "}
                                {formatPercentage(plan.baseInterestRate)} -{" "}
                                {formatPercentage(plan.maxInterestRate)} (varies
                                with income) • Currently:{" "}
                                {formatPercentage(currentInterestRate)}
                                <br />
                                <strong>Timeline:</strong> Loan from{" "}
                                {graduationYear} to {writeOffYear} • Write-off
                                countdown starts when first earning over
                                threshold
                                <br />
                                <strong>Note:</strong> Interest accrues from
                                graduation, but 30-year write-off period starts
                                from first repayment eligibility
                            </div>
                        </div>
                    </div>
                )}

                {loanAmount === 0 && (
                    <div
                        style={{
                            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                            borderRadius: "1rem",
                            padding: "2rem",
                            textAlign: "center",
                            color: darkMode ? "#9ca3af" : "#6b7280",
                        }}
                    >
                        Enter a loan amount to see your repayment calculations
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostgraduateLoanCalculator;
