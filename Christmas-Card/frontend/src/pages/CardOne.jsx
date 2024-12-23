import React from "react";
import { Link } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import Lottie from 'react-lottie';
import animationData from '../assets/animation_santa.json';
import '../styles/ChristmasCard.css'

function CardOne() {
    const defaultOptions = { 
        loop: true, 
        autoplay: true, 
        animationData: animationData, 
        rendererSettings: { 
            preserveAspectRatio: 'xMidYMid slice' 
        } 
    };

    return ( 
        <Container className="card-container">
            <Card className="christmas-card"> 
                <Lottie options={defaultOptions} height={300} width={300} /> 
                <Card.Body> 
                    <Card.Title className="cedarville-cursive-regular-title">Merry Christmas & Happy New Year!</Card.Title> 
                    <Link to="/1">
                        <Button className="card-button">Open</Button>
                    </Link>  
                </Card.Body> 
            </Card> 
        </Container>
        
    );
}

export default CardOne;