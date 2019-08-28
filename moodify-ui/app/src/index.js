import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from "axios";

if (process.env.NODE_ENV === "production")
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
