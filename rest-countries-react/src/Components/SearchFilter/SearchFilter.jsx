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
                    <select
                        className={"filter" + " " + mode + "-" + "filter"}
                        onChange={(event) => {
                            if (event.target.value == "none") {
                                setSelectedSortMethod("");
                            } else {
                                setSelectedSortMethod(event.target.value);
                            }
                        }}
                    >
                        <option value="Asc">Asc</option>
                        <option value="Dsc">Dsc</option>
                    </select>
                ) : null}

                <select
                    className={"filter" + " " + mode + "-" + "filter"}
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

                <select
                    className={"filter" + " " + mode + "-" + "filter"}
                    onChange={(event) => {
                        if (event.target.value == "none") {
                            setSelectedSubRegion("");
                        } else {
                            setSelectedSubRegion(event.target.value);
                        }
                    }}
                >
                    <option value="none" selected>
                        Sort by region
                    </option>
                    {subRegions.map((subRegion) => {
                        return <option value={subRegion}>{subRegion}</option>;
                    })}
                </select>

                <select
                    className={"filter" + " " + mode + "-" + "filter"}
                    onChange={(event) => {
                        if (event.target.value == "none") {
                            setSelectedRegion("");
                        } else {
                            setSelectedRegion(event.target.value);
                        }
                    }}
                >
                    <option value="none" selected>
                        Sort by subregion
                    </option>
                    {regions.map((region) => {
                        return <option value={region}>{region}</option>;
                    })}
                </select>
            </div>
        </div>
    );
}

export default SearchFilter;
