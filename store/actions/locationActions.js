import { GET_LOCATION, SET_ERROR } from '../types';
import { openweathermap_api_key } from '../../config.json';
import axios from 'axios'

export const getLocation = (latitude, longitude, onSuccess = () => {}, onError = () => {}) => {
  console.log('nipuni')
  console.log(latitude)
  return async dispatch => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openweathermap_api_key}`);

      if (!res.ok) {
        const resData = await res.json();
        throw new Error(resData.message);
      }

      const resData = await res.json();
      dispatch({
        type: GET_LOCATION,
        payload: resData,
      });
      onSuccess();
    } catch (err) {
      dispatch(setError(err.message));
      onError();
    }
  };
};

const setError = (err) => {
  return {
    type: SET_ERROR,
    payload: err,
  };
};