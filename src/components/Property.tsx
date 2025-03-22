import { NavLink } from "react-router-dom";
import IconSqft from "../assets/icons/icon-sqft.svg";
import IconBed from "../assets/icons/icon-bed.svg";
import IconBath from "../assets/icons/icon-bath.svg";

interface PropertyProps {
    property: {
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
}

const Property: React.FC<PropertyProps> = ({ property }) => {
    const amenities = Array.isArray(property.amenities) ? property.amenities : [];
    const limit = 4;
    const limitedAmenities = amenities.slice(0, limit);

    return (
        <NavLink to={`/property/${property.externalID}`} className="property-card">
            <img src={property.coverPhoto.url} className="property-cover" alt={property.title}/>
            <span className="property-badge">
                {property.purpose === 'for-rent' ? 'For Rent' : ''}
                {property.purpose === 'for-sale' ? 'For Sale' : ''}
            </span>
            <h3>{property.title}</h3>
            <p className="property-features">
                <span>
                    <img src={IconSqft} className="property-icon sqft" alt="Square feet"/>
                    {property.area && typeof property.area === "number"
                        ? Math.round(property.area * 10.764)
                        : ""} <strong>sqft</strong>&nbsp;
                </span>
                <span>
                    <img src={IconBed} className="property-icon bed" alt="Bed"/>
                    {property.rooms} <strong>bed</strong>&nbsp;
                </span>
                <span>
                    <img src={IconBath} className="property-icon bath" alt="Bath"/>
                    {property.baths} <strong>bath</strong>
                </span>
            </p>
            <ul className="property-amenities">
                {limitedAmenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                ))}
                {limitedAmenities.length < amenities.length && <li>...</li>} {/* Exibe '...' se houver mais de 4 amenities */}
            </ul>
            <div className="property-footer">
                <p className="property-price">${property.price.toLocaleString('en-US')}</p>
                {property.agency && property.agency.logo && (
                    <img src={property.agency.logo.url} alt="Agency Logo" />
                )}
            </div>
        </NavLink>
    );
}

export default Property;