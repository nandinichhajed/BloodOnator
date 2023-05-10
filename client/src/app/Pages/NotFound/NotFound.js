import React from "react";

// Importing Images
import { notFound } from "../../Images";

// Importing Styles
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="NotFound">
      <div className="imgContainer">
        <img src={notFound} alt="Not Found" />
      </div>
    </div>
  );
};

export default NotFound;
