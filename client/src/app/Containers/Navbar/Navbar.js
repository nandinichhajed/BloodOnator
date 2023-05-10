// Importing Packages
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// Importing User actions
import { removeUser } from "../../Redux/Actions/userActions";

// Importing Images
import { logo } from "../../Images";

// Importing Styles
import "./Navbar.scss";

const Navbar = () => {
    // Using Redux
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Logout Function
    const logoutUser = async () => {
        // Logging out from backend
        const res = await axios.get("/auth/logout");
        console.log(res.data);

        // Removing token from local storage
        localStorage.removeItem("user");

        // Removing user from state and he logged out
        dispatch(removeUser());
        navigate("/login");
    };

    return (
        <div className="Navbar">
            <Link className="logo" to="/">
                <img src={logo} alt="Blood Donation" />
            </Link>

            <ul className="links">
                <li>
                    <Link to="/" className="link">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="link">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/appointment" className="link">
                        Appointment
                    </Link>
                </li>
                <li>
                    <Link to="/city" className="link">
                        City
                    </Link>
                </li>
                {token && (
                    <li>
                        <Link to="/profile" className="link">
                            Profile
                        </Link>
                    </li>
                )}
            </ul>

            {token ? (
                <div className="button-container">
                    <span onClick={logoutUser} className="btn-secondary">
                        Logout
                    </span>
                </div>
            ) : (
                <div className="button-container">
                    <Link to="/register" className="btn-primary">
                        Register
                    </Link>
                    <Link to="/login" className="btn-secondary">
                        Login
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
