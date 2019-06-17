import React from "react";
import NavBar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export const Home = () => (

  <NavBar bg="dark" variant="dark">
      <NavBar.Brand as={Link} to="/">Moodify</NavBar.Brand>
      <Nav className="mr-auto">
          <Nav.Item>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav.Item>
      </Nav>
      <Nav>
          <Nav.Item>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav.Item>
      </Nav>
  </NavBar>
);