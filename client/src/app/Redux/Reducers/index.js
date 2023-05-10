import { combineReducers } from "redux";

// Importing Reducers
import userReducer from "./User/userReducer";

const reducers = combineReducers({
  user: userReducer,
});

export default reducers;
