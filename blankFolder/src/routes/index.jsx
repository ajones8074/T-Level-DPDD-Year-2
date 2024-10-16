import React, { useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card,
    Col,
    Container,
    Row
} from 'react-bootstrap';
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageNavbar from "../components/navbar";

export default function Index() {

    const [site, setSite] = useState({});

    useEffect(() => {
        var siteid = Cookies.get('site');
        axios
        .get('http://192.168.168.122:3000/sites/'+siteid)
        .then((res) => {
            setSite(res.data)
        })
        .catch((error) => console.log(error))
    },[])

    return(
        <>
            <PageNavbar/>
            <Container>
                <Row>
                    <Col xs='3'>
                        <Card>
                            <Card.Img variant="top" src={site.image}/>
                            <Card.Body>
                                <Card.Title>You are Shopping at: {site.name}</Card.Title>
                                <Card.Text>{site.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs='9'></Col>
                </Row>
            </Container>
        </>
    )
}