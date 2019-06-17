import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Home} from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";


class App extends Component
{
    render()
    {
        return (
            <React.Fragment>
                <Router>
                    <Home />
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
