import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    // Store the fetched currency conversion data
    const [data, setData] = useState({});

    useEffect(() => {
        // Fetch currency data from API whenever 'currency' changes
        fetch(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
        )
        .then((res) => res.json())        // Convert response to JSON
        .then((res) => setData(res[currency])); // Store exchange rates for that currency
        
    }, [currency]); // Run effect every time 'currency' changes

    // Return the fetched data so other components can use it
    return data;
}

export default useCurrencyInfo;
