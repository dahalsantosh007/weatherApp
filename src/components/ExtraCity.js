import React from 'react';
import {Card,Button,Container,Row,Col} from 'react-bootstrap';

const ExtraCity =({city,submitCity,setEnterCity,handleClose})=>{
    const clickedCity=(e,passedCity)=>{
        submitCity(passedCity,e);
        setEnterCity(passedCity);
    }

    const removeCity=(remoCity)=>{
        let newCollection = []
        let storedCity = localStorage.getItem('storedCity')
        storedCity=JSON.parse(storedCity);

        newCollection = storedCity.filter(city=>city!== remoCity)

        localStorage.setItem('storedCity',JSON.stringify(newCollection));
        handleClose();
        window.location.reload();
    }

    return(
        <Card style={{ marginBottom: '5px' ,textTransform:"capitalize"}}>
            <Card.Body>
                <Card.Title>
                    <Container>
                        <Row>
                            <Col md lg= {10} onClick={e=>clickedCity(e,city)} style={{cursor:'pointer'}}>{city}</Col>
                            <Col md lg= {2}><Button onClick = {()=>removeCity(city)}>X</Button></Col>
                        </Row>
                    </Container>
                </Card.Title>
            </Card.Body>
        </Card>
    )
}

export default ExtraCity