import { useEffect, useState } from "react";
import data from "../data";
/* Components */
import Banner from "../components/Banner";
import Property from "../components/Property";
import Skeleton from "../components/Skeleton";
/* Images */
import House1 from "../assets/images/house1.jpg";
import House2 from "../assets/images/house2.jpg";

const apiKey = process.env.REACT_APP_API_KEY;
const apiHost = process.env.REACT_APP_API_HOST;

const forRent = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=4&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4&priceMax=9000&priceMin=6000`;
const forSale = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=4&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4`;

const Home = () => {
    const [propertiesRent, setPropertiesRent] = useState([]);
    const [propertiesSale, setPropertiesSale] = useState([]);
    const [isLoadingRent, setIsLoadingRent] = useState(true);
    const [isLoadingSale, setIsLoadingSale] = useState(true);

    const fetchAPI = async () => {
        try {
            // Requisição para imóveis para aluguel
            const responseRent = await fetch(forRent, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiHost,
                },
            });

            if (!responseRent.ok) {
                throw new Error("Failed to fetch data from API for rent");
            }
            const apiDataRent = await responseRent.json();
            setPropertiesRent(apiDataRent?.hits || []); // Corrigido para pegar os imóveis da resposta
        } catch (error) {
            console.error("API fetch failed for rent, using fallback data:", error);
            setPropertiesRent(data); // Usa o arquivo de dados como fallback
        } finally {
            setIsLoadingRent(false); // Finaliza o loading após a tentativa
        }

        try {
            // Requisição para imóveis à venda
            const responseSale = await fetch(forSale, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiHost,
                },
            });

            if (!responseSale.ok) {
                throw new Error("Failed to fetch data from API for sale");
            }
            const apiDataSale = await responseSale.json();
            setPropertiesSale(apiDataSale?.hits || []); // Corrigido para pegar os imóveis da resposta
        } catch (error) {
            console.error("API fetch failed for sale, using fallback data:", error);
            setPropertiesSale(data); // Usa o arquivo de dados como fallback
        } finally {
            setIsLoadingSale(false); // Finaliza o loading após a tentativa
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []); // Requisição executada quando o componente for montado

    return (
        <>
            <Banner 
                purpose="Rent a Home"
                title1="Rental Homes for"
                title2="Everyone"
                desc1="Explore Apartments, Villas, Homes"
                desc2="and more"
                buttonText="Explore Renting"
                linkUrl="/properties?purpose=for-rent"
                imageUrl={House1}
                align="left"
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
                title1="Find, Buy & Own Your"
                title2="Dream Home"
                desc1="Explore Apartments, Villas, Homes"
                desc2="and more"
                buttonText="Explore Buying"
                linkUrl="/properties?purpose=for-sale"
                imageUrl={House2}
                align="right"
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
