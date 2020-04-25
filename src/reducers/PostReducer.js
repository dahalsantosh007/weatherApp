import {FETCH_WEATHERDATA,FETCH_CONDITIONDATA} from '../actions/types.js';

const initialState = {
  weatherData :[],
  conditionData:[]
}

export default function(state = initialState,action){
  switch (action.type){
    case FETCH_WEATHERDATA:
      return{
        ...state,
        weatherData: action.payload
      }
    case FETCH_CONDITIONDATA:
      return{
        ...state,
        conditionData: action.payload
      }
    default:
       return state;
  }
}