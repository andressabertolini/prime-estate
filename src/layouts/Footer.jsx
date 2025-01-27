import { NavLink } from "react-router-dom";
import LogoWhite from "../assets/images/logo-text-white.png";

const Footer = () => {
    return(
        <div className="footer">
            <img src={LogoWhite} className="logo" />
            <span>Prime Estate 2025</span>
            <nav>
                <NavLink to="/properties?purpose=for-rent">Rent</NavLink>
                <NavLink to="/properties?purpose=for-sale">Buy</NavLink>
                <NavLink to="/properties?purpose=for-sale">New Homes</NavLink>
            </nav>
            <nav>
                <NavLink to="/">Agents</NavLink>
                <NavLink to="/">Calculator</NavLink>
                <NavLink to="/">Search</NavLink>
            </nav>
        </div>
    )
}
export default Footer;