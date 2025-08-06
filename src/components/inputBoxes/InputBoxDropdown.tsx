import React, { useState } from "react";

// Separate interfaces for different use cases
interface InputBoxDropdownNumberProps {
    darkMode?: boolean;
    value: number;
    onChange: (value: number) => void;
    label?: string;
    measurements?: string;
    listNumber: number[];
    customTextList?: string[];
    placeholder?: string;
    disabled?: boolean;
}

interface InputBoxDropdownStringProps {
    darkMode?: boolean;
    value: string;
    onChange: (value: string) => void;
    label?: string;
    measurements?: string;
    listString: string[];
    customTextList?: string[];
    placeholder?: string;
    disabled?: boolean;
}

type InputBoxDropdownProps = InputBoxDropdownNumberProps | InputBoxDropdownStringProps;

function InputBoxDropdown(props: InputBoxDropdownProps) {
    const {
        darkMode = false,
        value,
        onChange,
        label = "Select Option",
        measurements = "",
        customTextList,
        placeholder = "Choose an option",
        disabled = false
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    // Get the list based on which prop is provided
    const list = 'listNumber' in props ? props.listNumber : props.listString;

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

    const getBorderColor = () => {
        if (isFocused) return "#059669";
        return darkMode ? "#4b5563" : "#d1d5db";
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        maxWidth: "100%",
        height: "48px",
        padding: "0.75rem 1rem",
        border: `1px solid ${getBorderColor()}`,
        borderRadius: "0.5rem",
        fontSize: "1rem",
        outline: "none",
        transition: "all 0.2s ease",
        backgroundColor: disabled
            ? (darkMode ? "#1f2937" : "#f3f4f6")
            : (darkMode ? "#374151" : "#f9fafb"),
        color: disabled
            ? (darkMode ? "#6b7280" : "#9ca3af")
            : (darkMode ? "#ffffff" : "#111827"),
        boxSizing: "border-box",
        cursor: disabled ? "not-allowed" : "pointer",
    };

    // Helper function to get display text for each option
    const getDisplayText = (item: number | string, index: number): string => {
        // If customTextList exists and has text for this index, use it
        if (customTextList && customTextList[index] && customTextList[index].trim() !== "") {
            return customTextList[index];
        }
        // Otherwise, use the item value + measurements
        return `${item}${measurements}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        
        // Find the original item in the list
        const listIndex = list.findIndex(item => String(item) === selectedValue);
        if (listIndex !== -1) {
            const originalItem = list[listIndex];
            
            // Type-safe onChange call
            if ('listNumber' in props) {
                (onChange as (value: number) => void)(originalItem as number);
            } else {
                (onChange as (value: string) => void)(originalItem as string);
            }
        }
    };

    return (
        <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="dropdown-select">
                {label}
            </label>
            <select
                id="dropdown-select"
                value={value}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={inputStyle}
                disabled={disabled}
                aria-label={label}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {list.map((item, index) => (
                    <option key={index} value={item}>
                        {getDisplayText(item, index)}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default InputBoxDropdown;