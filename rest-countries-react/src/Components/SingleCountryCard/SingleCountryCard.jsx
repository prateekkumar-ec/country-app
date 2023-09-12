import { useContext } from "react";
import { Link } from "react-router-dom";
import "./SingleCountryCard.css";
import { ThemeContext } from "../ThemeContext";

function SingleCountryCard({ code, subRegion, imgSrc, name, population, region, capital, area }) {
    const theme = useContext(ThemeContext);

    return (
        <Link to={"/country/" + code}>
            <div className={"single-card" + " " + theme + "-" + "single-card"}>
                <img className={"country-img"} src={imgSrc}></img>
                <div className={"country-info"}>
                    <h2 className={"country-name"}>{name}</h2>
                    <ul className={"info"}>
                        <li className="population">
                            <span className="heading"> Population:</span>
                            <span className="value">{population}</span>
                        </li>
                        <li className="region">
                            <span className="heading"> Region:</span>
                            <span className="value">{region}</span>
                        </li>
                        <li className="capital">
                            <span className="heading"> Capital:</span>
                            <span className="value">{capital}</span>
                        </li>
                        <li className="subregion">
                            <span className="heading"> Subregion:</span>
                            <span className="value">{subRegion}</span>
                        </li>
                        <li className="area">
                            <span className="heading"> Area:</span>
                            <span className="value">{area}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    );
}

export default SingleCountryCard;
