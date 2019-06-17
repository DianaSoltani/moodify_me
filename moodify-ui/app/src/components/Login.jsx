import React, {Component} from "react";
import axios from "axios";

class Login extends Component
{
    state = {
      username: "",
      password: ""
    };
    render()
    {
        return <h1>LOGIN</h1>;
    }
}

export default Login