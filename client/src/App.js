import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Importing User actions
import { fetchUserFromLocalStorage } from "./app/Redux/Actions/userActions";

// Importing Router
import Router from "./Router";

// Importing Containers
import { Navbar } from "./app/Containers";

const App = () => {
  // Dispatch hook
  const dispatch = useDispatch();
  // Fetching if user is logged in before and have data in local storage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(fetchUserFromLocalStorage(JSON.parse(user)));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Router />
    </div>
  );
};

export default App;
