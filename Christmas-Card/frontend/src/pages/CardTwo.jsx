import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import Lottie from 'react-lottie';
import animationData from '../assets/animation_santa.json';
import '../styles/ChristmasCard.css'
import axios from "axios";

function CardTwo() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessage = async () => { 
            try { 
                const response = await axios.get('http://localhost:3001/'); 
                setMessage(response.data); 
            } catch (error) { 
                console.error('Error fetching message:', error); 
                setMessage('Failed to load message.'); 
            } }; 
            fetchMessage(); 
        }, []);

    return ( 
        <Container className="card-container">
            <Card className="christmas-card"> 
                <Card.Body> 
                    <Card.Title className="cedarville-cursive-regular-title">Merry Christmas & Happy New Year!</Card.Title> 
                    <Card.Text className="cedarville-cursive-regular">
                        {message}
                    </Card.Text>
                    <Link to="/">
                        <Button className="card-button">Close</Button>
                    </Link>  
                </Card.Body> 
            </Card> 
        </Container>
        
    );
}

export default CardTwo;