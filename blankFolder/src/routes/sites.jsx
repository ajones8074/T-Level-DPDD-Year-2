import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Card,
    Col,
    Container,
    Row,
} from 'react-bootstrap'
import Cookies from "js-cookie";
import axios from "axios";


export default function Sites(){

    const [sites, setSites] = useState([]);


    useEffect(() =>{
        axios
        .get('http://api.roberthompson.co.uk/sites/')
        .then((res) => {
            setSites(res.data)
        })
        .catch((error) => console.log(error))
    },[])

    return(
        <>
            <Container>
                <Row style={{paddingTop: '20px'}}>
                    {
                        sites.map(site => (
                            <Col xs='4'>
                                <Card key={site._id} style={{width: '100%', height: '100%'}}>
                                    <Card.Img variant="top" src={site.image}/>
                                    <Card.Body>
                                        <Card.Title>{site.name}</Card.Title>
                                        <Card.Text>{site.description}</Card.Text>
                                        <Button href={'/'} variant='primary'>Go Somewhere</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}