import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

export const Logout = props =>
{
    axios.get("/logout").then(() =>
    {
        props.handleAppAuth();
    });
    return <Redirect to="/login"/>;
};