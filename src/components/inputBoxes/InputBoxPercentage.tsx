import React from "react";

interface InputBoxPoundProps {
    darkMode?: boolean;
    value: number;
    onChange: (value: number) => void;
    label?: string;
    currency?: string;
    placeholder?: string;
}

function InputBoxPercentage({
    darkMode = false,
    value,
    onChange,
    label = "...",
    currency = "£",
    placeholder = "0",
}: InputBoxPoundProps) {
    const inputGroupStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    };

    const labelStyle: React.CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: "500",
        color: darkMode ? "#d1d5db" : "#374151",
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        maxWidth: "100%",
        height: "48px",
        padding: "0.75rem 1rem",
        border: darkMode ? "1px solid #4b5563" : "1px solid #d1d5db",
        borderRadius: "0.5rem",
        fontSize: "1rem",
        outline: "none",
        transition: "all 0.2s ease",
        backgroundColor: darkMode ? "#374151" : "#f9fafb",
        color: darkMode ? "#ffffff" : "#111827",
        boxSizing: "border-box",
    };
    const percentInputStyle: React.CSSProperties = {
        ...inputStyle,
        paddingRight: "2rem",
    };

    const percentSymbolStyle: React.CSSProperties = {
        position: "absolute",
        right: "0.75rem",
        top: "50%",
        transform: "translateY(-50%)",
        fontWeight: "500",
        color: darkMode ? "#9ca3af" : "#6b7280",
        pointerEvents: "none",
    };

    return (
        <div style={inputGroupStyle}>
            <label style={labelStyle}>{label}</label>
            <div style={{ position: "relative" }}>
                <input
                    type="number"
                    step="0.1"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    style={percentInputStyle}
                    placeholder={placeholder}
                    onFocus={(e) => (e.target.style.borderColor = "#059669")}
                    onBlur={(e) =>
                        (e.target.style.borderColor = darkMode
                            ? "#4b5563"
                            : "#d1d5db")
                    }
                />
                <span style={percentSymbolStyle}>%</span>
            </div>
        </div>
    );
}

export default InputBoxPercentage;
