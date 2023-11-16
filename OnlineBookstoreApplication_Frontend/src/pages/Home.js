import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";  //link set kranda routes walata
import { getItems } from "../services/itemService";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Form, Table } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { createOrder } from "../services/OrderService";
import { getCategories, getCategoryItems, } from "../services/CategoryService";
import Card from 'react-bootstrap/Card';
import { Navigate, useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';

const Home = () => {

    const storedId = sessionStorage.getItem("user_id");


    const [items, setItems] = useState(null);
    const [categories, setCategories] = useState(null);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(null);
    const [categoryItems, setCategoryItems] = useState(null);

    // const [users, setUsers] = useState(null);
    //const [selectedUser, setSelectedUser] = useState(null);
   

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    


    useEffect(() => {
        const fetchItems = async () => {
            const response = await getItems();
            setItems(response);
        }

        /*const fetchUsers = async()=>{
            const response = await getUsers();
            setUsers(response);
        }*/
        fetchItems();
        //fetchUsers();
        const fetchCategories = async () => {
            const response2 = await getCategories();
            setCategories(response2);
        }

        fetchCategories();


    }, []);

    const handleOrder = ((item) => {
        const updateOrder = [...order, item]     // in here order adding here as a array ---> [object1,object2,..,item]
        //final item object is also adding to this array
        const updatedTotal = total + item.price;
        setOrder(updateOrder);
        setTotal(updatedTotal);
    });

    /* const handleUser = ((event)=>{
         setSelectedUser(event.target.value);
     })


    const handleConfirm = () => {
        window.location.reload();
    };*/


    const handleConfirm = async (event) => {
        event.preventDefault();

        const data = {
            id: 45,
            user: { id:storedId
            },
            items: order
        }
        const response = await createOrder(data);
        console.log(data);
        if (response) {
            handleClose();
            setOrder([]);
            setTotal(null);
        }
    };

    const closeorderitem = (index,item) => {
        const updatedOrder = [...order];
        updatedOrder.splice(index, 1);
        setOrder(updatedOrder); 
        const updatedTotal = total - item.price;
        setTotal(updatedTotal);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className="cont-1-home">
                <h1 className="category-name">Novels</h1>
                <Row>
                    {items && items.map(item => {             //front pr\src\images\books\novels\1.jpg
                        if (item.category.id == 1) {
                            return (
                                <Col className="mb-5">
                                    <Card className="card" >
                                        <Card.Img variant="top" src={item.image + "/100px180"} />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>By {item.author}</Card.Text>
                                            <Card.Text>Rs. {item.price}</Card.Text>
                                            <Button variant="primary" onClick={() => {
                                                handleOrder(item)
                                            }}>Add to cart</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    })}
                </Row>

                <h1 className="category-name">Short-Story</h1>
                <Row>
                    {items && items.map(item => {
                        if (item.category.id == 2) {
                            return (
                                <Col className="mb-5 ">
                                    <Card className="card">
                                        <Card.Img variant="top" src={item.image + "/100px180"} />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>By {item.author}</Card.Text>
                                            <Card.Text>Rs. {item.price}</Card.Text>
                                            <Button variant="primary" onClick={() => {
                                                handleOrder(item)
                                            }}>Add to cart</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    })}
                </Row>

                <h1 className="category-name">Romance</h1>
                <Row>
                    {items && items.map(item => {
                        if (item.category.id == 3) {
                            return (
                                <Col className="mb-5 ">
                                    <Card className="card">
                                        <Card.Img variant="top" src={item.image + "/100px180"} />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>By {item.author}</Card.Text>
                                            <Card.Text>Rs. {item.price}</Card.Text>
                                            <Button variant="primary" onClick={() => {
                                                handleOrder(item)
                                            }}>Add to cart</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    })}
                </Row>

                <h1 className="category-name">Children's Books</h1>
                <Row>
                    {items && items.map(item => {
                        if (item.category.id == 9) {
                            return (
                                <Col className="mb-5 ">
                                    <Card className="card">
                                        <Card.Img variant="top" src={item.image + "/100px180"} />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>By {item.author}</Card.Text>
                                            <Card.Text>Rs. {item.price}</Card.Text>
                                            <Button variant="primary" onClick={() => {
                                                handleOrder(item)
                                            }}>Add to cart</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    })}
                </Row>

                <h1 className="category-name">Literature</h1>
                <Row>
                    {items && items.map(item => {
                        if (item.category.id == 10) {
                            return (
                                <Col className="mb-5 ">
                                    <Card className="card">
                                        <Card.Img variant="top" src={item.image + "/100px180"} />
                                        <Card.Body >
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>By {item.author}</Card.Text>
                                            <Card.Text>Rs. {item.price}</Card.Text>
                                            <Button variant="primary" onClick={() => {
                                                handleOrder(item)
                                            }}>Add to cart</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    })}
                </Row>

                <h1 className="category-name">Educational</h1>
                <Row>
                    {items && items.map(item => {
                        if (item.category.id == 11) {
                            return (
                                <Col className="mb-5 ">
                                    <Card className="card">
                                        <Card.Img variant="top" src={item.image + "/100px180"} />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>By {item.author}</Card.Text>
                                            <Card.Text>Rs. {item.price}</Card.Text>
                                            <Button variant="primary" onClick={() => {
                                                handleOrder(item)
                                            }}>Add to cart</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    })}
                </Row>


            </div>

            <div className="cont-2-home" >
                <div className="sticky-div" >
                    <h3 className="cart-name">Cart</h3>
                    <Table className="table" >
                        <thead>
                            <tr>
                                <th className="first-column">Book ID</th>
                                <th className="midle-column ">Book Name</th>
                                <th className="last-column text-center">Item Price</th>

                            </tr>
                        </thead>
                        <tbody>
                            {order && order.map((item,index) => {
                                return (
                                    <tr key={item.id}>
                                        <td >{item.id}</td>
                                        <td>{item.name}</td>
                                        <td className="text-end"> Rs. {item.price}</td>
                                        <td><CloseButton className='cl-btn bg-dark p-2' data-bs-theme="white"  onClick={() => closeorderitem(index,item)}></CloseButton></td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th colSpan={2}>Total</th>
                                <th className="text-end">Rs. {total}</th>
                            </tr>
                        </tbody>
                    </Table>

                    <div class="position-absolute top-10 end-0">
                        <Button varient="primary" onClick={handleShow}>Complete Order</Button>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Complete Order</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Please confirm if you are wish to proceed.</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default Home;