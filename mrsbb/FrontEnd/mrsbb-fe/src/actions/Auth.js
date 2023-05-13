// author: @iamtienng
// this file is used to store all the actions for authentification

import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT,
} from "./Types";

// Check if current session of user is authenticated
export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    // body contains the token which is access token
    const body = JSON.stringify({ token: localStorage.getItem("access") });

    // depending on the response, we will dispatch different actions
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

// after checking if the user is authenticated, we will load the user information
export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // since GET method does not have body, we will use headers to send the token
        // prettier-ignore
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        // prettier-ignore
        'Accept': 'application/json',
      },
    };

    // depending on the response, we will dispatch different actions
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      );

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

// login action happens when user click on the login button
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // body contains the email and password
  const body = JSON.stringify({ email, password });

  let isloginSuccess = false;
  // errStr is used to store the error message
  let errStr = "";

  // depending on the response, we will dispatch different actions
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    isloginSuccess = true;
    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    errStr = Object.values(err.response.data);
  }
  // if login is not successful, we will return the error message
  if (!isloginSuccess) {
    return errStr;
  } else {
    return null;
  }
};

// signup action happens when user click on the signup button
export const signup =
  (first_name, last_name, email, password, re_password, gender, birth_date) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // body contains the user information
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
      gender,
      birth_date,
    });

    let accountCreated = false;
    // errStr is used to store the error message
    let errStr = "";

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/`,
        body,
        config
      );
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });

      accountCreated = true;
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
      errStr = Object.values(err.response.data);
    }
    // if signup is not successful, we will return the error message
    if (!accountCreated) {
      return errStr;
    } else {
      return "created";
    }
  };

// logout action happens when user click on the logout button
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
