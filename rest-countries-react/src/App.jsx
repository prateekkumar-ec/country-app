import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import filterIcon from "./assets/filter-logo.svg";
import SingleCountryCard from "./Components/SingleCountryCard/SingleCountryCard";

function App() {
    const [countries, setCountries] = useState([]);
    const [mode, setMode] = useState("");
    const [regionDisplay, setRegionDisplay] = useState("noDisplay");

    async function getData() {
        let response = await fetch("https://restcountries.com/v3.1/all");
        let data = await response.json();
        setCountries(data);
    }
    useEffect(() => {
        getData();
    }, []);

    function showRegions() {
        if (regionDisplay == "noDisplay") {
            setRegionDisplay("display");
        } else {
            setRegionDisplay("noDisplay");
        }
    }
    return (
        <div className={"container" + " " + mode + "-" + "container"}>
            <Header modeType={mode} setMode={setMode} />
            <div className={"search-filter-outer"}>
                <div className={"search-filter"}>
                    <input type="text" className={"search" + " " + mode + "-" + "search"} placeholder="      Search for a country..."></input>
                    <div
                        onClick={() => {
                            showRegions();
                        }}
                        className={"filter-option-outer"}
                    >
                        <div className={"filter" + " " + mode + "-" + "filter"}>
                            <p className={"filter-name"}>Filter by Region</p>
                            <img className={mode + "-" + "filterIcon" + " " + regionDisplay + "-" + "filterIcon"} src={filterIcon}></img>
                        </div>
                        <ul className={"options" + " " + regionDisplay + " " + mode + "-" + "options"}>
                            <li>Prateek</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={"countries-outer"}>
                <div className={"countries"}>
                    {countries.map((country) => {
                        return (
                            <SingleCountryCard
                                mode={mode}
                                imgSrc={country.flags.svg}
                                name={country.name.common}
                                population={country.population}
                                region={country.region}
                                capital={country.capital}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
