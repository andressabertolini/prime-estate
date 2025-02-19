import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Property from "../components/Property";
import fallbackData from "../data";
import Search from "../components/Search";

const Properties = () => {
    const [searchParams] = useSearchParams();
    const queryString = searchParams.get("query");
    const purpose = searchParams.get("purpose") || "for-rent";
    const homeType = searchParams.get("homeType");
    const priceLimit = searchParams.get("priceLimit");
    const beds = searchParams.get("beds");
    const baths = searchParams.get("baths");
    const sqft = searchParams.get("sqft");

    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filteredProperties, setFilteredProperties] = useState([]);

    const apiKey = process.env.REACT_APP_API_KEY;
    const apiHost = process.env.REACT_APP_API_HOST;

    const query = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=${purpose}&lang=en&rentFrequency=monthly&categoryExternalID=4`;

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

            const properties = apiData?.hits ?? [];
            //console.log(apiData);

            if (properties.length > 0) {
                localStorage.setItem(
                    cacheKey,
                    JSON.stringify({
                        data: apiData?.hits || [],
                        timestamp: Date.now(),
                    })
                );
            } else {
                console.warn("No valid data to cache for:", cacheKey);
            }
        } catch (error) {
            console.error("API fetch failed, using fallback data:", error);
            setFunction(fallbackData);
        }
    };

    useEffect(() => {
        const cacheKey = `properties-${purpose}`;

        const checkAndFetch = async () => {
            const cachedData = JSON.parse(localStorage.getItem(cacheKey));
            console.log(cachedData);

            if (cachedData && Date.now() - cachedData.timestamp < ONE_WEEK && cachedData.length > 0) {
                setProperties(cachedData.data);
                setIsLoading(false);
            } else {
                await fetchAPI(query, setProperties, cacheKey);
                setIsLoading(false);
            }
        };

        checkAndFetch();
    }, [purpose]);

    const filterProperties = () => {
        // console.log(properties[0]?.category?.[1]?.slug);
        // console.log(properties[0].price);
        // console.log(properties[0].rooms);
        // console.log(properties[0].baths);
    
        let propertyType;
        if (homeType) {
            if (homeType === "apartment") {
                propertyType = "apartments";
            }
        }
    
        const filtered = properties.filter((property) => {
            const isValidPrice = property.price !== undefined;
            const matchesPropertyType = homeType ? (property.category?.length > 1 && property.category[1]?.slug === propertyType) : true;
            const matchesPrice = priceLimit ? property.price <= Number(priceLimit) : true;
            const matchesBeds = beds ? property.rooms >= Number(beds) : true;
            const matchesBaths = baths ? property.baths >= Number(baths) : true;
            return isValidPrice && matchesPropertyType && matchesPrice && matchesBeds && matchesBaths;
        });
    
        console.log("Filtered Properties:", filtered);
        setFilteredProperties(filtered);
    };

    useEffect(() => {
        if (properties.length > 0) {
            filterProperties();
        }
    }, [properties, homeType, priceLimit, beds, baths]);

    return (
        <div className="properties-page container">
            <div className="properties-page__grid">
                <div className="search-properties">
                    <h1 className="properties-page__title">Properties</h1>
                    <Search />
                </div>
                <div>
                    {purpose == "for-rent" ? <h1 className="properties-page__title" style={{paddingLeft: "25px"}}>For Rent</h1> : ""}
                    {purpose == "for-sale" ? <h1 className="properties-page__title" style={{paddingLeft: "25px"}}>For Sale</h1> : ""}
                    <div className="properties-page__list">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : filteredProperties.length > 0 ? (
                            filteredProperties.map((property) => (
                                <Property property={property} key={property.id} />
                            ))
                        ) : (
                            <p>No properties available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Properties;
