// Importing Packages
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

// Importing Images
import { login } from "../../Images";

// Importing Yup Schemas
import { loginSchema } from "../../Utils/YupSchemas";

// Importing Actions
import { setUser } from "../../Redux/Actions/userActions";

// Importing Styles
import "./Login.scss";

// State Initial Values
const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  // State
  const [error, setError] = useState("");

  // Navigate hook
  const navigate = useNavigate();

  // Dispatch hook
  const dispatch = useDispatch();

  // Formik hook
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          const res = await axios.post("/auth/login", values);
          if (res.data.status === "success") {
            const { name, role, token } = res.data;
            action.resetForm();
            dispatch(setUser({ name, role, token }));
            navigate("/");
          } else {
            setError("Something went wrong try again");
          }
        } catch (error) {
          setError("Something went wrong try again");
        }
      },
    });
  return (
    <div className="Login">
      <div className="container">
        <div className="left">
          <p className="heading">{error ? error : "Login"}</p>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
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
            </div>

            {/* Submit Button */}
            <div className="inputContainer">
              <button type="submit" className="btn">
                Login
              </button>
            </div>
            <div className="linkContainer">
              <Link to="/register" className="link">
                Don't have an account ? Register
              </Link>
            </div>
          </form>
        </div>
        <div className="right">
          <img src={login} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
