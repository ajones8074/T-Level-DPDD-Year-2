import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
    Offcanvas
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function PageNavbar(){
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    var userid = Cookies.get('token');

    useEffect(() => {
        var user = Cookies.get('token');
        var site = Cookies.get('site');

        if(user === undefined)
        {
            navigate('/login')
        }else{
            if(site === undefined)
            {
                navigate('/sites')
            }else{
                axios
                .get('http://127.0.0.1:3000/users/'+user+'/email')
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    navigate('/login');
                })
            }
        }
    },[]);

    return(
        <>
            <Navbar expand="lg" className="bg-body-tertiary mb-3" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img
                            alt="Mug outline with steam"
                            src="https://static.vecteezy.com/system/resources/previews/010/160/674/original/coffee-icon-sign-symbol-design-free-png.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Bean & Brew Coffee
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Offcanvas className="bg-body-tertiary" placement="end" data-bs-theme="dark">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Bean & Brew Coffee</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Navbar.Text className="justify-content-end">
                                Signed in as: <a href="#login">{user.email}</a>
                            </Navbar.Text>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <br></br>
                                <Nav.Link href="/sites">Sites</Nav.Link>
                                <NavDropdown title="Orders" id="collapsible-nav-dropdown">
                                    <NavDropdown.Item href={"/orders/user/"+userid}>Your Orders</NavDropdown.Item>
                                    <NavDropdown.Item href="/orders/site">Orders by Site</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                                <Nav.Link href="/logout">Sign Out</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}