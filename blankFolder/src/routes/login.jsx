import React from 'react';
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


export default function Login(){
    
    return(
        <>
            <Container>
                <Row>
                    <Col xs='2'></Col>
                    <Col xs='8'>
                        <Alert variant="danger" dismissible>
                            <Alert.Heading>Oh No!</Alert.Heading>
                            <p>Message</p>
                        </Alert>
                        <Card>
                            <Card.Body>
                                <Card.Title>Login</Card.Title>
                                <Card.Text>
                                    <Form>
                                        <Form.Group controlId="email">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Email" name="email" required />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password" name="Password" required />
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
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