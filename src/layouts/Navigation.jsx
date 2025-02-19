import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo-text.png";
import IconMagnifyingGlass from "../assets/icons/icon-magnifying-glass.svg";

const Navigation = () => {
    return(
        <nav className="nav container">
            <div className="nav-left">
                <NavLink to="/" style={{height: "58px", padding: 0}}><img src={Logo} className="logo"/></NavLink>
                <NavLink to="/properties?purpose=for-rent"><strong>Rent</strong></NavLink>
                <NavLink to="/properties?purpose=for-sale"><strong>Buy</strong></NavLink>               
            </div>
            <div className="nav-right">
                <NavLink to="/agents">Agents</NavLink>
                <NavLink to="/calculator">Calculator</NavLink>
                <NavLink to="/properties?purpose=for-sale" style={{padding: 0}}>
                    Search
                    <img src={IconMagnifyingGlass} className="search-icon"/>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navigation;