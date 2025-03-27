import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IProperty, PropertiesService } from "../services/api/properties/PropertiesService";

import Property from "../components/Property";
import Search from "../components/Search";
import Skeleton from "../components/Skeleton";

const Properties = () => {
    const [searchParams] = useSearchParams();
    const queryString = searchParams.get("query");
    const purpose = searchParams.get("purpose") || "for-rent";
    const homeType = searchParams.get("homeType");
    const priceLimit = searchParams.get("priceLimit");
    const beds = searchParams.get("beds");
    const baths = searchParams.get("baths");
    const sqft = searchParams.get("sqft");

    const query = new URLSearchParams({
        locationExternalIDs: "5002,6020",
        purpose,
        lang: "en",
        rentFrequency: "monthly",
        categoryExternalID: "4",
        priceMax: priceLimit || "",
        roomsMin: beds || "",
        bathsMin: baths || ""
    }).toString();

    const {
        data: properties,
        isError,
        isPending
    } = useQuery({
        queryKey: ["properties", purpose, homeType, priceLimit, beds, baths],
        staleTime: 1000 * 60 * 30,
        queryFn: async () => {
            const response = await PropertiesService.getProperties(query);
            return response.hits || [];
        }
    });

    return (
        <div className="properties-page container">
            <div className="properties-page__grid">
                <div className="search-properties">
                    <h1 className="properties-page__title">Properties</h1>
                    <Search />
                </div>
                <div>
                    {purpose === "for-rent" ? <h1 className="properties-page__title" style={{paddingLeft: "25px"}}>For Rent</h1> : ""}
                    {purpose === "for-sale" ? <h1 className="properties-page__title" style={{paddingLeft: "25px"}}>For Sale</h1> : ""}
                    <div className="properties-page__list">
                        {isPending &&
                            [...Array(9)].map((_, i) => <Skeleton key={i} />)
                        }
                        {!isPending &&
                            properties?.map((property: IProperty) => (
                                <Property property={property} key={property.id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Properties;
