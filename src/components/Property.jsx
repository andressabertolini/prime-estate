import { NavLink } from "react-router-dom";
import IconSqft from "../assets/icons/icon-sqft.svg";
import IconBed from "../assets/icons/icon-bed.svg";
import IconBath from "../assets/icons/icon-bath.svg";

const Property = ({property}) => {
    const amenities = property.amenities;
    const limit = 4;
    const limitedAmenities = amenities.reduce((acc, item, index) => {
        if (index < limit ){
            acc.push(item);
        }
        return acc;
    }, [])
    return(
        <NavLink to={`/property/${property.externalID}`} className="property-card">
            <img src={property.coverPhoto.url} className="property-cover"/>
            <span className="property-badge">
                {property.purpose == 'for-rent' ? 'For Rent': ''}
                {property.purpose == 'for-sale' ? 'For Sale': ''}
            </span>
            <h3>{property.title}</h3>
            <p className="property-features">
                <span>
                    <img src={IconSqft} className="property-icon sqft"/>
                    {property.area && typeof property.area === "number"
                    ? (property.area * 10.764).toFixed(2)
                    : ""} <strong>sqft</strong>&nbsp;
                </span>
                <span>
                    <img src={IconBed} className="property-icon bed"/>
                    {property.rooms} <strong>bed</strong>&nbsp;
                </span>
                <span>
                    <img src={IconBath} className="property-icon bath"/>
                    {property.baths} <strong>bath</strong>
                </span>
            </p>
            <ul className="property-amenities">
                {limitedAmenities.map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                ))}
                <li>...</li>
            </ul>
            <div className="property-footer">
                <p className="property-price">${property.price.toLocaleString('en-US')}</p>
                <img src={property.agency.logo.url}/>
            </div>
        </NavLink>
    );
}
export default Property;