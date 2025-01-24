import { useEffect, useState } from "react";
import data from "../data";
/* Components */
import Search from "../components/Search";
import Banner from "../components/Banner";
import Property from "../components/Property";
import Skeleton from "../components/Skeleton";

const apiKey = process.env.REACT_APP_API_KEY;
const apiHost = process.env.REACT_APP_API_HOST;

const forRent = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=4&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4&priceMax=9000&priceMin=6000`;
const forSale = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=4&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4`;

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

            // Atualiza o cache
            localStorage.setItem(
                cacheKey,
                JSON.stringify({
                    data: apiData?.hits || [],
                    timestamp: Date.now(),
                })
            );
        } catch (error) {
            console.error("API fetch failed, using fallback data:", error);
            setFunction(data); // Usa dados de fallback
        }
    };

    useEffect(() => {
        const checkAndFetch = async () => {
            // Cache para aluguel
            const cachedRent = JSON.parse(localStorage.getItem("propertiesRent"));
            if (cachedRent && Date.now() - cachedRent.timestamp < ONE_WEEK) {
                setPropertiesRent(cachedRent.data);
                setIsLoadingRent(false);
            } else {
                await fetchAPI(forRent, setPropertiesRent, "propertiesRent");
                setIsLoadingRent(false);
            }

            // Cache para venda
            const cachedSale = JSON.parse(localStorage.getItem("propertiesSale"));
            if (cachedSale && Date.now() - cachedSale.timestamp < ONE_WEEK) {
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
            <div className="search-container">
                <Search />
            </div>
            <Banner 
                purpose="Rent a Home"
                title="Rental Homes for Everyone"
                desc="Explore Apartments, Villas, Homes and more"
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
                desc="Explore Apartments, Villas, Homes and more"
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