import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  START_LOADING,
  STOP_LOADING,
} from "../actions/types";

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  register_success: false,
};

const accountReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      console.log("REGISTER_SUCCESS");
      return {
        ...state,
        register_success: true,
      };
    case REGISTER_FAIL:
      console.log("REGISTER_FAIL");
      return {
        ...state,
      };
    case RESET_REGISTER_SUCCESS:
      console.log("RESET_REGISTER_SUCCESS");
      return {
        ...state,
        register_success: false,
      };
    case LOGIN_SUCCESS:
      console.log("LOGIN_SUCCESS");
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGIN_FAIL:
      console.log("LOGIN_FAIL");
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGOUT_SUCCESS:
      console.log("LOGOUT_SUCCESS");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT_FAIL:
      console.log("LOGOUT_FAIL");
      return {
        ...state,
      };
    case LOAD_USER_SUCCESS:
      console.log("LOAD_USER_SUCCESS");
      return {
        ...state,
        user: payload,
      };
    case LOAD_USER_FAIL:
      console.log("LOAD_USER_FAIL");
      return {
        ...state,
        user: null,
      };
    case START_LOADING:
      console.log("START_LOADING");
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      console.log("STOP_LOADING");
      return {
        ...state,
        loading: false,
      };
    default:
      console.log("DEFAULT");
      return state;
  }
};

export default accountReducer;
