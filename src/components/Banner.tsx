import { NavLink } from "react-router-dom";

interface BannerProps {
    title: string;
    buttonText: string;
    linkUrl: string;
}

const Banner: React.FC<BannerProps> = ({ title, buttonText, linkUrl }) => {
    return(
        <div className="banner">
            <div className="banner-content container">
                <div>
                    <h2>{ title }</h2>
                </div>
                <div>
                    <NavLink to={ linkUrl }>{ buttonText }</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Banner;