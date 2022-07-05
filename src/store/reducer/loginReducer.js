import { loginActionType } from "../actionTypes/loginActionType";

const initialState = {
  user: {},
  userType: "",
  loading: false,
  loggedIn: false,
  error: "",
};

const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } = loginActionType;

export const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_START:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        loggedIn: true,
        error: "",
      };

    case LOGIN_FAIL:
      return { ...state, loading: false, loggedIn: false, error: payload };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};
