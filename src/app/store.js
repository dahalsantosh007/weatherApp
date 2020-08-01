import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import getWeatherReducer from '../features/GetWeather'
const reducer = combineReducers({
  posts :getWeatherReducer
})
const store = configureStore({
  reducer
})

export default store;