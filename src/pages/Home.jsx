import { useEffect, useState } from "react";
import data from "../data";
/* Components */
import Search from "../components/Search";
import Banner from "../components/Banner";
import Property from "../components/Property";
import Skeleton from "../components/Skeleton";

const apiKey = process.env.REACT_APP_API_KEY;
const apiHost = process.env.REACT_APP_API_HOST;

const forRent = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=4&page=0&rentFrequency=monthly&categoryExternalID=4&priceMax=9000&priceMin=6000`;
const forSale = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=4&page=0&rentFrequency=monthly&categoryExternalID=4`;

const Home = () => {
    const [propertiesRent, setPropertiesRent] = useState([]);
    const [propertiesSale, setPropertiesSale] = useState([]);
    const [isLoadingRent, setIsLoadingRent] = useState(true);
    const [isLoadingSale, setIsLoadingSale] = useState(true);

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
            console.log(apiData);

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
            setFunction(data);
        }
    };

    useEffect(() => {
        const checkAndFetch = async () => {
            const cachedRent = JSON.parse(localStorage.getItem("propertiesRent"));
            if (cachedRent && Date.now() - cachedRent.timestamp < ONE_WEEK && cachedRent.length > 0) {
                setPropertiesRent(cachedRent.data);
                setIsLoadingRent(false);
            } else {
                await fetchAPI(forRent, setPropertiesRent, "propertiesRent");
                setIsLoadingRent(false);
            }

            const cachedSale = JSON.parse(localStorage.getItem("propertiesSale"));
            if (cachedSale && Date.now() - cachedSale.timestamp < ONE_WEEK && cachedSale.length > 0) {
                setPropertiesSale(cachedSale.data);
                setIsLoadingSale(false);
            } else {
                await fetchAPI(forSale, setPropertiesSale, "propertiesSale");
                setIsLoadingSale(false);
            }
        };

        checkAndFetch();
    }, []);

    return (
        <>
            <div className="home-search search-container">
                <div className="search">
                    <h1>Search for your dream home</h1>
                    <Search />
                </div>
            </div>
            <Banner 
                purpose="Rent a Home"
                title="Rental Homes for Everyone"
                desc=""
                buttonText="Explore Renting"
                linkUrl="/properties?purpose=for-rent"
            />
            <div className="properties-list">
                {isLoadingRent ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : propertiesRent.length > 0 ? (
                    propertiesRent.map((property) => (
                        <Property property={property} key={property.id} />
                    ))
                ) : (
                    <p>No properties available for rent.</p>
                )}
            </div>
            <Banner 
                purpose="Buy a Home"
                title="Find, Buy & Own Your Dream Home"
                desc=""
                buttonText="Explore Buying"
                linkUrl="/properties?purpose=for-sale"
            />
            <div className="properties-list">
                {isLoadingSale ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : propertiesSale.length > 0 ? (
                    propertiesSale.map((property) => (
                        <Property property={property} key={property.id} />
                    ))
                ) : (
                    <p>No properties available for sale.</p>
                )}
            </div>
        </>
    );
};

export default Home;