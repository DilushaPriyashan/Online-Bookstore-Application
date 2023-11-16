import { Outlet } from "react-router-dom";         //link tika common karala ewagen enda oni ewa outlet eken gannawa
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Layout2 = () => {
    const storedUsername = sessionStorage.getItem('username');
    return (
        <div>
            <div >
                <Navbar bg="dark" data-bs-theme="dark" fixed="top" >
                    <Container >
                        <Navbar.Brand >cHN Online Books</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" >
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/help">Help</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as:
                                <NavDropdown title={storedUsername} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/useracc">Your Account</NavDropdown.Item>
                                    <NavDropdown.Item href="/help">Help</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/login">
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>

                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <div>
                <Outlet />
            </div>

            <div className="footer">
                <footer className="p-3 bg-dark text-white fixed-bottom">
                    <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>Email : chnonlinebookstore@gmail.com</div>
                        <div>Hotline : 1-800-123-4567</div>

                    </Container>

                </footer>

            </div>

        </div>

    )
}
export default Layout2;
//className="bg-body-tertiary py-3"