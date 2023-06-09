import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Route} from "react-router-dom";


function NavbarComponent(): JSX.Element {
    return (
        <Navbar className='sticky-top ' bg="light" expand="lg" style={{height:"10vh"}}>
            <Container>
                <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/rooms">Rooms</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}

export default NavbarComponent
