import { useState } from 'react';
import { Container, FloatingLabel, Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const [regiterEnabled, setRegiterEnabled] = useState(false);

    const handleUsername = (event) => {
        setUsername(event.target.value);

        if (username.length < 5) {
            setRegiterEnabled(false);
        } else {
            setRegiterEnabled(true);
        }
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
        if (username.length < 5) {
            setRegiterEnabled(false);
        } else {
            setRegiterEnabled(true);
        }
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (email !== "" && regex.test(email)) {
            setRegiterEnabled(true);
        } else {
            setRegiterEnabled(false);
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        const data = {
            'username': username,
            'password': password,
            'email': email,
        };

        try {
            const response = await axios.post("http://localhost:9000/auth/register", data);
            navigate("/login");
            setError("")
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const navigateToLogin = () => {
        navigate('/login');
    };


    return (
        <>
            <Container >
                <div className='register-box shadow sm rounded '>
                    <div className='text-center'>
                        <h1 style={{ color: 'white' }}>User Register</h1>
                    </div>
                    <Form onSubmit={handleRegister} >
                        <Form.Group className="mb-3" controlId="username" label="Select a Username" style={{ color: 'white' }}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter username" value={username} onChange={handleUsername} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password" label="Select a Password" style={{ color: 'white' }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email" label="Enter your Email Address" style={{ color: 'white' }}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail} />
                        </Form.Group>
                        {error &&
                            <div className='text-danger mb-3'>
                                {error}
                            </div>
                        }

                        <div className='text-end'>
                            <Button variant="light" type="submit" disabled={!regiterEnabled}>
                                Register
                            </Button>
                        </div>

                        <div style={{ color: 'white' }}> I'm already a member! 
                            <div></div>
                            <Button variant="light" onClick={navigateToLogin} >
                                Login
                            </Button>
                        </div>

                    </Form>

                    <div className='py-4'>
                        <text  style={{ color: 'white' }}>
                            <b>
                                Create an Account and start exploring the world of books today!
                            </b>
                        </text>
                    </div>

                    <ListGroup >
                        <ListGroup.Item><h3>Contact</h3></ListGroup.Item>
                        <ListGroup.Item>Email : chnonlinebookstore@gmail.com</ListGroup.Item>
                        <ListGroup.Item>Contact : 1-800-123-4567</ListGroup.Item>
                    </ListGroup>

                </div>

            </Container>
        </>
    )
}

export default Register;