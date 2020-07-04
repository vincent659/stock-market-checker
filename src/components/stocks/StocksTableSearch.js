import React, { useState,useEffect } from "react";

/* Search Functions of Stock Table */
export const StocksTableSearchBar = (props) =>{
    const [searchValue, setSearchValue] = useState("");
    const [searchIndustry, setSearchIndustry] = useState([]);
    let industryList = [];

    // Handles the industry list
    useEffect(() => {
      setSearchIndustry(props.result.map(industry => {
        if(industryList.indexOf(industry.industry) === -1){
          industryList.push(industry.industry)
          return industry.industry
        }
      }))

    },[props.result])

    // Handles stock symbol/code search function
    const handleSearch = (e) =>{
      e.preventDefault();
      setSearchValue(e.target.value)
    }

    // Handles the "search" button's submit
    const handleSubmit = e => {
      e.preventDefault();
      props.search(searchValue)
     
    }

    // Handles the filter of industry dropdown function
    const handleIndustryChange = e => {
      e.preventDefault();
      props.industry(e.target.value)
    }
  
    return (
      <div>
        <input
          aria-labelledby="search-button"
          name="search"
          id="search"
          type="search"
          onChange={handleSearch}
          placeholder="Enter stock symbol..."
        />
        <button
          id="search-button"
          type="button"
          onClick={handleSubmit}
        >
          Search
        </button>
        <button onClick={props.resetResult}>Reset</button>
        <select name="Industry" onChange={handleIndustryChange}>
          <option key="empty">Select industry...</option>
          {searchIndustry.map(industry => {
            if(industry !== undefined){
              return <option value={industry} key={industry}>{industry}</option>
            }
          })}
        </select>
      </div>
    );
}