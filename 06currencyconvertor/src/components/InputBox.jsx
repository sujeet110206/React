import { useId } from "react";
import React from 'react';

function InputBox({
    label,                 // Label text (like "From" or "To")
    amount,                // Current amount value
    onAmountChange,        // Function to handle amount input changes
    onCurrencyChange,      // Function to handle currency select changes
    currencyOptions = [],  // List of available currencies (e.g., USD, INR)
    selectCurrency = "usd",  // Default selected currency
    amountDisabled = false,  // Disable amount input when true
    currencyDisabled = false,  // Disable dropdown when true
    className = ""         // Extra CSS classes (optional)
}) {
    const amountInputId = useId(); // Unique ID for input and label

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            
            {/* Left side: amount input */}
            <div className="w-1/2">
                <label 
                    htmlFor={amountInputId}  
                    className="text-black/40 mb-2 inline-block"
                >
                    {label}
                </label>
                
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisabled} // disable input if needed
                    value={amount}             // current amount value
                    onChange={(e) => 
                        onAmountChange && onAmountChange(Number(e.target.value))
                    } // call handler when amount changes
                />
            </div>

            {/* Right side: currency dropdown */}
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    disabled={currencyDisabled} // disable dropdown if needed
                    value={selectCurrency}       // current selected currency
                    onChange={(e) => 
                        onCurrencyChange && onCurrencyChange(e.target.value)
                    } // call handler when currency changes
                >
                    {/* List all available currency options */}
                    {currencyOptions.map((currency) => (
                        <option
                            key={currency}
                            value={currency}
                        >
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
