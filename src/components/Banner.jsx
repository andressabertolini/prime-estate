import { NavLink } from "react-router-dom";

const Banner = ({ purpose, title, desc, buttonText, linkUrl }) => {
    return(
        <div className="banner">
            <div className="banner-content">
                <div>
                    <h4>{ purpose }</h4>
                    <h2>{ title }</h2>
                </div>
                <div>
                    <p>{ desc }</p>
                </div>
                <div>
                    <NavLink to={ linkUrl }>{ buttonText }</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Banner;