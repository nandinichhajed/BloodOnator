import React from "react";
import { Routes, Route } from "react-router-dom";

// Importing Pages
import {
  Home,
  About,
  Register,
  Login,
  Appointment,
  NotFound,
  City,
} from "./app/Pages";

// Importing Components
import { ProtectedUserRoutes } from "./app/Components";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* User Protected Route */}
        <Route element={<ProtectedUserRoutes />}>
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/city" element={<City />} />
        </Route>

        {/* Not Found Route*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
