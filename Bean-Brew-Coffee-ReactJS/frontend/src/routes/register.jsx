import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Alert
} from 'react-bootstrap'
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const [inputs, setInputs] = useState({});
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        var fname = inputs.fname;
        var sname = inputs.sname;
        var address1 = inputs.address1;
        var address2 = inputs.address2;
        var addressCity = inputs.addressCity;
        var addressCounty = inputs.addressCounty;
        var addressCountry = inputs.addressCountry;
        var postcode = inputs.postcode;
        var email = inputs.email;
        var password = inputs.password
        var repeat_password = inputs.repeat_password
        if(repeat_password == password)
        {
            axios
            .post('http://localhost:3000/users/',{
                fname:fname, 
                sname:sname, 
                address1:address1,
                address2:address2,
                addressCity:addressCity,
                addressCounty:addressCounty,
                addressCountry:addressCountry,
                postcode:postcode, 
                email:email, 
                password:password
            }).then((res) => {
                console.log(res.data)
                if(res.data.cookie !== undefined)
                {
                    Cookies.set("user",res.data.cookie)
                    navigate("/");
                }

            }).catch((error) =>{
                console.log(error)
                setShow(true);
                setMessage(error.response.data.error)
            })
        }
        else{
            console.log("password not ok")
            setShow(true);
            setMessage("The passwords you entered did not match")
        }
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }


    return (
        <>
            <Container>
                <Row>
                    <Col xs="2" style={{paddingTop:"10px"}}></Col>
                    <Col style={{paddingTop:"10px"}}>
                    <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Oh No!</Alert.Heading>
                        <p>
                            {message}
                        </p>
                    </Alert>
                        <Card>
                            <Card.Header>
                                <Card.Text>
                                    Already have an account? <Button variant='primary' href="/login">Click Here to Login</Button>
                                </Card.Text>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>Register</Card.Title>
                                <Card.Text>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="fname" placeholder="Enter first name" name="fname" required onChange={handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicLastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="sname" placeholder="Enter last name" name="sname" required onChange={handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicAddress1">
                                            <Form.Label>Address Line 1</Form.Label>
                                            <Form.Control type="address" placeholder="Enter address line 1" name="address1" required onChange={handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicAddress2">
                                            <Form.Label>Address Line 2 (optional)</Form.Label>
                                            <Form.Control type="address" placeholder="Enter address line 2 (optional)" name="address2" onChange={handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>Town/City</Form.Label>
                                            <Form.Control type="address" placeholder="Enter town/city" name="addressCity" required onChange={handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>County</Form.Label>
                                            <Form.Control type="address" placeholder="Enter county" name="addressCounty" required onChange={handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control type="address" placeholder="Country" name="addressCountry" required onChange={handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>Postcode</Form.Label>
                                            <Form.Control type="postcode" placeholder="Enter postcode" name="postcode" required onChange={handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" name="email" required onChange={handleChange}/>
                                            <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control name='password' type="password" placeholder="Password" required onChange={handleChange}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                                            <Form.Label>Repeat Password</Form.Label>
                                            <Form.Control name='repeat_password' type="password" placeholder="Password" required onChange={handleChange}/>
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs="2" style={{paddingTop:"10px"}}></Col>
                </Row>
            </Container>
        </>
    );
}