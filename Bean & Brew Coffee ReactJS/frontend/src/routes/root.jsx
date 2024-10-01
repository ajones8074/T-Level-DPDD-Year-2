import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import{
    Container,
    Row,
    Col,
    Button,
    Card
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
                <Container fluid style={{alignContent: "center"}}>
                    <Row>
                        {
                            sites.map(site =>(
                                <Col sm={4} className='text-center'>
                                    <Card style={{ width: '100%', height:"100%" }} key={site._id}>
                                        <Card.Img variant="top" src={site.image}/>
                                        <Card.Body>
                                            <Card.Title>{site.name}</Card.Title>
                                            <Card.Text>{site.description}</Card.Text>
                                            <Button variant="primary">Go somewhere</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                </Row>
            </Container>
        );
    }
    
    
}