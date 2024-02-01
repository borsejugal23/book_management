import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../actionTypes";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actionTypes"; // Corrected import path

const initialState = {
  isLoading: false,
  isError: false,
  token: "",
  message: "",
  name: "",
  id: "",
};

export const reducer = (state = initialState, { type, payload }) => {
  // console.log(type, payload);
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: payload.token,
        id: payload.id,
        name: payload.name,
      };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false };

    // Include error message
    case SIGNUP_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case SIGNUP_SUCCESS:
      // Updated to set message for SIGNUP_SUCCESS
      return {
        ...state,
        isLoading: false,
        message: payload.message,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: payload.message,
      };
    default:
      return state;
  }
};
