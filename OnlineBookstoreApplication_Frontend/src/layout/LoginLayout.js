import { Outlet } from "react-router-dom";         //layout is cerated for get common backgroud effects for several pages
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import myImage from '../images/cover.jpg';


const LoginLayout = () => {
    return (
        <div>
            <div style={{ display: 'flex', height: '100vh' }}>
                <div style={{ width: '66.66%' }} className="cont-1">

                    <div>
                        <img className="login-image" src={myImage} alt="My Image" style={{ width: '116%', height: '100%' }} />
                    </div>

                </div>
                <div style={{ width: '33.33%' }} className="cont-2">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default LoginLayout;
//className="bg-body-tertiary py-3"