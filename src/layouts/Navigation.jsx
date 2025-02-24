import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo-text.png";
import IconMagnifyingGlass from "../assets/icons/icon-magnifying-glass.svg";
import IconBurgerMenu from "../assets/icons/icon-burger-menu.svg";

const Navigation = () => {
    const [navOpen, setNavOpen] = useState(false);
    return(
        <nav className="nav container">
            <NavLink to="/" style={{height: "58px", padding: 0}}><img src={Logo} className="logo"/></NavLink>
            <div className={(navOpen == true ? "open":"") + " mobile-nav"}>
                <div className="nav-left" onClick={() => setNavOpen(false)}>
                    <NavLink to="/properties?purpose=for-rent"><strong>Rent</strong></NavLink>
                    <NavLink to="/properties?purpose=for-sale"><strong>Buy</strong></NavLink> 
                </div>              
                <div className="nav-right" onClick={() => setNavOpen(false)}>
                    <NavLink to="/agents">Agents</NavLink>
                    <NavLink to="/calculator">Calculator</NavLink>
                    <NavLink to="/properties?purpose=for-sale" style={{padding: 0}}>
                        Search
                        <img src={IconMagnifyingGlass} className="search-icon"/>
                    </NavLink>
                </div>
            </div>
            <img src={IconBurgerMenu} className="burger-icon" onClick={() => setNavOpen(!navOpen)}/>
        </nav>
    )
}

export default Navigation;