import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Form
} from 'react-bootstrap';
import PageNavbar from "../components/navbar";
import axios from "axios";

export default function Staff(){
    const [loaded, setLoaded] = useState(true);
    const [sites, setSites] = useState([]);
    const [sitesLoaded, setSitesLoaded] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:3000/sites/')
        .then((res) => {
            setSites(res.data);
            console.log(res.data)
            setSitesLoaded(true);
        })
    },[])

    useEffect(() => {
        if(sitesLoaded)
        {
            axios
            .get('http://localhost:3000/orders/site/'+sites[0]._id)
            .then((res) => {
                setOrders(res.data);
                setLoaded(true)
            })
        }
    },[sitesLoaded])

    const handleChange = (event) => {
        var selectedIndex = event.target.selectedIndex;
        axios
        .get('http://localhost:3000/orders/site/'+sites[selectedIndex]._id)
        .then((res) => {
            setOrders(res.data)
        })
    }

    if(loaded){
        return(
            <>
                <PageNavbar/>
                <Container fluid>
                    <Row>
                        <Col xs={3}></Col>
                        <Col xs={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Orders</Card.Title>
                                    <Form.Group>
                                        <Form.Label>Select Site</Form.Label>
                                        <Form.Select onChange={handleChange}>
                                            {
                                                sites.map(site => (
                                                    <option key={site._id}>{site.name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                        {
                                            orders.map(order => (
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Title>
                                                            Order ID: {order.id}
                                                        </Card.Title>
                                                        <Table striped>
                                                            <thead>
                                                                <tr>
                                                                    <th>Image</th>
                                                                    <th>Item</th>
                                                                    <th>Quantity</th>
                                                                    <th>Price</th>
                                                                    <th>Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    order.items.map(item => (
                                                                        <tr>
                                                                            <td><img src={item.image} style={{width:"100px"}}></img></td>
                                                                            <td>{item.name}</td>
                                                                            <td>{item.quantity}</td>
                                                                            <td>£{item.price.toFixed(2)}</td>
                                                                            <td>£{(item.quantity * item.price).toFixed(2)}</td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                        </Table>
                                                        Order Total: £{order.total.toFixed(2)}<br/>
                                                        Ordered At: {new Date(order.timestamp).toLocaleString('UK')}
                                                    </Card.Body>
                                                </Card>
                                            ))
                                        }
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3}></Col>
                    </Row>
                </Container>
            </>
        );
    }
}