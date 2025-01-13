import { useEffect, useState } from "react";
/* Components */
import Banner from "../components/Banner";
import Property from "../components/Property";
/* Images */
import Home1Img from "../assets/images/house.jpg";
import Home2Img from "../assets/images/apartment.jpg";

const apiKey = process.env.REACT_APP_API_KEY;
const apiHost = process.env.REACT_APP_API_HOST;

const forRent = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=4&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4`;
const forSale = `https://${apiHost}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=4&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4`;

const Home = () => {
    const [propertiesRent, setPropertiesRent] = useState([]);
    const [propertiesSale, setPropertiesSale] = useState([]);

    const fetchAPI = () => {
        fetch(forRent,
            {
                method: 'GET',
                headers: {
                  'X-RapidAPI-Key': apiKey,
                  'X-RapidAPI-Host': apiHost,
                },
            })
            .then(res => res.json())
            .then(data => {
                setPropertiesRent(data.hits)
            })

        fetch(forSale,
            {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiHost,
                },
            })
            .then(res => res.json())
            .then(data => {
                setPropertiesSale(data.hits)
            })
    }

    useEffect(() => {
        fetchAPI();
    },[]);

    return(
        <>
            <Banner 
                purpose="Rent a Home"
                title1="Rental Homes for"
                title2="Everyone"
                desc1="Explore Apartaments, Villas, Homes"
                desc2="and more"
                buttonText="Explore Renting"
                linkUrl="/search?purpose=for-rent"
                imageUrl={Home1Img}
                align="left"
            />
            <div className="properties-list">
                <div className="container">
                    {propertiesRent.map((property) => (<Property property={property} key={property.id} />))}
                </div>
            </div>
            <Banner 
                purpose="Buy a Home"
                title1="Find, Buy & Own Your"
                title2="Dream Home"
                desc1="Explore Apartaments, Villas, Homes"
                desc2="and more"
                buttonText="Explore Buying"
                linkUrl="/search?purpose=for-sale"
                imageUrl={Home2Img}
                align="right"
            />
            <div className="properties-list">
                <div className="container">
                    {propertiesSale.map((property) => (<Property property={property} key={property.id}/>))}
                </div>
            </div>
        </>
    )
}

export default Home;