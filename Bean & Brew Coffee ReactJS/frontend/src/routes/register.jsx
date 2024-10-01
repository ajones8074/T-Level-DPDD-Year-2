import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Form
} from 'react-bootstrap'
import axios from "axios";

export default function Register(){
    return (
            <Form>
                <label>First Name: 
                    <input type="text" />
                </label>
                <label>Last Name: 
                    <input type="text" />
                </label>
                <label>Email: 
                    <input type="email" />
                </label>
                <label>Password: 
                    <input type="password" />
                </label>
                <label>Re-enter Password:
                    <input type="password" />
                </label>
            </Form>
    )
}