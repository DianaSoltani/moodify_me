import React, {Component} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Link, Redirect} from "react-router-dom";

class Register extends Component
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

    // TODO: perform checks to make sure that username can't have spaces and capitalization
    onSubmit = event =>
    {
        event.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password
        };
        this.register(newUser).then(response =>
        {
            if (response.status === 200)
                setTimeout(() => this.props.history.push(`/login`), 1000);
            else
            {
                // TODO: explicit check to see if error status is 409 or 500
                this.setState({
                    username: this.state.username,
                    password: "",
                    valid: false
                });
            }
        });
    };

    register = user =>
    {
        return axios
            .post("/register", {
                username: user.username,
                password: user.password
            })
            .then(response =>
            {
                this.setState({"username": response.data.username});
                return response;
            })
            .catch(error =>
            {
                return error.response;
            })
    };

    render()
    {
        if (this.props.isAuthenticated)
            return <Redirect to="/"/>;
        return (
            <div className="min-vh-100 d-flex justify-content-center align-items-center">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required isInvalid={!this.state.valid} type="text"
                                      placeholder="Enter your username" value={this.state.username}
                                      onChange={this.onChange}/>
                        {!this.state.valid && (
                            <FormControl.Feedback type="invalid">Username already exists</FormControl.Feedback>)}
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Enter your password"
                                      value={this.state.password} onChange={this.onChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Register</Button>
                    <Link className="d-inline-flex m-1" to="/login">Already have an account? Login Here</Link>
                </Form>
            </div>
        );
    }
}


export default Register