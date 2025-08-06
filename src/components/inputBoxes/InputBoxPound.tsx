import React from "react";

interface InputBoxPoundProps {
    darkMode?: boolean;
    value: number;                    
    onChange: (value: number) => void; 
    label?: string;                   
    placeholder?: string;              
}

function InputBoxPound({ 
    darkMode = false, 
    value,              
    onChange,           
    label = "...",   
    placeholder = "0"   
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

    const symbolStyle: React.CSSProperties = {
        position: "absolute",
        left: "0.75rem",
        top: "25%",
        fontWeight: "600",
        color: darkMode ? "#9ca3af" : "#6b7280",
        pointerEvents: "none",
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

    const currencyInputStyle: React.CSSProperties = {
        ...inputStyle,
        paddingLeft: "2rem",
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // If current value is 0 and user types a digit, clear the input first
        if (value === 0 && /[0-9]/.test(e.key)) {
            // Clear the input so the new digit replaces the 0
            const target = e.target as HTMLInputElement;
            target.value = "";
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        
        // If completely empty, set to 0
        if (inputValue === "") {
            onChange(0);
            return;
        }
        
        // Convert to number
        const numValue = Number(inputValue);
        
        // If valid number, update
        if (!isNaN(numValue)) {
            onChange(numValue);
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        // Apply focus styling
        e.target.style.borderColor = "#059669";
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // Remove focus styling
        e.target.style.borderColor = darkMode ? "#4b5563" : "#d1d5db";
    };

    return (
        <div style={inputGroupStyle}>
            <label style={labelStyle}>{label}</label>
            <div style={{ position: "relative" }}>
                <span style={symbolStyle}>£</span>
                <input
                    type="number"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={currencyInputStyle}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}

export default InputBoxPound;