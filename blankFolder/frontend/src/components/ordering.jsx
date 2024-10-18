import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {
    Button,
    Tab,
    Table,
    Tabs
} from 'react-bootstrap'

export default function Ordering() {

    const [drinks, setDrinks] = useState([])

    useEffect(() =>{
        axios
        .get('http://127.0.0.1:3000/products/')
        .then((res) => {
            setDrinks(res.data)
        })
        .catch((error) => console.log(error))
    },[])
    
    return(
        <>
            <Tabs
                defaultActiveKey='drinks'
            >
                <Tab eventKey='drinks' title='Drinks'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Add to Basket</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                drinks.map(drink => (
                                    <tr>
                                        <td><img src={drink.image} style={{width: '100px'}}/></td>
                                        <td>{drink.name}</td>
                                        <td>£{(drink.price).toFixed(2)}</td>
                                        <td><Button>Add to Basket</Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey='food' title='Food'>

                </Tab>
            </Tabs>
        </>
    )
}