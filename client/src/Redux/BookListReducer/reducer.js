import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from "../actionTypes";

 export const initialState = {
  isLoading: false,
  isError: false,
  books: [],
};

export const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        books:[]
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        books: payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        books:[]
      };
    default:
      return state;
  }
};



