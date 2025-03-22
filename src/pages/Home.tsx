import { useQuery } from "@tanstack/react-query";

/* Components */
import Search from "../components/Search";
import Banner from "../components/Banner";
import Property from "../components/Property";
import Skeleton from "../components/Skeleton";

const apiKey = process.env.REACT_APP_API_KEY;
const apiHost = process.env.REACT_APP_API_HOST;

const forRent = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=4&page=0&rentFrequency=monthly&categoryExternalID=4&priceMax=9000&priceMin=6000`;
const forSale = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=4&page=0&rentFrequency=monthly&categoryExternalID=4`;

type PropertyType = {
    id: string;
    externalID: string;
    coverPhoto: { url: string };
    purpose: "for-rent" | "for-sale";
    title: string;
    area?: number;
    rooms: number;
    baths: number;
    amenities?: string[];
    price: number;
    agency: { logo: { url: string } };
};

const Home = () => {
    // Hook customizado para consultas
    const usePropertyQuery = (queryKey: string, url: string) => {
        return useQuery({
            queryKey: [queryKey],
            staleTime: 1000 * 60 * 30,
            queryFn: async () => {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": apiKey || "",
                        "X-RapidAPI-Host": apiHost || ""
                    },
                });
                const data = await response.json();
                return data?.hits;
            },
        });
    };

    // Chamada para a consulta de aluguel
    const { data: propertiesRent, isError: isErrorRent, isLoading: isPendingRent } = usePropertyQuery("propertiesRent", forRent);
    
    // Chamada para a consulta de venda
    const { data: propertiesSale, isError: isErrorSale, isLoading: isPendingSale } = usePropertyQuery("propertiesSale", forSale);

    return(
        <>
            <div className="home-search search-container">
                <div className="search">
                    <h1>Search for your dream home</h1>
                    <Search />
                </div>
            </div>
            <Banner 
                title="Rent a Home"
                buttonText="Explore Renting"
                linkUrl="/properties?purpose=for-rent"
            />
            <div className="properties-list">
                {isPendingRent && 
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                }
                {!isPendingRent && (
                    propertiesRent?.map((property: any) => {
                        return <Property property={property} key={property.id} />;
                    })
                )}
            </div>
            <Banner 
                title="Buy a Home"
                buttonText="Explore Buying"
                linkUrl="/properties?purpose=for-sale"
            />
            <div className="properties-list">
                {isPendingSale && 
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                }
                {!isPendingSale && (
                    propertiesSale?.map((property: PropertyType) => {
                        return <Property property={property} key={property.id} />;
                    })
                )} 
            </div>
        </>
    );
};

export default Home;