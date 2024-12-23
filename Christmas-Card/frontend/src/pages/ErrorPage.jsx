import React from "react";
import { Link } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import Lottie from 'react-lottie';
import animationData from '../assets/animation_error.json';

function ErrorPage() {
    const defaultOptions = { 
        loop: true, 
        autoplay: true, 
        animationData: animationData, 
        rendererSettings: { 
            preserveAspectRatio: 'xMidYMid slice' 
        } 
    };

    return ( 
        <Container>
            <Card style={{ width: '', margin: '', textAlign: 'center' }}> 
                <Lottie options={defaultOptions} height={200} width={200} /> 
                <Card.Body> 
                    <Card.Title>Oops! Page Not Found</Card.Title> 
                    <Card.Text> 
                        The page you are looking for doesn't exist or an error occurred
                    </Card.Text> 
                    <Link to="/">
                        <Button style={{marginTop: '10px'}} variant="primary">Home</Button>
                    </Link> 
                </Card.Body> 
            </Card> 
        </Container>
        
    );
}

export default ErrorPage;