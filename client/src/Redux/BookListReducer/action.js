import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from "../actionTypes";

const apiUrl = "http://localhost:8080";
const url = `${apiUrl}/books`;

const getToken = () => {
  // Retrieve the token from local storage
  return localStorage.getItem("token");
};

export const fetchAllBooks = async (dispatch) => {
  dispatch({ type: FETCH_DATA_REQUEST });

  try {
    const token = getToken();

    const res = await fetch(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    const data = await res.json();
    // console.log(data)
    if (res.ok) {
      dispatch({ type: FETCH_DATA_SUCCESS, payload: data.books });
    } else {
      dispatch({ type: FETCH_DATA_FAILURE });
    }
  } catch (error) {
    dispatch({ type: FETCH_DATA_FAILURE });
  }
};

export const addBook = async (dispatch, bookData) => {
  dispatch({ type: FETCH_DATA_REQUEST });

  try {
    const token = getToken();

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    const data = await res.json();

    if (res.ok) {
      // Handle success, dispatch appropriate action or perform other logic
    } else {
      // Handle failure, dispatch appropriate action or perform other logic
      dispatch({ type: FETCH_DATA_FAILURE });
    }
  } catch (error) {
    // Handle error, dispatch appropriate action or perform other logic
    dispatch({ type: FETCH_DATA_FAILURE });
  }
};

export const updateBook = async (dispatch, bookId, updatedData) => {
  dispatch({ type: FETCH_DATA_REQUEST });

  try {
    const token = getToken();

    const res = await fetch(`${url}/${bookId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    if (res.ok) {
      // Handle success, dispatch appropriate action or perform other logic
    } else {
      // Handle failure, dispatch appropriate action or perform other logic
      dispatch({ type: FETCH_DATA_FAILURE });
    }
  } catch (error) {
    // Handle error, dispatch appropriate action or perform other logic
    dispatch({ type: FETCH_DATA_FAILURE });
  }
};

export const deleteBook = async (dispatch, bookId) => {
  dispatch({ type: FETCH_DATA_REQUEST });

  try {
    const token = getToken();

    const res = await fetch(`${url}/${bookId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      // Handle success, dispatch appropriate action or perform other logic
    } else {
      // Handle failure, dispatch appropriate action or perform other logic
      dispatch({ type: FETCH_DATA_FAILURE });
    }
  } catch (error) {
    // Handle error, dispatch appropriate action or perform other logic
    dispatch({ type: FETCH_DATA_FAILURE });
  }
};
