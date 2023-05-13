// author: @iamtienng
// this file is used to define all states of the application
// after the actions that can be performed on these states
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
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOADED_SUCCESS,
  ADMIN_LOADED_FAIL,
  ADMIN_AUTHENTICATED_SUCCESS,
  ADMIN_AUTHENTICATED_FAIL,
} from "../actions/Types";

// initial state of the application
const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  adminAuthenticated: null,
  user: null,
  admin: null,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case ADMIN_AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        adminAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        adminAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_LOADED_SUCCESS:
      localStorage.setItem("userId", payload.id);
      return {
        ...state,
        user: payload,
      };
    case ADMIN_LOADED_SUCCESS:
      localStorage.setItem("adminId", payload.id);
      return {
        ...state,
        admin: payload,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case ADMIN_AUTHENTICATED_FAIL:
      return {
        ...state,
        adminAuthenticated: false,
      };

    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case ADMIN_LOADED_FAIL:
      return {
        ...state,
        admin: null,
      };
    case ADMIN_LOGIN_FAIL:
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("userId");
      localStorage.removeItem("adminId");
      return {
        ...state,
        isAuthenticated: false,
        adminAuthenticated: false,
        access: null,
        refresh: null,
        user: null,
        admin: null,
      };
    default:
      return state;
  }
}
