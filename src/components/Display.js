import React from 'react';
import CityInputForm from './CityInputForm';

const Display = ()=>{
    const city = 'Boston,us';

    return(
        <React.Fragment>
            <CityInputForm city={city}/>
        </React.Fragment>
    )
}

export default Display;