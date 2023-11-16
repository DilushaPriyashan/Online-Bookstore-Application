import { useState } from 'react';
import { Container, FloatingLabel, Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const Login = () => {

    const [username, setUsername] = useState("");
    const [logname, setLogname] = useState("verv");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            'username': username,
            'password': password,
        };
        try {
            const response = await axios.post("http://localhost:9000/auth/login", data);

            navigate("/home");
            setLogname(username);
            setError("");
            setUsername("");
            setPassword("")

            sessionStorage.setItem('token', response.data.token);              // store token data in browser
            sessionStorage.setItem('username', response.data.username);
            sessionStorage.setItem('user_id', response.data.id);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        } catch (error) {
            setError("Username or password invalid");
        }

    }

    const navigateToRegister = () => {
        navigate('/');
    };

    return (
        <div className='login-panel'>
                <div className='login-box shadow  rounded'>
                    <div className='text-center'>
                        <h1 style={{ color: 'white' }} className='login-head'>User Login</h1>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username" label="Select a Username" style={{ color: 'white' }}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter username" value={username} onChange={handleUsername} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password" label="Select a Username" style={{ color: 'white' }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        </Form.Group>
                        {error &&
                            <div className='text-danger mb-3'>
                                {error}
                            </div>
                        }

                        <div className='text-end'>
                            <Button variant="light" type="submit" >
                                Login
                            </Button>
                        </div>
                        <div style={{ color: 'white' }}> Create a new account!
                            <div></div>
                            <Button variant="light" onClick={navigateToRegister} >
                                Register
                            </Button>
                        </div>
                    </Form>

                    <ListGroup className='py-5' >
                        <ListGroup.Item><h3>Contact</h3></ListGroup.Item>
                        <ListGroup.Item>Email : chnonlinebookstore@gmail.com</ListGroup.Item>
                        <ListGroup.Item>Contact : 1-800-123-4567</ListGroup.Item>
                    </ListGroup>

                </div>
        </div>
    )
}

export default Login;