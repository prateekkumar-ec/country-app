import { useEffect, useState } from "react";
import SearchIcon from "../../assets/search-log.svg";
import { useContext } from "react";
import "./SearchFilter.css";
import { ThemeContext } from "../ThemeContext";

function SearchFilter({
    setSearchedItem,
    setSelectedRegion,
    setSelectedSortMethod,
    setSelectedSorting,
    setSelectedSubRegion,
    selectedRegion,
    selectedSorting,
    selectedSubRegion,
    regions,
    allCountries,
}) {
    const theme = useContext(ThemeContext);

    const [subRegions, setSubRegions] = useState([]);
    function getSubRegionsList() {
        if (selectedRegion == "") {
            setSubRegions([]);
            return;
        }
        let new_sub_regions = new Set([]);
        for (let country of allCountries) {
            if (country.region.toLocaleLowerCase().includes(selectedRegion.toLowerCase())) {
                new_sub_regions.add(country.subregion);
            }
        }
        setSubRegions(() => Array.from(new_sub_regions));
    }

    useEffect(() => {
        getSubRegionsList();
    }, [selectedRegion]);

    return (
        <div className={"search-filter-outer"}>
            <div className={"search-filter"}>
                <div className={"search-outer" + " " + theme + "-" + "search-outer"}>
                    <img src={SearchIcon}></img>
                    <input
                        onKeyUp={(event) => {
                            setSearchedItem(() => event.target.value);
                        }}
                        type="text"
                        className={"search" + " " + theme + "-" + "search"}
                        placeholder="Search for a country..."
                    ></input>
                </div>
                <div className={"filter-outer"}>
                    <div className={"filter-inside"}>
                        {selectedSorting ? (
                            <select
                                className={"filter" + " " + theme + "-" + "filter"}
                                onChange={(event) => {
                                    if (event.target.value == "none") {
                                        setSelectedSortMethod("");
                                    } else {
                                        setSelectedSubRegion("");
                                        setSelectedSortMethod(event.target.value);
                                    }
                                }}
                            >
                                <option value="Asc">Asc</option>
                                <option value="Dsc">Dsc</option>
                            </select>
                        ) : null}

                        <select
                            className={"filter" + " " + theme + "-" + "filter"}
                            onChange={(event) => {
                                if (event.target.value == "none") {
                                    setSelectedSorting("");
                                } else {
                                    setSelectedSorting(event.target.value);
                                }
                            }}
                        >
                            <option value="none" selected>
                                Sort by - None
                            </option>
                            <option value="Sort by area">Area</option>
                            <option value="Sort by population">Population</option>
                        </select>
                        {selectedRegion ? (
                            <select
                                className={"filter" + " " + theme + "-" + "filter"}
                                onChange={(event) => {
                                    if (event.target.value == "none") {
                                        setSelectedSubRegion("");
                                    } else {
                                        setSelectedSubRegion(event.target.value);
                                    }
                                }}
                            >
                                <option selected={selectedSubRegion == ""} value="none">
                                    Sort by subregion
                                </option>
                                {subRegions.map((subRegion) => {
                                    return (
                                        <option selected={selectedSubRegion == subRegion} value={subRegion}>
                                            {subRegion}
                                        </option>
                                    );
                                })}
                            </select>
                        ) : null}

                        <select
                            className={"filter" + " " + theme + "-" + "filter"}
                            onChange={(event) => {
                                if (event.target.value == "none") {
                                    setSelectedRegion("");
                                } else {
                                    setSelectedRegion(() => event.target.value);
                                    setSelectedSubRegion(() => "");
                                }
                            }}
                        >
                            <option value="none" selected>
                                Sort by region
                            </option>
                            {regions.map((region) => {
                                return <option value={region}>{region}</option>;
                            })}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchFilter;
