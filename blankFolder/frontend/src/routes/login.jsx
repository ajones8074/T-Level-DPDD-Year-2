import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    Row
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


export default function Login(){
    
    const [inputs, setInputs] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        var email = inputs.email;
        var password = inputs.password;

        axios
        .post('http://127.0.0.1:3000/users/login', {
            email:email,
            password:password
        }).then((res) => {
            console.log(res);
            if(res.data.cookie !== undefined)
            {
                Cookies.set('token', res.data.cookie);
                navigate('/');
            }
        }).catch((error) => {
            setShow(true);
            setMessage(error.response.data.error)
        })
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
                            {message}
                        </Alert>
                        <Card>
                            <Card.Body>
                                <Card.Title>Login</Card.Title>
                                <Card.Text>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="email">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control onChange={handleChange} type="email" placeholder="Enter Email" name="email" required />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control onChange={handleChange} type="password" placeholder="Enter Password" name="password" required />
                                        </Form.Group>

                                        <Button style={{marginTop: '10px'}} variant="primary" type="submit">
                                            Submit
                                        </Button>
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