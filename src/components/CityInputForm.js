import React, { useState,useEffect } from 'react';
import fetchAction from '../actions/fetchDataAction';
import {connect} from 'react-redux';
import {Card,Form,Modal} from 'react-bootstrap';
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import ExtraCity from './ExtraCity';
import cityTimezones from "city-timezones";

const CityInputForm =({city,fetchAction,weather,condition})=>{
    const [enteredCity,setEnterCity] = useState('Boston');
    const [show, setShow] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [extraCity,setExtraCity] = useState('');
    const [cities,setCities]= useState([]);
    const [timezone,setTimeZone]= useState();
    const [time,setTime]= useState();

    const myStyle = {
        backgroundImage: `${condition.main === 'Clouds' ? 
                            'linear-gradient(to top, rgb(25, 51, 57) 0%, rgb(64, 114, 147) 100%)' : 
                            condition.main === 'Rain' || condition.main === 'Drizzle'? 
                            `linear-gradient(to top, rgb(156, 135, 117) 0%, rgb(2, 35, 35) 100%)`:
                            condition.main === 'Mist'?
                            `linear-gradient(to top, rgb(35, 45, 45) 0%, rgb(114, 115, 120) 100%)`:
                            condition.main === 'Haze'?
                            `linear-gradient(to top, rgb(226, 208, 181) 0%, rgb(146, 132, 117) 100%)`:
                            condition.main === 'Snow'?
                            `linear-gradient(to top, rgb(228, 230, 229) 0%, rgb(170, 177, 179) 100%)`:
                            condition.main === 'Thunderstorm'?
                            `linear-gradient(to top, rgb(59, 70, 104) 0%, rgb(16, 23, 68) 100%)`:
                            condition.main === 'Ash'?
                            `linear-gradient(to top, rgb(63, 33, 20) 0%, rgb(229, 111, 77) 100%)`:
                            condition.main === 'Dust'?
                            `linear-gradient(to top, rgb(226, 166, 120) 0%,rgb(130, 74, 58) 50%, rgb(179, 133, 120) 100%)`:
                            condition.main === 'Fog'?
                            `linear-gradient(to top, rgb(81, 96, 119) 0%,rgb(83, 92, 111) 50%, rgb(171, 195, 233) 100%)`:
                            condition.main === 'Sand'?
                            `linear-gradient(to top, rgb(88, 61, 30) 0%, rgb(255, 236, 179) 100%)`:
                            condition.main === 'Smoke'?
                            `linear-gradient(to top, rgb(61, 58, 42) 0%, rgb(226, 188, 139) 100%)`:
                            condition.main === 'Squall'?
                            `linear-gradient(to top, rgb(85, 54, 5) 0%,rgb(59, 65, 79) 50%, rgb(116, 115, 133) 100%)`:
                            condition.main === 'Tornado'?
                            `linear-gradient(to top, rgb(78, 45, 34) 0%,rgb(77, 62, 101) 50%, rgb(145, 124, 143) 100%)`:
                            'linear-gradient(to top, rgb(205, 233, 245) 0%, rgb(0, 154, 220) 100%)'}`,
        boxShadow: `0px 2px 20px ${condition.main === 'Clouds' ?'#424040':'grey'}`
    };

    useEffect(()=>{
        fetchAction({city:enteredCity});
        
        let storedCity = localStorage.getItem('storedCity')
        if(storedCity){
            setCities(JSON.parse(storedCity));
        }else{
            localStorage.setItem('storedCity',JSON.stringify(['Boston']));
            setCities(JSON.parse(localStorage.getItem('storedCity')));
        }

        try{
            const cityLookup = cityTimezones.lookupViaCity(enteredCity)
            let timeZone = cityLookup[0].timezone
            setTimeZone(cityLookup[0].timezone);
    
            let aestTime = new Date().toLocaleString("en-US", {timeZone: timeZone,hour: '2-digit', minute:'2-digit'});
            setTime(aestTime)
        }catch(e){
            console.log(e);
        }
    },[])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const submitCity =(cityToCheck,e)=>{
        e.preventDefault();
        fetchAction({city:cityToCheck});

        try{
            const cityLookup = cityTimezones.lookupViaCity(cityToCheck)
            let timeZone = cityLookup[0].timezone
            setTimeZone(cityLookup[0].timezone);
    
            let aestTime = new Date().toLocaleString("en-US", {timeZone: timeZone,hour: '2-digit', minute:'2-digit'});
            setTime(aestTime);

            if(show===true){
                handleClose();
            }
        }catch(e){
            console.log(e);
        }
    }

    const addCity=(e)=>{
        e.preventDefault();
        const cityLookup = cityTimezones.lookupViaCity(extraCity)
        if(cityLookup.length>0){
            let storedCity = localStorage.getItem('storedCity');
            let cityToAdd = JSON.parse(storedCity);

            if(storedCity){
                cityToAdd.push(extraCity);
                localStorage.setItem('storedCity',JSON.stringify(cityToAdd));
                setCities(JSON.parse(localStorage.getItem('storedCity')));

            }else{
                localStorage.setItem('storedCity',JSON.stringify([extraCity]));
            }
            setEnterCity(extraCity)
            submitCity(extraCity,e)
        }else{
           console.log('Unable to add the city');
           setAlertShow(true);
        }
        handleClose();
    }

    const checkTime=()=>{
        let aestTime = new Date().toLocaleString("en-US", {timeZone: timezone,hour: '2-digit', minute:'2-digit'});
        setTime(aestTime)
    }

    const reviewTemp =(sentCity)=>{
        fetchAction({city:sentCity})
    }

    let weatherTimer = setInterval((e) => reviewTemp(enteredCity), 1000*60*60);
    let localTimeTime = setInterval(() => checkTime(), 1000*60);

    return( 
        !!!condition.main ? "":
        <div className = "container-fluid">
            <img id="bg" src={require(`/Users/user/Documents/Project/weather-app/src/img/${condition.main}.jpg`)} alt ="background"/>
            <Card 
                className="weather-info"
                style={myStyle}>
                <Card.Body>
                    <div className="row">
                        <div className = "col-12">
                            <Modal show={alertShow} onHide={()=>setAlertShow(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Unable to add city</Modal.Title>
                                </Modal.Header>
                            </Modal>
                        </div>
                    </div>
                    <div className="row header-row">
                        <div className = "col-2 col-md-2">
                        </div>
                        <div className = "col-8 col-md-8">
                            <Form onSubmit= {(e)=>submitCity(enteredCity,e)}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control className = "input-box" type="text" placeholder={enteredCity} value ={enteredCity} onChange ={e=>setEnterCity(e.target.value)}/>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className = "col-2 col-md-2">
                            <button className = "btn-addcity" onClick={handleShow}>
                                <h6 className="add-city">+</h6>
                            </button>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                dialogClassName="modal-90h"
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-custom-modal-styling-title">
                                        Other Cities
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body style = {{height:'35rem',overflow:'scroll'}}>
                                    {
                                        cities.map((city,index)=>
                                            <ExtraCity city = {city} key={index} submitCity={submitCity} setEnterCity={setEnterCity} handleClose={handleClose}/>
                                        )
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    <Form onSubmit={addCity} style={{ marginTop: '15px',width:'29rem'}}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="text" placeholder="Enter City" onChange={e=>setExtraCity(e.target.value)}/>
                                        </Form.Group>
                                    </Form>
                                </Modal.Footer>
                            </Modal>
                        </div>  
                    </div>

                    <div className = "row day-time-row">
                        <div className = "col-12">
                            <h6 className="strTime">
                                {time}
                            </h6>
                        </div>
                    </div>

                    <div className = "row weather-condition-row">
                        <div className = "col-2 col-md-2 condition-icon">
                            <img className = "cond-image" src={require(`/Users/user/Documents/Project/weather-app/src/icons/${condition.main}.svg`)} alt=""/>
                        </div>
                        <div className = "col-10 col-md-10">
                            <h1 className = "condition-text">
                                {condition.main}
                            </h1>
                        </div>
                    </div>

                    <div className="row temp-row">
                        <div className="main-temp">
                            <h6 className = " temp-text">
                                {(weather.temp).toFixed(0)}
                            </h6>
                        </div>
                        <div className="degree">
                            <h6 className = "degree-symbol">
                                &deg;
                            </h6>
                        </div>
                        <div className="row max-min-row">
                            <div className="col-12 max-temp">
                                {(weather.temp_max).toFixed(0)}&deg; F
                            </div>
                            <div className="col-12 min-temp">
                                {(weather.temp_min).toFixed(0)}&deg; F
                            </div>
                        </div>
                    </div>

                    <div className = "row day-row">
                        <div className="col-12 day-date-col">
                            <DayPicker selectedDays={new Date()}/>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

const mapStateToProps = state =>({
    weather : state.posts.weatherData,
    condition: state.posts.conditionData
})

export default connect(mapStateToProps,{fetchAction})(CityInputForm);