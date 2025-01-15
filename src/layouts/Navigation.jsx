import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo-text.png";

const Navigation = () => {
    return(
        <nav className="nav">
            <img src={Logo} />
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/properties?purpose=for-rent">Rent</NavLink>
            <NavLink exact to="/properties?purpose=for-sale">Buy</NavLink>
        </nav>
    )
}

export default Navigation;