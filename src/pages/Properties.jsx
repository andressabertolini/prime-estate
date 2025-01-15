import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Property from "../components/Property";

const Properties = () => {
    const [searchParams] = useSearchParams();
    const purpose = searchParams.get("purpose") || "for-rent";

    const [properties, setProperties] = useState([]);

    const apiKey = process.env.REACT_APP_API_KEY;
    const apiHost = process.env.REACT_APP_API_HOST;

    const query = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=${purpose}&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4`;

    const fetchAPI = () => {
        fetch(query,
            {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiHost,
                }
            })
            .then(res => res.json()
            .then(data => {
                console.log(data);
                setProperties(data.hits);
            }))
    }

    useEffect(() => {
        fetchAPI();
    },[])

    return(
    <div className="properties-page">
        <h1 className="properties-page__title">Properties</h1>
        <div className="properties-page__list">
            {properties.map((property) => (<Property property={property} key={property.id}/>))}
        </div>
    </div>
    )
}

export default Properties;