import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// Slice
export const getWeatherSlice = createSlice({
    name: 'getWeather',
    initialState:{
        weather :[],
        condition:[]
      },
    reducers:{
        fetchWeatherData:   (state,action)=>{
            state.weather = action.payload
        },
        fetchConditionData: (state,action)=>{
            state.condition = action.payload
        }
    }
})

export default getWeatherSlice.reducer;

// Actions

const {fetchWeatherData,fetchConditionData} = getWeatherSlice.actions;

export const getWeatherAction = ({city})=>async dispatch=>{
    try{
        const apiCall = await axios(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}&units=imperial`,
        );
        const weatherData= apiCall.data.main;
        const conditionData = apiCall.data.weather[0];
        
        dispatch(fetchWeatherData(weatherData))

        dispatch(fetchConditionData(conditionData))
    }catch(e){
        console.log(e);
    }
}