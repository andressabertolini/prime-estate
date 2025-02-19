import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';

import RelatedProperties from "../components/RelatedProperties"

import house1Api from "../assets/images/house1-api.jpeg";
import IconSqft from "../assets/icons/icon-sqft.svg";
import IconBed from "../assets/icons/icon-bed.svg";
import IconBath from "../assets/icons/icon-bath.svg";

const fallbackProperty = {
    title: "Beautiful Apartment in Downtown",
    coverPhoto: {
        url: house1Api
    },
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
    const [slidesPerView, setSlidesPerView] = useState(1);

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

    useEffect(() => {
        function handleResize(){
            if(window.innerWidth < 768){
                setSlidesPerView(1);
            }else{
                setSlidesPerView(1.5);
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    },[]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!property) {
        return <p>Property not found.</p>;
    }

    return (
        <div className="property-page">
            <Swiper
                slidesPerView={slidesPerView}
                pagination={{clickable: true}}
                spaceBetween={15}
                modules={[Navigation]}
                navigation
            >
                {property?.photos.map((photo) => (
                    <SwiperSlide>
                        <img
                            src={photo?.url || ""}
                            alt={photo?.title}
                            className="property-page__slide"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <span className="property-badge">
                {property.purpose === 'for-rent' ? 'For Rent' : ''}
                {property.purpose === 'for-sale' ? 'For Sale' : ''}
            </span>
            <p className="property-page__price">
                <strong>
                    {property?.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </strong>
            </p>
            <p className="property-features">
                <span>
                    <img src={IconSqft} className="property-icon sqft" />
                    {property.area && typeof property.area === "number"
                        ? (parseInt(property.area * 10.764))
                        : ""} <strong>sqft</strong>&nbsp;
                </span>
                <span>
                    <img src={IconBed} className="property-icon bed" />
                    {property.rooms} <strong>bed</strong>&nbsp;
                </span>
                <span>
                    <img src={IconBath} className="property-icon bath" />
                    {property.baths} <strong>bath</strong>
                </span>
            </p>
            <div className="property-page__columns">
                <div>
                    <h3>Amenities</h3>
                    <ul className="property-page__amenities">
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
                </div>
                <div className="property-page__contact">
                    <div className="property-page__contact-wrapper">
                        <img src={property.agency.logo.url} alt="Agency Logo" />
                        <h3>Interested? Send your informarion and we will contact you shortly</h3>
                        <label>
                            <span>Name</span>
                            <input type="text" className="input"/>
                        </label>
                        <label>
                            <span>Email</span>
                            <input type="text" className="input"/>
                        </label>
                        <label>
                            <span>Phone</span>
                            <input type="text" className="input"/>
                        </label>
                        <button className="button">Send</button>
                    </div>
                </div>
            </div>

            <h3>Description</h3>
            <h1>{property?.title}</h1>
            <p>{property?.description}</p>

            <RelatedProperties />
        </div>
    );
};

export default Property;
