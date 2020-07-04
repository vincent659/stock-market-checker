import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import styled from 'styled-components';

const Styles = styled.div`
    .navbar{
        background-color: #222
    }

    .navbar-brand, .navbar-nav .nav-link{
        color: #bbb;

        &:hover{
            color: white;
        }
    }`;
    
/* Navigation Bar */
export const Navigation = () => {
    return (
        <Styles>
            <Navbar bg="dark" variant="dark"> 
                <Navbar.Brand><span className="h2 mx-auto">Stock Tracker</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto mt-2">
                        <Nav.Item><Nav.Link href="/">HOME</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/stock">SEARCH</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>  
            </Navbar>
        </Styles>

    );
};
