import "./SingleCountryCard.css";

function SingleCountryCard({ mode, imgSrc, name, population, region, capital }) {
    return (
        <div className={"single-card" + " " + mode + "-" + "single-card"}>
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
                </ul>
            </div>
        </div>
    );
}

export default SingleCountryCard;
