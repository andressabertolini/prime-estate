import { NavLink } from "react-router-dom";
import LogoWhite from "../assets/images/logo-text-white.png";

const Footer = () => {
    return(
        <div className="footer container">
            <img src={LogoWhite} className="logo" />
            <span>Prime Estate 2025</span>
            <nav>
                <NavLink to="/properties?purpose=for-rent">Rent</NavLink>
                <NavLink to="/properties?purpose=for-sale">Buy</NavLink>
            </nav>
            <nav>
                <NavLink to="/agents">Agents</NavLink>
                <NavLink to="/calculator">Calculator</NavLink>
                <NavLink to="/properties?purpose=for-rent">Search</NavLink>
            </nav>
        </div>
    )
}
export default Footer;