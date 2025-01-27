import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const fallbackProperty = {
    title: "Beautiful Apartment in Downtown",
    coverPhoto: { url: "https://via.placeholder.com/800" },
    price: 2000,
    amenities: [
        {
            externalGroupID: "1",
            text: "Main Amenities",
            amenities: [
                { text: "Swimming Pool" },
                { text: "Gym" },
                { text: "Parking" },
            ],
        },
    ],
    description: "Spacious apartment with modern amenities and a beautiful view of the city.",
};

const Property = () => {
    const { id } = useParams();
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiHost = process.env.REACT_APP_API_HOST;

    const url = `https://bayut.p.rapidapi.com/properties/detail?externalID=${id}`;

    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAPI = async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": apiKey,
                    "X-RapidAPI-Host": apiHost,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch property details.");
            }

            const data = await response.json();
            setProperty(data);

            localStorage.setItem(
                `property-${id}`,
                JSON.stringify({
                    data,
                    timestamp: Date.now(),
                })
            );
        } catch (error) {
            console.error("API fetch failed, using fallback data:", error);
            setProperty(fallbackProperty);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const cacheKey = `property-${id}`;
        const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

        const checkAndFetch = async () => {
            const cachedData = JSON.parse(localStorage.getItem(cacheKey));

            if (cachedData && Date.now() - cachedData.timestamp < ONE_WEEK) {
                setProperty(cachedData.data);
                setIsLoading(false);
            } else {
                await fetchAPI();
            }
        };

        checkAndFetch();
    }, [id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!property) {
        return <p>Property not found.</p>;
    }

    return (
        <div className="property-page">
            <h1>{property?.title}</h1>
            <img
                src={property?.coverPhoto?.url || ""}
                alt="Property Cover"
                className="property-page__cover"
            />
            <p className="property-page__price">
                <strong>
                    {property?.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </strong>
            </p>
            <h3>Amenities:</h3>
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
            <h3>Description:</h3>
            <p>{property?.description}</p>
        </div>
    );
};

export default Property;
