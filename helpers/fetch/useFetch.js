import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!url) {
                return;
            }

            const res = await fetch(url);
            const resJson = await res.json();

            if (resJson.errors) {
                setError(resJson.errors.join(", "));
                setResponse(resJson.errors);
                return;
            }
            setResponse(resJson);
        };
        fetchData();
    }, [url]);

    return [data, error];
};

export default useFetch;
