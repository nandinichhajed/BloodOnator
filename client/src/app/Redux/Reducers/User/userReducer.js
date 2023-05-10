// Importing Action Types
import userActionTypes from "../../Types/userActionTypes";
const { SET_USER, FETCH_USER_FROM_LOCAL_STORAGE, REMOVE_USER } =
  userActionTypes;

// Initial State
const initialState = {
  token: "",
  name: "",
  role: "",
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // For setting the user
    case SET_USER:
      localStorage.setItem("user", JSON.stringify({ ...payload }));
      return {
        ...state,
        ...payload,
      };

    // For fetching the user from localStorage
    case FETCH_USER_FROM_LOCAL_STORAGE:
      return {
        ...state,
        ...payload,
      };

    case REMOVE_USER:
      return {};

    default:
      return { ...state };
  }
};

export default userReducer;
