import { useQuery } from "@tanstack/react-query";
import { IProperty, PropertiesService } from "../services/api/properties/PropertiesService";

/* Components */
import Search from "../components/Search";
import Banner from "../components/Banner";
import Property from "../components/Property";
import Skeleton from "../components/Skeleton";

const Home = () => {
    const usePropertyQuery = (queryKey: string, queryFn: () => Promise<IProperty[]>) => {
        return useQuery({
            queryKey: [queryKey],
            staleTime: 1000 * 60 * 30,
            queryFn,
        });
    };

    const { data: propertiesRent, isError: isErrorRent, isLoading: isPendingRent } = 
        usePropertyQuery("propertiesRent", PropertiesService.getRent);

    const { data: propertiesSale, isError: isErrorSale, isLoading: isPendingSale } = 
        usePropertyQuery("propertiesSale", PropertiesService.getSale);

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
                {!isPendingRent && Array.isArray(propertiesRent) && propertiesRent.map((property: IProperty) => (
                    <Property property={property} key={property.id} />
                ))}
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
                {!isPendingSale && Array.isArray(propertiesSale) && propertiesSale.map((property: IProperty) => (
                    <Property property={property} key={property.id} />
                ))}
            </div>
        </>
    );
};

export default Home;