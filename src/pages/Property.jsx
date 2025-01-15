import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Property = () => {
    const { id } = useParams();
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiHost = process.env.REACT_APP_API_HOST;

    const url = `https://bayut.p.rapidapi.com/properties/detail?externalID=${id}`;

    const [property, setProperty] = useState({});

    const fetchAPI = () => {
        fetch(url,
            {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiHost,
                }
            })
            .then(res => res.json())
            .then(data => {
                setProperty(data)
                console.log(data)
            })
    }

    useEffect(() => {
        fetchAPI()
    },[])
    return(
        <div className="property-page">
            <h1>{property?.title}</h1>
            <img src={property?.coverPhoto?.url || ''} className="property-page__cover"/>
            <p className="property-page__price">
                <strong>{property?.price?.toLocaleString('en-US',{
                    style: 'currency',
                    currency: 'USD'
                })}
                </strong>
            </p>
            amenities:
            <ul>
                {property?.amenities?.map((group) => (
                    <li key={group.externalGroupID}>
                    <strong>{group.text}</strong>
                    <ul>
                        {group.amenities.map((amenity, index) => (
                        <li key={index}>{amenity.text}</li>
                        ))}
                    </ul>
                    </li>
                ))}
            </ul>
            <hr />
            description:
            <p>{property?.description}</p>
        </div>
    )
}
export default Property;