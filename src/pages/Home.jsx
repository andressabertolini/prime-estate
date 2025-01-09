import Banner from "../components/Banner";
import HomeImg from "../assets/images/house.jpg";
import ApartamentImg from "../assets/images/apartment.jpg";

const Home = () => {
    return(
        <>
            <h1>Prime Estate</h1>
            <Banner 
                purpose="Rent a Home"
                title1="Rental Homes for"
                title2="Everyone"
                desc1="Explore Apartaments, Villas, Homes"
                desc2="and more"
                buttonText="Explore Renting"
                linkUrl="/search?purpose=for-rent"
                imageUrl={HomeImg}
                align="left"
            />
            <Banner 
                purpose="Buy a Home"
                title1="Find, Buy & Own Your"
                title2="Dream Home"
                desc1="Explore Apartaments, Villas, Homes"
                desc2="and more"
                buttonText="Explore Buying"
                linkUrl="/search?purpose=for-sale"
                imageUrl={ApartamentImg}
                align="right"
            />
        </>
    )
}

export default Home;