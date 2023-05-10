import React, { useState } from "react";
import axios from "axios";

// Importing Images
import { city } from "../../Images";

// Importing Styles
import "./City.scss";

const City = () => {
  // State
  const [error, setError] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [cityError, setCityError] = useState("");
  const [cityData, setCityData] = useState("");

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!citySearch) {
      setCityError("For Search city name is required");
      return;
    }

    try {
      const res = await axios.get(`/user/cities/${citySearch}`);
      if (res.data.status === "success") {
        setCityData(res.data.data);
      }
    } catch (error) {
      setError("City not found, try another city");
    }
  };
  return (
    <div className="City">
      <div className="container">
        <div className="left">
          <p className="heading">{error ? error : "Search City"}</p>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <div className="inputCon">
                <input
                  type="text"
                  placeholder="Enter City Name"
                  className="input"
                  name="city"
                  value={citySearch}
                  onChange={(e) => {
                    setCitySearch(e.target.value);
                    setCityError("");
                    setError("");
                  }}
                />
                {cityError && <p className="form-error">{cityError}</p>}
              </div>
              <div className="inputCon">
                <button type="submit" className="btn">
                  Search
                </button>
              </div>
            </div>
          </form>
          {cityData && (
            <div className="cityContainer">
              <p className="head">Name: {cityData.name}</p>
              <p className="head">State: {cityData.state}</p>
              <p className="head">Country: {cityData.country}</p>
              <p className="head">Address: {cityData.address}</p>
              <br />
              <p className="head">Blood Present</p>
              <p className="head">A+ {cityData["A+"]} ml</p>
              <p className="head">A- {cityData["A-"]} ml</p>
              <p className="head">AB+ {cityData["AB+"]} ml</p>
              <p className="head">AB- {cityData["AB-"]} ml</p>
              <p className="head">B- {cityData["B-"]} ml</p>
              <p className="head">B+ {cityData["B+"]} ml</p>
              <p className="head">O+ {cityData["O+"]} ml</p>
              <p className="head">O+ {cityData["O+"]} ml</p>
            </div>
          )}
        </div>
        <div className="right">
          <img src={city} alt="City" />
        </div>
      </div>
    </div>
  );
};

export default City;
