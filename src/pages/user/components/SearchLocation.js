import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { InputBase } from "@material-ui/core";
import "./SearchLocation.css";
import { BiSearch } from "react-icons/bi";

const SearchLocation = ({ onLoad, onPlaceChanged }) => {
  return (
    <div className="search__form-control search__container">
      <Autocomplete
        className="searchForm"
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <div style={{ display: "flex" }}>
          <InputBase placeholder="Search…" className="searchInput" />
          <button className="searchIcon" onClick={onLoad}>
            <BiSearch />
          </button>
        </div>
      </Autocomplete>
    </div>
  );
};

export default SearchLocation;
