import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Header = () => {
    const logout = () => {
        localStorage.clear()
        window.location.pathname = "/"
    }
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Task Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               
                <Nav className="ms-auto">
                    {/* <!-- Search Box --> */}
                    <div className="input-group search-box">
                        <input type="text" className="form-control " placeholder="Search tasks..." />
                        <button className="btn btn-outline-secondary" type="button"><i className="bi bi-search"></i></button>
                    </div>

                    <Button variant="outline-danger" onClick={logout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;