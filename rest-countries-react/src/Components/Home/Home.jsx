import { useState, useEffect } from "react";
import "./Home.css";

import SearchFilter from "..//SearchFilter/SearchFilter";
import SingleCountryCard from "../SingleCountryCard/SingleCountryCard";
import Loder from "../Loder/Loader";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function Home() {
    const [allCountries, setAllCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedSorting, setSelectedSorting] = useState("");
    const [selectedSortMethod, setSelectedSortMethod] = useState("Asc");
    const [selectedSubRegion, setSelectedSubRegion] = useState("");
    const [searchedItem, setSearchedItem] = useState("");

    const [isError, setIsError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const theme = useContext(ThemeContext);

    function getData() {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to fetch the resources");
                }
            })
            .then((data) => {
                setAllCountries(data);
                getRegionsList(data);
                setIsLoaded(() => true);
            })
            .catch((error) => {
                setIsError(error.name);
                console.log(error.name);
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
    let filtered_data = allCountries.filter((country) => {
        if (country.subregion != undefined) {
            if (
                country.name.common.toLowerCase().includes(searchedItem.toLowerCase()) &&
                country.region.toLocaleLowerCase().includes(selectedRegion.toLocaleLowerCase()) &&
                country.subregion.toLowerCase().includes(selectedSubRegion.toLocaleLowerCase())
            ) {
                return true;
            } else {
                return false;
            }
        } else if (country.name.common.toLowerCase().includes(searchedItem.toLowerCase()) && country.region.toLocaleLowerCase().includes(selectedRegion.toLocaleLowerCase())) {
            return true;
        } else {
            return false;
        }
    });
    if (selectedSorting == "Sort by population") {
        if (selectedSortMethod == "Asc") {
            filtered_data.sort((a, b) => {
                return a.population - b.population;
            });
        } else {
            filtered_data.sort((a, b) => {
                return b.population - a.population;
            });
        }
    } else if (selectedSorting == "Sort by area") {
        if (selectedSortMethod == "Asc") {
            filtered_data.sort((a, b) => {
                return a.area - b.area;
            });
        } else {
            filtered_data.sort((a, b) => {
                return b.area - a.area;
            });
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={"container" + " " + theme + "-" + "container"}>
            <SearchFilter
                setSearchedItem={setSearchedItem}
                setSelectedRegion={setSelectedRegion}
                setSelectedSubRegion={setSelectedSubRegion}
                setSelectedSorting={setSelectedSorting}
                setSelectedSortMethod={setSelectedSortMethod}
                searchedItem={searchedItem}
                selectedRegion={selectedRegion}
                selectedSorting={selectedSorting}
                selectedSortMethod={selectedSortMethod}
                selectedSubRegion={selectedSubRegion}
                allCountries={allCountries}
                regions={regions}
            />
            <div className={"countries-outer"}>
                {isError ? (
                    <div className={"error" + " " + theme + "-" + "error"}>
                        <p>Failed to load the resourses.</p>
                    </div>
                ) : isLoaded ? (
                    filtered_data.length != 0 ? (
                        <div className={"countries"}>
                            {filtered_data.map((country) => {
                                return (
                                    <SingleCountryCard
                                        imgSrc={country.flags.svg}
                                        name={country.name.common}
                                        population={country.population}
                                        region={country.region}
                                        capital={country.capital}
                                        subRegion={country.subregion}
                                        area={country.area}
                                        code={country.ccn3}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className={"error" + " " + theme + "-" + "error"}>No such countries exists</div>
                    )
                ) : (
                    <Loder />
                )}
            </div>
        </div>
    );
}

export default Home;
