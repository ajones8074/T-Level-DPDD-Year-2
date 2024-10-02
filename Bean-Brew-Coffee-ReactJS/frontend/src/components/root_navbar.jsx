import 'bootstrap/dist/css/bootstrap.min.css';
import{
    Container,
    Button,
    Navbar,
    Nav
} from 'react-bootstrap'
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default function RootNavbar(){
    const navigate = useNavigate();
    const [user, setUser] = useState({})

    useEffect(() => {
        var userId = Cookies.get("user")
        axios
        .get("http://localhost:3000/users/"+userId+"/email")
        .then((res) =>{
            setUser(res.data)
        })
        .catch((err) => {
            navigate("/login");
        })
    },[]);

    return (
        <Navbar className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand href='/'>Bean and Brew Coffee</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href='/staff'>Staff</Nav.Link>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text>
                        <Button href="/login" variant="primary" style={{color: "white", margin:"10px"}}>Login</Button>
                        <Button href="/register" variant="primary" style={{color: "white", margin:"10px"}}>Register</Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}