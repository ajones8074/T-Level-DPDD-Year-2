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
import { useNavigate } from "react-router-dom";

export default function Sites(){

    const [sites, setSites] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        axios
        .get('http://192.168.168.122:3000/sites/')
        .then((res) => {
            setSites(res.data)
        })
        .catch((error) => console.log(error))
    },[])

    const selectSite = (site) => {
        Cookies.set('site',site);
        navigate('/')
    }

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
                                        <Button onClick={() => selectSite(site._id)} variant='primary'>Select Site</Button>
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