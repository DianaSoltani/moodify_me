import React, {Component} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class Register extends Component
{
    state = {
        username: "",
        password: "",
        valid: true
    };

    onChange = event => {
        this.setState({ [event.target.id]: event.target.value, valid: true })
    };

    onSubmit = event => {
      event.preventDefault();
      const newUser = {
          username: this.state.username,
          password: this.state.password
      };
      this.register(newUser).then(response =>
      {
          if (response.status === 200)
              //TODO: see if the redirection can be done with a delay
            this.props.history.push(`/login`);
          else
          {
              //TODO: explicit check to see if error status is 409 or 500
              this.setState({
                  username: this.state.username,
                  password: "",
                  valid: false
              });

          }
      });
    };

    register = user => {
    return axios
        .post("/register", {
            username: user.username,
            password: user.password
        })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            console.log(error);
            return error.response;
        })
    };

    render()
    {
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
                </Form>
            </div>
        );
    }
}


export default Register