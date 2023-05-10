// Importing Packages
import React, { useState } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";

// Importing Pages
import { RegisterModal } from "../../Components";

// Importing Images and data
import { register } from "../../Images";
import bloodGroupData from "../../Data/bloodGroup";

// Importing Yup Schemas
import { registerSchema } from "../../Utils/YupSchemas";

// Importing Styles
import "./Register.scss";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  aadharNumber: "",
  mobile: "",
  age: "",
  weight: "",
  address: "",
  city: "",
  country: "",
  dateOfBirth: "",
};

const Register = () => {
  // State
  const [bloodGroup, setBloodGroup] = useState("");
  const [bloodGroupError, setBloodGroupError] = useState("");
  const [readyToDonate, setReadyToDonate] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preMedicalHistory, setPreMedicalHistory] = useState({
    donatedInPastThreeMonths: false,
    diabetes: false,
    hiv: false,
    jaundice: false,
    bloodTransmission: false,
    recurrentInfection: false,
    hepatitis: false,
  });

  // Navigate hook
  const navigate = useNavigate();

  // Formik hook
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: async (values, action) => {
        const user = {
          ...values,
          ...preMedicalHistory,
          bloodGroup: bloodGroup.value,
          readyToDonate,
        };
        // Checking is blood group exist
        if (!bloodGroup) {
          setBloodGroupError("Enter your Blood Group");
          return;
        } else {
          setBloodGroupError("");
        }
        try {
          const res = await axios.post("/auth/register", user);
          if (res.data.status === "success") {
            action.resetForm();
            navigate("/login");
          } else {
            setError("Something went wrong try again");
          }
        } catch (error) {
          setError("Something went wrong try again");
        }
      },
    });

  return (
    <div className="Register">
      <div className="container">
        <div className="left">
          <p className="heading">{error ? error : "Register with us"}</p>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <div className="inputCon">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <p className="form-error">{errors.name}</p>
                ) : null}
              </div>
              <div className="inputCon">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="input"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="form-error">{errors.email}</p>
                ) : null}
              </div>
            </div>
            <div className="inputContainer">
              <div className="inputCon">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className="form-error">{errors.password}</p>
                ) : null}
              </div>
              <div className="inputCon">
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Confirm Password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <p className="form-error">{errors.confirmPassword}</p>
                ) : null}
              </div>
            </div>
            <div className="inputContainer">
              <div className="inputCon">
                <input
                  type="number"
                  className="input"
                  placeholder="Enter Aadhar Number"
                  name="aadharNumber"
                  value={values.aadharNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aadharNumber && touched.aadharNumber ? (
                  <p className="form-error">{errors.aadharNumber}</p>
                ) : null}
              </div>
              <div className="inputCon">
                <input
                  type="number"
                  className="input"
                  placeholder="Enter Mobile Number"
                  name="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.mobile && touched.mobile ? (
                  <p className="form-error">{errors.mobile}</p>
                ) : null}
              </div>
            </div>
            <div className="inputContainer">
              <div className="inputCon">
                <input
                  type="number"
                  className="input"
                  placeholder="Enter Age"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.age && touched.age ? (
                  <p className="form-error">{errors.age}</p>
                ) : null}
              </div>
              <div className="inputCon">
                <input
                  type="number"
                  className="input"
                  placeholder="Enter Weight"
                  name="weight"
                  value={values.weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.weight && touched.weight ? (
                  <p className="form-error">{errors.weight}</p>
                ) : null}
              </div>
            </div>
            <div className="inputContainer">
              <div className="inputCon">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.city && touched.city ? (
                  <p className="form-error">{errors.city}</p>
                ) : null}
              </div>
              <div className="inputCon">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Country"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.country && touched.country ? (
                  <p className="form-error">{errors.country}</p>
                ) : null}
              </div>
            </div>
            <div className="inputContainer">
              <div className="inputCon">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address ? (
                  <p className="form-error">{errors.address}</p>
                ) : null}
              </div>
              {/* <div className="inputCon">
                <Select
                  className="select"
                  placeholder="Select Blood Group"
                  value={bloodGroup}
                  onChange={setBloodGroup}
                  options={bloodGroupData}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      background: "#FFF",
                      // border: "1px solid #333",
                      outline: "1px solid #333",
                      borderRadius: "5px",
                      width: "240px",
                    }),
                  }}
                />
                {bloodGroupError ? (
                  <p className="form-error err">{bloodGroupError}</p>
                ) : null}
              </div> */}
            </div>
            <div className="inputContainer">
              <div className="inputCon">
                <input
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  className="input"
                  placeholder="Enter Date of Birth"
                  name="dateOfBirth"
                  value={values.dateOfBirth}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    e.target.type = "text";
                  }}
                />
                {errors.dateOfBirth && touched.dateOfBirth ? (
                  <p className="form-error">{errors.dateOfBirth}</p>
                ) : null}
              </div>
              <div className="inputCon">
                <Select
                  className="select"
                  placeholder="Select Blood Group"
                  value={bloodGroup}
                  onChange={setBloodGroup}
                  options={bloodGroupData}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      background: "#FFF",
                      // border: "1px solid #333",
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
            <div className="radioContainer">
              <span>Would you like to Donate blood?</span>
              <div>
                <input
                  type="radio"
                  id="yes"
                  name="readyToDonate"
                  value="true"
                  checked={readyToDonate === false ? false : true}
                  onChange={() => {
                    setReadyToDonate(true);
                    setIsModalOpen(true);
                  }}
                />
                <label htmlFor="yes">Yes</label>
                <input
                  type="radio"
                  id="no"
                  name="readyToDonate"
                  onChange={() => {
                    setReadyToDonate(false);
                    setIsModalOpen(false);
                  }}
                  value="false"
                  checked={readyToDonate === false ? true : false}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="inputContainer">
              <button type="submit" className="btn">
                Register
              </button>
            </div>
            <div className="linkContainer">
              <Link to="/login" className="link">
                Already Registered ? Login with your existing account
              </Link>
            </div>
          </form>
        </div>
        <div className="right">
          <img src={register} alt="Register" />
        </div>
      </div>
      {readyToDonate && isModalOpen && (
        <RegisterModal
          values={preMedicalHistory}
          setValues={setPreMedicalHistory}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Register;
