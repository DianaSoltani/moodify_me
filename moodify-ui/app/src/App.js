import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import {Logout} from "./components/Logout";
import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import io from "socket.io-client";

class App extends Component
{
    state = {
        promiseResolved: undefined,
        authenticated: false,
        username: "",
        socket: undefined
    };

    isAuthenticated()
    {
        return axios.get("/home")
            .then(response => response.data.username)
            .catch(error => "");
    }

    async componentDidMount()
    {
        const username = await this.isAuthenticated();
        this.authenticate(username !== "", username);
    }

    authenticate = (authenticated, username = this.state.username) =>
    {
        this.setState({
            promiseResolved: true,
            authenticated: authenticated,
            username: username,
            socket: this.state.socket === undefined ? (authenticated ? this.createSocket() : undefined) : this.state.socket
        });
    };

    renderAuthNav()
    {
        if (!this.state.promiseResolved || !this.state.authenticated)
            return (
                <Nav>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav.Item>
                </Nav>);
        else
            return (
                <Nav>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            );
    }

    createSocket()
    {
        if (process.env.NODE_ENV === "production")
            return io(process.env.REACT_APP_API_URL);
        return io();
    }

    renderLandingPage()
    {
        if (this.state.promiseResolved === undefined)
            return undefined;
        else if (this.state.authenticated)
            return <Home socket={this.state.socket} username={this.state.username}/>;
        else
            return <Redirect to="/login"/>;
    }

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
                        {this.renderAuthNav()}
                    </NavBar>
                    <Route exact path="/" render={() => this.renderLandingPage()}/>
                    <Route exact path="/register" render={props => (
                        <Register {...props} isAuthenticated={this.state.authenticated}/>
                    )}/>
                    <Route exact path="/login" render={props => (
                        <Login {...props} isAuthenticated={this.state.authenticated}
                               handleAppAuth={username => this.authenticate(true, username)}/>
                    )}/>
                    <Route exact path="/logout" render={props => (
                        <Logout {...props} handleAppAuth={() =>
                        {
                            this.state.socket.disconnect();
                            this.authenticate(false, "");
                        }}/>
                    )}/>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
