import { useEffect, useState } from "react";
import filterIcon from "../../assets/filter-logo.svg";
import "./SearchFilter.css";

function SearchFilter({
    setSearchedItem,
    setSelectedRegion,
    setSelectedSortMethod,
    setSelectedSorting,
    setSelectedSubRegion,
    selectedRegion,
    selectedSortMethod,
    selectedSubRegion,
    selectedSorting,
    mode,
    regions,
    allCountries,
}) {
    const [subRegionDisplay, setSubRegionDisplay] = useState("noDisplay");
    const [regionDisplay, setRegionDisplay] = useState("noDisplay");
    const [sortingDisplay, setSortingDisplay] = useState("noDisplay");
    const [sortMethodDisplay, setSortMethodDisplay] = useState("noDisplay");

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
