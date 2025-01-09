import { NavLink } from "react-router-dom";

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkUrl, imageUrl, align }) => {
    return(
        <div className={"banner " + align }>
            <img src={ imageUrl } />
            <div className="banner-content">
                <div>
                    <h4>{ purpose }</h4>
                    <h2>{ title1 }</h2>
                    <h2>{ title2 }</h2>
                    <p>{ desc1 }<br />{ desc2 }</p>
                    <NavLink to={ linkUrl }>{ buttonText }</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Banner;