import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Property from "../components/Property";
import fallbackData from "../data";

const Properties = () => {
    const [searchParams] = useSearchParams();
    const purpose = searchParams.get("purpose") || "for-rent";

    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const apiKey = process.env.REACT_APP_API_KEY;
    const apiHost = process.env.REACT_APP_API_HOST;

    const query = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=${purpose}&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4`;

    const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

    const fetchAPI = async (url, setFunction, cacheKey) => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": apiKey,
                    "X-RapidAPI-Host": apiHost,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data from API");
            }

            const apiData = await response.json();
            setFunction(apiData?.hits || []);

            localStorage.setItem(
                cacheKey,
                JSON.stringify({
                    data: apiData?.hits || [],
                    timestamp: Date.now(),
                })
            );
        } catch (error) {
            console.error("API fetch failed, using fallback data:", error);
            setFunction(fallbackData);
        }
    };

    useEffect(() => {
        const cacheKey = `properties-${purpose}`;

        const checkAndFetch = async () => {
            const cachedData = JSON.parse(localStorage.getItem(cacheKey));
            if (cachedData && Date.now() - cachedData.timestamp < ONE_WEEK) {
                setProperties(cachedData.data);
                setIsLoading(false);
            } else {
                await fetchAPI(query, setProperties, cacheKey);
                setIsLoading(false);
            }
        };

        checkAndFetch();
    }, [purpose]);

    return (
        <div className="properties-page">
            <h1 className="properties-page__title">Properties</h1>
            <div className="properties-page__list">
                {isLoading ? (
                    <p>Loading...</p>
                ) : properties.length > 0 ? (
                    properties.map((property) => (
                        <Property property={property} key={property.id} />
                    ))
                ) : (
                    <p>No properties available.</p>
                )}
            </div>
        </div>
    );
};

export default Properties;
