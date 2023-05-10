// Importing Packages
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import AsyncSelect from "react-select/async";

// Importing Images and data
import { appointment } from "../../Images";
import typeData from "../../Data/type";
import bloodGroupData from "../../Data/bloodGroup";

// Importing Styles
import "./Appointment.scss";

const Appointment = () => {
  // State
  const [error, setError] = useState("");

  const [type, setType] = useState("");
  const [typeError, setTypeError] = useState("");

  const [bloodGroup, setBloodGroup] = useState("");
  const [bloodGroupError, setBloodGroupError] = useState("");

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");

  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");

  // Navigate hook
  const navigate = useNavigate();

  // Fetching city data
  const fetchCity = async () => {
    const res = await axios.get("/user/cities");
    const data = res.data;
    return data.cities;
  };

  // On Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If type is not found
    if (!type) {
      setTypeError("Type is required");
      return;
    }

    // If blood group is not found
    if (!bloodGroup) {
      setBloodGroupError("Blood Group is required");
      return;
    }

    // If city is not found
    if (!city) {
      setCityError("City is required");
      return;
    }

    // If date is not found
    if (!date) {
      setDateError("Date is required");
      return;
    }

    // If amount is not found in request
    if (type.value === "request" && !amount) {
      setAmountError("Amount is required");
      return;
    }

    const appointment = {
      type: type.value,
      bloodGroup: bloodGroup.value,
      city: city._id,
      date,
      amount: type.value === "request" ? amount : undefined,
    };
    // console.log(appointment);

    const res = await axios.post("/user/appointments", appointment);
    const data = res.data;

    if (data.status === "success") {
      navigate("/");
    }
  };

  return (
    <div className="Appointment">
      <div className="container">
        <div className="left">
          <p className="heading">{error ? error : "Schedule Appointment"}</p>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <div className="inputCon">
                <Select
                  className="select"
                  placeholder="Select Type"
                  value={type}
                  onChange={(e) => {
                    setType(e);
                    setTypeError("");
                  }}
                  options={typeData}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      background: "#FFF",
                      outline: "1px solid #333",
                      borderRadius: "5px",
                      width: "240px",
                    }),
                  }}
                />
                {typeError ? (
                  <p className="form-error err">{typeError}</p>
                ) : null}
              </div>
              <div className="inputCon">
                <AsyncSelect
                  className="select"
                  cacheOptions
                  defaultOptions
                  loadOptions={fetchCity}
                  placeholder="Select City"
                  value={city}
                  onChange={(e) => {
                    setCity(e);
                    setCityError("");
                  }}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      background: "#FFF",
                      outline: "1px solid #333",
                      borderRadius: "5px",
                      width: "240px",
                    }),
                  }}
                />
                {cityError ? (
                  <p className="form-error err">{cityError}</p>
                ) : null}
              </div>
            </div>
            <div className="inputContainer">
              <div className="inputCon">
                <input
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  className="input"
                  placeholder="Enter Date of Appointment"
                  name="dateOfBirth"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setDateError("");
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
                {dateError && <p className="form-error">{dateError}</p>}
              </div>
              <div className="inputCon">
                <Select
                  className="select"
                  placeholder="Select Blood Group"
                  value={bloodGroup}
                  onChange={(e) => {
                    setBloodGroup(e);
                    setBloodGroupError("");
                  }}
                  options={bloodGroupData}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      background: "#FFF",
                      outline: "1px solid #333",
                      borderRadius: "5px",
                      width: "240px",
                    }),
                  }}
                />
                {bloodGroupError ? (
                  <p className="form-error err">{bloodGroupError}</p>
                ) : null}
              </div>
            </div>
            {type.value === "request" ? (
              <div className="inputContainer">
                <div className="inputCon">
                  <input
                    type="number"
                    className="input big"
                    placeholder="Enter Amount"
                    name="name"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setAmountError("");
                    }}
                  />
                  {amountError && <p className="form-error">{amountError}</p>}
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* Submit Button */}
            <div className="inputContainer">
              <button type="submit" className="btn">
                Schedule
              </button>
            </div>
          </form>
        </div>
        <div className="right">
          <img src={appointment} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
