import {FETCH_WEATHERDATA,FETCH_CONDITIONDATA} from './types';
import axios from 'axios';

const fetchAction = (postData)=>{
    return async function (dispatch){
        try{
            const apiCall = await axios(
                `https://api.openweathermap.org/data/2.5/weather?q=${postData.city}&APPID=${process.env.REACT_APP_API_KEY}&units=imperial`,
            );
            const weatherData= apiCall.data.main;
            const conditionData = apiCall.data.weather[0];

            dispatch({
                type: FETCH_WEATHERDATA,
                payload: weatherData,
            })

            dispatch({
                type: FETCH_CONDITIONDATA,
                payload: conditionData,
            })
        }catch(e){
            console.log(e);
        }
    }   
}

export default fetchAction;