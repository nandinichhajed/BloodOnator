// Importing Action Types
import userActionTypes from "../Types/userActionTypes";
const { SET_USER, FETCH_USER_FROM_LOCAL_STORAGE, REMOVE_USER } =
  userActionTypes;

// To set a new user
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

// To fetch from localStorage if user is logged in
export const fetchUserFromLocalStorage = (user) => {
  return {
    type: FETCH_USER_FROM_LOCAL_STORAGE,
    payload: user,
  };
};

// To remove a logged in user and make him logged out
export const removeUser = (user) => {
  return {
    type: REMOVE_USER,
  };
};
