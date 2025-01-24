import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo-text.png";
import IconMagnifyingGlass from "../assets/icons/icon-magnifying-glass.svg";

const Navigation = () => {
    return(
        <nav className="nav">
            <div className="nav-left">
                <NavLink to="/"><img src={Logo} className="logo"/></NavLink>
                <NavLink to="/properties?purpose=for-rent"><strong>Rent</strong></NavLink>
                <NavLink to="/properties?purpose=for-sale"><strong>Buy</strong></NavLink>
                <NavLink to="/properties?purpose=for-sale">New Homes</NavLink>                
            </div>
            <div className="nav-right">
                <NavLink to="/properties?purpose=for-sale">Agents</NavLink>
                <NavLink to="/properties?purpose=for-sale">Calculator</NavLink>
                <NavLink to="/properties?purpose=for-sale">
                    Search
                    <img src={IconMagnifyingGlass} className="search-icon"/>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navigation;