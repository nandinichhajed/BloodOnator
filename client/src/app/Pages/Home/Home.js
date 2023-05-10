import React from "react";
import { Link } from "react-router-dom";

// Importing Images
import { home } from "../../Images";

// Importing Styles
import "./Home.scss";

const Home = () => {
  return (
    <div className="Home">
      <div className="container">
        <div className="left">
          <h1>Welcome to Bloodonator</h1>
          <p>
            The Blood O- is the rarest blood and is very difficult to find a
            donor, but we are here to help you and save life's
          </p>
          <div className="button-container">
            <Link to="/donate" className="btn-primary">
              Donate Blood
            </Link>
            <Link to="/request" className="btn-secondary">
              Request Blood
            </Link>
          </div>
        </div>
        <div className="right">
          <img src={home} alt="Hero" />
        </div>
      </div>
    </div>
  );
};

export default Home;
