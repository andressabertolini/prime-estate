import { NavLink } from "react-router-dom";

const Property = ({property}) => {
    return(
        <NavLink to={`/property/${property.id}`} className="property-card">
            <h3>{property.title}</h3>
            <img src={property.coverPhoto.url} />
        </NavLink>
    );
}
export default Property;