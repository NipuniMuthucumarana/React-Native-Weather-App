import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import locationReducer from './reducers/locationReducer';

import weatherReducer from './reducers/weatherReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;