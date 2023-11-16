import ListGroup from 'react-bootstrap/ListGroup';
import { getUsersById } from '../services/UserService';
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const UserAcc = () => {
    const storedId = sessionStorage.getItem("user_id");

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (storedId) {
                try {
                    const response = await getUsersById(storedId);
                    setUser(response);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(null); // Set user to null to indicate an error
                }
            }
        }

        fetchUsers();
    }, [storedId]);

    const userDetailsUpdate = () => {
        navigate('/edituser');
    };

    return (
        <div className="div-help">
            <h1 className='acc-page-head'>Account Details</h1>
            <div className='acc-page'>
                {user ? (
                    <div>
                        <ListGroup className='acc-detail-list'>
                            <ListGroup.Item className='py-3 mb-4'>
                                User ID <span style={{ marginLeft: '45px' }}>: {user.id}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className='py-3 mb-4'>
                                Username <span style={{ marginLeft: '20px' }}>: {user.username}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className='py-3 mb-4'>
                                Email <span style={{ marginLeft: '60px' }}>: {user.email}</span>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                ) : (
                    <p>User not found or loading...</p>
                )}
                <div className='d-flex justify-content-end'>
                    <Button className='btn-acc' onClick={userDetailsUpdate}>Edit Account Details
                    </Button>
                </div>
            </div>    
        </div>
    )
}

export default UserAcc;