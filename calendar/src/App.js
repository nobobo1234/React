import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import Calendar from "./containers/Calendar/Calendar";
import NavBar from "./components/NavBar/NavBar";
import Add from "./containers/Add/Add";
import Auth from "./containers/Auth/Auth";

class App extends Component {
    state = {
        auth: {
            userId: "",
            token: ""
        }
    };

    setAuthState = (userId, token) => {
        this.setState({ userId, token });
    };

    render() {
        return (
            <div>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Calendar} auth={this.state.auth} />
                    <Route path="/add" component={Add} auth={this.state.auth} />
                    <Route
                        path="/auth"
                        component={Auth}
                        auth={this.state.auth}
                        authaction={this.setAuthState}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
