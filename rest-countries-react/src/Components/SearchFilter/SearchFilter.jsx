import { useEffect, useState } from "react";
import filterIcon from "../../assets/filter-logo.svg";
import "./SearchFilter.css";

function SearchFilter({ mode, regions, allCountries, setCountries }) {
    const [subRegionDisplay, setSubRegionDisplay] = useState("noDisplay");
    const [regionDisplay, setRegionDisplay] = useState("noDisplay");
    const [sortingDisplay, setSortingDisplay] = useState("noDisplay");
    const [sortMethodDisplay, setSortMethodDisplay] = useState("noDisplay");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedSorting, setSelectedSorting] = useState("");
    const [selectedSortMethod, setSelectedSortMethod] = useState("Asc");
    const [searchedItem, setSearchedItem] = useState("");
    const [selectedSubRegion, setSelectedSubRegion] = useState("");

    const [subRegions, setSubRegions] = useState([]);

    const sortingList = ["Sort by population", "Sort by area"];
    const sortMethodList = ["Asc", "Dsc"];

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
    function showItem(item, setItem) {
        if (item == "noDisplay") {
            setItem("display");
        } else {
            setItem("noDisplay");
        }
    }

    function filter() {
        setCountries(() => {
            let new_countries = allCountries.filter((country) => {
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
                } else if (
                    country.name.common.toLowerCase().includes(searchedItem.toLowerCase()) &&
                    country.region.toLocaleLowerCase().includes(selectedRegion.toLocaleLowerCase())
                ) {
                    return true;
                } else {
                    return false;
                }
            });
            if (selectedSorting == "Sort by population") {
                if (selectedSortMethod == "Asc") {
                    new_countries.sort((a, b) => {
                        return a.population - b.population;
                    });
                } else {
                    new_countries.sort((a, b) => {
                        return b.population - a.population;
                    });
                }
            } else if (selectedSorting == "Sort by area") {
                if (selectedSortMethod == "Asc") {
                    new_countries.sort((a, b) => {
                        return a.area - b.area;
                    });
                } else {
                    new_countries.sort((a, b) => {
                        return b.area - a.area;
                    });
                }
            }
            return new_countries;
        });
    }
    useEffect(() => {
        filter();
    }, [searchedItem, selectedRegion, selectedSubRegion, selectedSorting, selectedSortMethod]);
    useEffect(() => {
        getSubRegionsList();
    }, [selectedRegion]);

    return (
        <div className={"search-filter-outer"}>
            <div className={"search-filter"}>
                <input
                    onKeyUp={(event) => {
                        setSearchedItem(() => event.target.value);
                    }}
                    type="text"
                    className={"search" + " " + mode + "-" + "search"}
                    placeholder="      Search for a country..."
                ></input>
                {selectedSorting ? (
                    <div
                        onClick={() => {
                            showItem(sortMethodDisplay, setSortMethodDisplay);
                        }}
                        className={"filter-option-outer"}
                    >
                        <div className={"filter" + " " + mode + "-" + "filter"}>
                            <p className={"filter-name"}>{selectedSortMethod}</p>
                            <img className={mode + "-" + "filterIcon" + " " + sortMethodDisplay + "-" + "filterIcon"} src={filterIcon}></img>
                        </div>
                        <ul className={sortMethodDisplay + " " + "options" + " " + mode + "-" + "options"}>
                            {sortMethodList.map((sortMethod) => {
                                return (
                                    <li
                                        onClick={() => {
                                            setSelectedSortMethod(sortMethod);
                                        }}
                                    >
                                        {sortMethod}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : null}

                <div
                    onClick={() => {
                        showItem(sortingDisplay, setSortingDisplay);
                    }}
                    className={"filter-option-outer"}
                >
                    <div className={"filter" + " " + mode + "-" + "filter"}>
                        <p className={"filter-name"}>{selectedSorting ? selectedSorting : "Sort"}</p>
                        <img className={mode + "-" + "filterIcon" + " " + sortingDisplay + "-" + "filterIcon"} src={filterIcon}></img>
                    </div>
                    <ul className={sortingDisplay + " " + "options" + " " + mode + "-" + "options"}>
                        <li
                            onClick={() => {
                                setSelectedSorting("");
                            }}
                        >
                            None
                        </li>
                        {sortingList.map((sorting) => {
                            return (
                                <li
                                    onClick={() => {
                                        setSelectedSorting(sorting);
                                    }}
                                >
                                    {sorting}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div
                    onClick={() => {
                        showItem(subRegionDisplay, setSubRegionDisplay);
                    }}
                    className={"filter-option-outer"}
                >
                    <div className={"filter" + " " + mode + "-" + "filter"}>
                        <p className={"filter-name"}>{selectedSubRegion ? selectedSubRegion : "Filter by subregion"}</p>
                        <img className={mode + "-" + "filterIcon" + " " + subRegionDisplay + "-" + "filterIcon"} src={filterIcon}></img>
                    </div>
                    <ul className={subRegionDisplay + " " + "options" + " " + mode + "-" + "options"}>
                        <li
                            onClick={() => {
                                setSelectedSubRegion("");
                            }}
                        >
                            None
                        </li>
                        {subRegions.map((subRegion) => {
                            return (
                                <li
                                    onClick={() => {
                                        setSelectedSubRegion(subRegion);
                                    }}
                                >
                                    {subRegion}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div
                    onClick={() => {
                        showItem(regionDisplay, setRegionDisplay);
                    }}
                    className={"filter-option-outer"}
                >
                    <div className={"filter" + " " + mode + "-" + "filter"}>
                        <p className={"filter-name"}>{selectedRegion ? selectedRegion : "Filter by region"}</p>
                        <img className={mode + "-" + "filterIcon" + " " + regionDisplay + "-" + "filterIcon"} src={filterIcon}></img>
                    </div>
                    <ul className={regionDisplay + " " + "options" + " " + mode + "-" + "options"}>
                        <li
                            onClick={() => {
                                setSelectedRegion("");
                            }}
                        >
                            None
                        </li>
                        {regions.map((region) => {
                            return (
                                <li
                                    onClick={() => {
                                        setSelectedRegion(() => region);
                                    }}
                                >
                                    {region}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SearchFilter;
