import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import SearchFilter from "./Components/SearchFilter/SearchFilter";
import SingleCountryCard from "./Components/SingleCountryCard/SingleCountryCard";
import Loder from "./Components/Loder/Loader";

function App() {
    const [countries, setCountries] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [mode, setMode] = useState("");

    const [isError, setIsError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    function getData() {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCountries(data);
                setAllCountries(data);
                getRegionsList(data);

                setIsLoaded(() => true);
            })
            .catch((error) => {
                setIsError(error.name);
            });
    }
    function getRegionsList(data) {
        let regions_Set = new Set([]);
        for (let country of data) {
            regions_Set.add(country.region);
        }
        regions_Set = Array.from(regions_Set);
        setRegions(() => regions_Set);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={"container" + " " + mode + "-" + "container"}>
            <Header modeType={mode} setMode={setMode} />
            <SearchFilter mode={mode} allCountries={allCountries} countries={countries} setCountries={setCountries} regions={regions} />
            <div className={"countries-outer"}>
                {isError ? (
                    <div className={"error"}>
                        <p>Failed to load the resourses.</p>
                    </div>
                ) : isLoaded ? (
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
                                    subRegion={country.subregion}
                                    area={country.area}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <Loder />
                )}
            </div>
        </div>
    );
}

export default App;
