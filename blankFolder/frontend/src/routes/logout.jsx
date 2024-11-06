import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from "react";

export default function Logout(){
    var navigate = useNavigate();

    useEffect(() => {
        Cookies.remove('token');
        Cookies.remove('site');

        navigate('/login');
    })
}