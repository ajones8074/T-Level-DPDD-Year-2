import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Tabs,
    Tab,
    Table,
    Button
} from 'react-bootstrap'
import axios from 'axios';
import Cookies from 'js-cookie'
import Basket from "./basket";

export default function OrderingTable(){
    const [drinks, setDrinks] = useState([]);
    const [foods, setFoods] = useState([]);
    const [update, setUpdate] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false)
    const [basket, setBasket] = useState([])


    useEffect(() => {
        axios
        .get("http://localhost:3000/products/drinks")
        .then((res) => {
            setDrinks(res.data)
        })
        .catch((err) => console.log(err))
        var user = Cookies.get("user")
        axios
        .get("http://localhost:3000/basket/?user="+user)
        .then((res) =>{
            setBasket(res.data)
            setIsLoaded(true);
            console.log(res.data.items)
        })
        .catch((err) => {
            console.log(err)
            setBasket({})
            setIsLoaded(false);
        })
    },[]);

    const AddToBasket = (event) => {
        var userid = Cookies.get("user");
        var item = event.currentTarget.parentNode.parentNode.id
        console.log(item)
        axios
        .post("http://localhost:3000/basket/item",{
            item:item,user:userid
        }).then((res) => {
            console.log(res.data)
        }).then(() =>{
            axios
            .get("http://localhost:3000/basket/?user="+userid)
            .then((res) =>{
                setBasket(res.data)
                setIsLoaded(true);
                console.log(res.data.items)
            })
            .catch((err) => console.log(err))
        })

        
    }

    useEffect(() => {
        axios
        .get("http://localhost:3000/products/food")
        .then((res) => {
            setFoods(res.data)
        })
        .catch((err) => console.log(err))
    },[]);

    return (
        <Tabs
            id="products-tab"
            className="mb-3"
        >
            <Tab eventKey="drinks" title="Drinks">
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
                                <tr id={drink._id} key={drink._id}>
                                    <td><img src={drink.image} style={{width:"100px"}} /></td>
                                    <td>{drink.name}</td>
                                    <td>£{drink.price.toFixed(2)}</td>
                                    <td><Button id={drink.id} onClick={AddToBasket}>Add to Basket</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Basket basketData={basket} isLoaded={isLoaded} key={update}/>
            </Tab>
            <Tab eventKey="food" title="Food">
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
                            foods.map(food => (
                                <tr id={food._id} key={food._id}>
                                    <td><img src={food.image} style={{width:"100px"}} /></td>
                                    <td>{food.name}</td>
                                    <td>£{food.price.toFixed(2)}</td>
                                    <td><Button onClick={AddToBasket}>Add to Basket</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Basket basketData={basket} isLoaded={isLoaded} key={update}/>
            </Tab>
        </Tabs>
    );
}