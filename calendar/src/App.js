import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import Calendar from "./containers/Calendar/Calendar";
import NavBar from "./components/NavBar/NavBar";
import Add from "./containers/Add/Add";

class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Calendar} />
                    <Route path="/add" component={Add} />
                </Switch>
            </div>
        );
    }
}

export default App;
