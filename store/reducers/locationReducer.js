import { GET_LOCATION, SET_ERROR } from '../types';

const initialState = {
  locationData: null,
  locationError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return {
        locationData: action.payload,
        locationError: '',
      };
    case SET_ERROR:
      return {
        ...state,
        locationError: action.payload,
      };
    default:
      return state;
  }
};