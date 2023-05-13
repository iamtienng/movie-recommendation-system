// author: @iamtienng
import axios from "axios";
import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOADED_SUCCESS,
  ADMIN_LOADED_FAIL,
  ADMIN_AUTHENTICATED_SUCCESS,
  ADMIN_AUTHENTICATED_FAIL,
} from "./Types";

export const admin_load_users_list = () => async () => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        // prettier-ignore
        'Accept': 'application/json',
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/users/`,
        config
      );
      if (res.status === 200) {
        return res.data;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

export const admin_load_movies_list = () => async () => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        // prettier-ignore
        'Accept': 'application/json',
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/movies/`,
        config
      );
      if (res.status === 200) {
        return res.data;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

export const admin_delete_user = (userId) => async () => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        // prettier-ignore
        'Accept': 'application/json',
      },
    };

    try {
      alert(userId);
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/users/${userId}/`,
        config
      );
      if (res.status === 200) {
        return res.data;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

// admin login action happens when admin click on the login button
export const admin_login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  let isloginSuccess = false;
  // errStr is used to store the error message
  let errStr = "";

  // depending on the response, we will dispatch different actions
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: res.data,
    });
    isloginSuccess = true;
    dispatch(load_admin());
  } catch (err) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
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

// after checking if the admin is authenticated, we will load the admin information
export const load_admin = () => async (dispatch) => {
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
        `${process.env.REACT_APP_API_URL}/admin/me/`,
        config
      );

      dispatch({
        type: ADMIN_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ADMIN_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: ADMIN_LOADED_FAIL,
    });
  }
};

// check if the admin is authenticated
export const admin_check_authenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    // body contains the token
    const body = JSON.stringify({ token: localStorage.getItem("access") });

    // depending on the response, we will dispatch different actions
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: ADMIN_AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: ADMIN_AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: ADMIN_AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: ADMIN_AUTHENTICATED_FAIL,
    });
  }
};
