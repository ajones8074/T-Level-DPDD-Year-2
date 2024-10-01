import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Table,
    Card,
    Button
} from 'react-bootstrap'
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { BsBagX } from "react-icons/bs";
import {useNavigate} from 'react-router-dom'

export default function Basket({basketData, isLoaded}){
    const navigate = useNavigate();

    const RemoveFromBasket = (event) => {
        var userid = Cookies.get("user");
        var item = event.currentTarget.id
        console.log(userid+'|'+item)
        axios
        .delete("http://localhost:3000/basket/item?item="+item+"&user="+userid, {
            item:item,user:userid
        }).then((res) => {
            console.log(res.data)
        })
    }

    const CreateOrder = (event) => {
        var userid = Cookies.get("user");
        var site = Cookies.get("site")
        axios
        .post('http://localhost:3000/orders',{
            site:site,userid:userid
        }).then((res) => {
            if(res.data.order!=undefined)
            {
                navigate("/order/"+res.data.order);
            }else
            {
                console.log("Order could not be created")
            }
        })
    }

    if(isLoaded)
    {
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>Basket</Card.Title>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    basketData.items.map(item=>(
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>£{item.price.toFixed(2)}</td>
                                            <td>£{(item.quantity * item.price).toFixed(2)}</td>
                                            <td><Button id={item.id} variant='danger' onClick={RemoveFromBasket}><BsBagX /></Button></td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </Table>
                        <Card.Text>
                            Total Price: £{basketData.total.toFixed(2)}
                            <Button onClick={CreateOrder} className='float-end' variant='success'>Check Out</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
                
            </>
        )
    }else{
        <>
                <Card>
                    <Card.Body>
                        <Card.Title>Basket</Card.Title>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                
            </>
    }
}