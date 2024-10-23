import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    Card, 
    Col,
    Container, 
    Row, 
    Table
} from 'react-bootstrap';
import { useParams } from "react-router-dom";
import PageNavbar from '../components/navbar';
import Cookies from 'js-cookie';
import axios from "axios";

export default function Order(){
    const [order, setOrder] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);
    let {orderid} = useParams();

    useEffect(() => {
        var userid = Cookies.get('token')
        axios
        .get('http://127.0.0.1:3000/orders/'+orderid)
        .then((res) => {
            setOrder(res.data);
            setisLoaded(true);
        }).catch((error) => console.log(error))
    },[])

    if(isLoaded)
    {
        return(
            <>
                <PageNavbar/>
                <Container fluid>
                    <Row>
                        <Col xs='3'>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Order created at {order.site} store</Card.Title>
                                    <Card.Text>Order placed at {new Date(order.timestamp).toLocaleString("en-GB")}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col> 
                        <Col xs='9'>
                            <Card>
                                <Card.Body>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        {
                                            order.items.map(item => (
                                                <tr key={item._id}>
                                                    <td><img src={item.image} style={{width: '100px'}}/></td>
                                                    <td>{item.name}</td>
                                                    <td>£{(item.price).toFixed(2)}</td>
                                                </tr>
                                            ))
                                        }
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}