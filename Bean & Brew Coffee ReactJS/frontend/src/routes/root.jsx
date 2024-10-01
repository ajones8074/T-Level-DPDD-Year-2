import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import{
    Container,
    Row,
    Col,
    Button,
    Card,
    Navbar
} from 'react-bootstrap'
import axios from 'axios';

export default function Root(){
    const [sites, setSites] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    
    useEffect(() => {
        axios
        .get("http://localhost:3000/sites/")
        .then((res) => {
            setSites(res.data)
            setIsLoaded(true)
        })
        .catch((err) => console.log(err))
    },[]);
    
    if(isLoaded)
        {
            return (
                <>
                    <Navbar>
                        <Container>
                            <Navbar.Brand href='/'>Bean and Brew Coffee</Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse className='justify-content-end'>
                                <Navbar.Text>
                                    <Button href="/login" variant="primary" style={{color: "white", margin:"10px"}}>Login</Button>
                                    <Button href="/register" variant="primary" style={{color: "white", margin:"10px"}}>Register</Button>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container fluid style={{alignContent: "center"}}>
                        <Row>
                            {
                                sites.map(site =>(
                                    <Col md={4} className='text-center' style={{paddingTop:"20px"}}>
                                        <Card style={{ width: '100%', height:"100%" }} key={site._id}>
                                            <Card.Img variant="top" src={site.image}/>
                                            <Card.Body>
                                                <Card.Title>{site.name}</Card.Title>
                                                <Card.Text>{site.description}</Card.Text>
                                                <Button href={"/site/"+site._id} variant="primary">Go somewhere</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            }
                    </Row>
                    <Row xs="2" style={{paddingTop:"10px"}}></Row>
                </Container>
            </>
        );
    } 
}