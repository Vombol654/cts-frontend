import { combineReducers } from "redux";
import { coursesReducer } from "./coursesReducer";
import { loginReducer } from "./loginReducer";
import { signupReducer } from "./signupReducer";
// import {} from "./menteeReducer";

export const reducer = combineReducers({
  Login: loginReducer,
  SignUp: signupReducer,
  Courses: coursesReducer,
});
