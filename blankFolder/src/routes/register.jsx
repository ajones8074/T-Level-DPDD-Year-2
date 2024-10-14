import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
} from 'react-bootstrap'
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register(){

    const [inputs, setInputs] = useState({});
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault();
        var email = inputs.email;
        var password = inputs.password;
        var repeatPassword = inputs.repeatPassword
        if(password == repeatPassword){
            axios
            .post('http://api.roberthompson.co.uk/users/',{
                email:email,
                password:password
            }).then((res) => {
                if(res.data.cookie !== undefined)
                {
                    Cookies.set('token',res.data.cookie)
                    navigate('/')
                }
            }).catch((error) => {
                setShow(true)
                setMessage(error.response.data.error)
            })
            console.log("Passwords match")
        }else{
            setShow(true);
            setMessage("Passwords do not match")
        }
    }

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    return(
        <>
            <Container>
                <Row style={{marginTop: '20px'}}>
                    <Col xs='2'></Col>
                    <Col xs='8'>
                        <Alert show={show} onClose={() => setShow(false)} variant="danger" dismissible>
                            <Alert.Heading>Oh No!</Alert.Heading>
                            <p>{message}</p>
                        </Alert>

                        <Card>
                            <Card.Body>
                                <Card.Title>Register</Card.Title>
                                <Card.Text>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="email">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control onChange={handleChange} type="email" placeholder="Enter Email" name="email" required />
                                        </Form.Group>

                                        <Form.Group controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control onChange={handleChange} type="password" placeholder="Enter Password" name="password" required />
                                        </Form.Group>

                                        <Form.Group controlId="repeatPassword">
                                            <Form.Label>Repeat Password</Form.Label>
                                            <Form.Control onChange={handleChange} type="password" placeholder="Repeat Password" name="repeatPassword" required />
                                        </Form.Group>

                                        <Button variant="primary" type="submit" style={{marginTop: '10px'}}>Submit</Button>
                                    </Form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs='2'></Col>
                </Row>
            </Container>
        </>
    )
}