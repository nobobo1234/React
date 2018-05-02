import React, { Component } from "react";
import { connect } from "react-redux";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Calendar from "./containers/Calendar/Calendar";
import NavBar from "./components/NavBar/NavBar";
import Add from "./containers/Add/Add";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/";

class App extends Component {
    componentDidMount() {
        this.props.authStateUpdater();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={Calendar} />
                <Route path="/auth" component={Auth} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/" exact component={Calendar} />
                    <Route path="/add" component={Add} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/logout" component={Logout} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div>
                <NavBar isAuthenticated={this.props.isAuthenticated} />
                {routes}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authStateUpdater: () => dispatch(actions.authStateUpdater())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
