import React, {Component} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

class Login extends Component
{
    state = {
        username: "",
        password: "",
        valid: true
    };

    onChange = event =>
    {
        this.setState({[event.target.id]: event.target.value, valid: true})
    };

    onSubmit = event =>
    {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        this.login(user).then(response =>
        {
            if (response.status === 200)
            {
                this.props.authenticate();
                this.props.history.push("/");
            }
            else
            {
                this.setState({
                    username: this.state.username,
                    password: "",
                    valid: false
                });
            }
        });
    };

    login = user =>
    {
        return axios
            .post("/login", {
                username: user.username,
                password: user.password
            })
            .then(response =>
            {
                return response;
            })
            .catch(error =>
            {
                console.log(error);
                return error.response;
            })
    };

    render()
    {
        return (
            <div className="min-vh-100 d-flex justify-content-center align-items-center">
                <Form onSubmit={this.onSubmit}>
                    {!this.state.valid && <Alert variant="danger">Invalid username/password entered</Alert>}
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required isInvalid={!this.state.valid} type="text"
                                      placeholder="Enter your username" value={this.state.username}
                                      onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required isInvalid={!this.state.valid} type="password" placeholder="Enter your password"
                                      value={this.state.password} onChange={this.onChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                    <Link className="d-inline-flex m-1" to="/register">Don't have an account? Register here</Link>
                </Form>
            </div>
        );
    }
}

export default Login