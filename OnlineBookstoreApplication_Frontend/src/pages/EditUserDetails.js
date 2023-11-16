import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { updateUser } from '../services/UserService';
import axios from 'axios';

const EditUserDetails = () => {

    const storedId = sessionStorage.getItem("user_id");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const [successMessage, setSuccessMessage] = useState(null);

    const navigate = useNavigate();

    const [regiterEnabled, setRegiterEnabled] = useState(false);

    const goBack = () => {
        navigate("/useracc")
    };

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
            console.log(data);
            const response = await axios.put("http://localhost:9000/auth/update/" + storedId, data);
            if (response.status === 200) {

                sessionStorage.setItem('username', username);
                sessionStorage.setItem('email', email);

                setError("");
                window.location.reload();

                setSuccessMessage("Successfully updated");
            }


        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <div className="div-help">
            <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1 >Update Account Details</h1>
                <div>
                    <Button variant="primary" type="submit" onClick={goBack}>
                        Go back
                    </Button>
                </div>
            </Container>

            <div>
                <Form onSubmit={handleRegister} className='UserUpdateForm'>
                    <Form.Group className="mb-4" controlId="formGridAddress2">
                        <Form.Label className='user-edit-label'>Username</Form.Label>
                        <Form.Control className='form-control-edit' placeholder="Enter new username" value={username} onChange={(handleUsername)} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formGridAddress1">
                        <Form.Label className='user-edit-label'>Password</Form.Label>
                        <Form.Control className='form-control-edit' placeholder="Enter new password" value={password} onChange={(handlePassword)} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formGridAddress2">
                        <Form.Label className='user-edit-label'>Email</Form.Label>
                        <Form.Control className='form-control-edit' placeholder="Enter new email" value={email} onChange={(handleEmail)} />
                    </Form.Group>
                    {error &&
                        <div className='text-danger mb-3'>
                            {error}
                        </div>
                    }
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" disabled={!regiterEnabled}>
                            Submit
                        </Button >
                    </div>

                    {successMessage && (
                        <div className="text-success mb-3">
                            {successMessage}
                        </div>
                    )}

                </Form>

            </div>
        </div>
    )
}

export default EditUserDetails;