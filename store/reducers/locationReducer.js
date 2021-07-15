import { GET_LOCATION, SET_ERROR } from '../types';

const initialState = {
  data: null,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return {
        data: action.payload,
        error: '',
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};