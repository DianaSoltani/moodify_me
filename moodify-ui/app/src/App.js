import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios";

class App extends Component
{
    state = {
        promiseResolved: null,
        authenticated: false
    };
    isAuthenticated()
    {
        return axios.get("/home")
            .then(response => {return true;})
            .catch(error =>
            {
                console.log(error);
                return false;
            });
    }

    componentDidMount()
    {
        this.isAuthenticated().then(authenticated => {
            this.authenticate(authenticated)
        })
    }

    authenticate = (authenticated) => {
        this.setState({promiseResolved: true, authenticated: authenticated})
    };

    render()
    {
        return (
            <React.Fragment>
                <Router>
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
                    <Route exact path="/" render={() => (
                        this.state.promiseResolved === null ? null : (this.state.authenticated ? (<Home/>) : (<Redirect to="/login"/>))
                    )}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" render={props => (
                        <Login {...props} authenticate={() => this.authenticate(true)}/>
                    )}/>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
