import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../actionTypes";

const apiUrl = "http://localhost:8080";

const url = `${apiUrl}/user`;

export const login = (query) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  let res;
  try {
    res = await fetch(`${url}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query?.formData),
    });
    let data = await res.json();
    console.log(data);
    query?.callback(data);
    if (res?.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("roles", data.roles);
      localStorage.setItem("id", data.id);
      localStorage.setItem("name", data.name);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token: data?.token },
      });
    } else {
      dispatch({ type: LOGIN_FAILURE });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: { message: "An error occurred" },
    });
  }
  return res;
};

export const signup = (query) => async (dispatch) => {
  // console.log(query)
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const res = await fetch(`${url}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query?.formData),
    });
    // console.log(res)
    let data = await res.json();
    // console.log(data)
    query?.callback(data);

    if (res.ok) {
      dispatch({ type: SIGNUP_SUCCESS, payload: { message: data?.msg } });
    } else {
      dispatch({ type: SIGNUP_FAILURE, payload: { message: data?.msg } });
    }
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: { error: "An error occurred" } });
  }
};
