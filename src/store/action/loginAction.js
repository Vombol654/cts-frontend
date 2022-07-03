import { loginActionType } from "../actionTypes/loginActionType";

const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } = loginActionType;

const loginStart = () => {
  return {
    type: LOGIN_START,
  };
};

const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

const url = "http://localhost:8085/login";

export const login = (user) => {
  console.log("Login Function from loginAction.js");
  return (dispatch) => {
    dispatch(loginStart());
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...user,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isAuthenticated) {
          dispatch(loginSuccess(data.user));
        } else {
          dispatch(loginFail(data.message));
        }
      })
      .catch((err) => {
        dispatch(loginFail(err));
        alert(err);
      });
  };
};

export const logout = () => {
  return { type: LOGOUT };
};
