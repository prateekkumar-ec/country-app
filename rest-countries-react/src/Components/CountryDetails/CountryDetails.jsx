import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loder from "../Loder/Loader";
import "./CountryDetails.css";
import { ThemeContext } from "../ThemeContext";
import ArrowIcon from "../../assets/left-arrow-svgrepo-com.svg";
function CountryDetails() {
    let borderCountries = ["France", "Germany", "Netherlands"];
    let theme = useContext(ThemeContext);
    const [country, setCountry] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [currencies, setCurrencies] = useState("");
    const [languages, setLanguages] = useState("");

    const { id } = useParams();
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/alpha/" + id)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Country not found");
                }
            })
            .then((data) => {
                setCountry(() => data[0]);
                getCurrencies(data[0]);
                getLanguages(data[0]);
                console.log();
                setIsLoaded(() => true);
            })
            .catch((error) => {
                setIsError(true);
            });
    }, []);

    function getLanguages(data) {
        let languagesString = Object.values(data.languages).reduce((ans, language) => {
            return ans + ", " + language;
        }, "");
        languagesString = languagesString.slice(2);
        setLanguages(languagesString);
    }
    function getCurrencies(data) {
        let currencies = Object.values(data.currencies).reduce((ans, currency) => {
            return ans + ", " + currency.name;
        }, "");
        currencies = currencies.slice(2);
        setCurrencies(currencies);
    }
    return (
        <div className={"country-page-outer " + theme + "-country-page-outer"}>
            {isError ? (
                <div className={"error" + " " + theme + "-" + "error"}>No such countries exists</div>
            ) : isLoaded ? (
                <div className={"country-details-page"}>
                    <Link to="/">
                        <div className={"back-button-outer"}>
                            <div className={"back-button " + theme + "-back-button"}>
                                <img src={ArrowIcon} alt="arrow"></img>
                                <p>Back</p>
                            </div>
                        </div>
                    </Link>
                    <div className={"flag-details " + theme + "-flag-details"}>
                        <img src={country.flags.svg}></img>
                        <div className={"details"}>
                            <h2>{country.name.common}</h2>
                            <div className={"extra-details"}>
                                <div className={"left-details"}>
                                    <div>
                                        <p className={"heading"}>Native Name:</p>
                                        <p className={"value"}>{Object.values(country.name.nativeName)[Object.values(country.name.nativeName).length - 1].common}</p>
                                    </div>
                                    <div>
                                        <p className={"heading"}>Population:</p>
                                        <p className={"value"}>{country.population}</p>
                                    </div>
                                    <div>
                                        <p className={"heading"}>Region:</p>
                                        <p className={"value"}>{country.region}</p>
                                    </div>
                                    <div>
                                        <p className={"heading"}>Sub Region:</p>
                                        <p className={"value"}>{country.subregion}</p>
                                    </div>
                                    <div>
                                        <p className={"heading"}>Capital:</p>
                                        <p className={"value"}>{country.capital}</p>
                                    </div>
                                </div>
                                <div className={"right-details"}>
                                    <div>
                                        <p className={"heading"}>Top Level Domain:</p>
                                        <p className={"value"}>{".be"}</p>
                                    </div>
                                    <div>
                                        <p className={"heading"}>Currencies:</p>
                                        <p className={"value"}>{currencies}</p>
                                    </div>
                                    <div>
                                        <p className={"heading"}>Languages:</p>
                                        <p className={"value"}>{languages}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"border-info"}>
                                <p className={"heading"}>Border Countries:</p>
                                <div className={"border-countries"}>
                                    {borderCountries.map((country) => {
                                        return (
                                            <div className={"border-country"}>
                                                <p className={"border-country-name " + theme + "-border-country-name"}>{country}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loder />
            )}
        </div>
    );
}

export default CountryDetails;
