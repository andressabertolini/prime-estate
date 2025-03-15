import { useQuery } from "@tanstack/react-query";

/* Components */
import Search from "../components/Search";
import Banner from "../components/Banner";
import Property from "../components/Property";
import Skeleton from "../components/Skeleton";

const apiKey = process.env.REACT_APP_API_KEY;
const apiHost = process.env.REACT_APP_API_HOST;

const forRent = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=4&page=0&rentFrequency=monthly&categoryExternalID=4&priceMax=9000&priceMin=6000`;
//const forSale = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=4&page=0&rentFrequency=monthly&categoryExternalID=4`;

const Home = () => {
    const {
        data: propertiesRent,
        isError,
        isPending,
      } = useQuery({
        queryKey: ["propertiesRent"],
        staleTime: 1000 * 60 * 30,
        queryFn: async () => {
          const response = await fetch(forRent, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": apiHost
            },
          });
          const data = await response.json();
          return data?.hits;
        },
      });

    return(
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
            {isPending && 
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
            }
            {!isPending && (
                propertiesRent?.map((property) => {
                    return <Property property={property} key={property.id} />;
                })
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
                
            </div>
        </>
    );
};

export default Home;