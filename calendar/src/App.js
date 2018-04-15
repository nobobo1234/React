import React, { Component } from "react";

import Aux from "./hoc/ReactAux";
import { Route } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import NavBar from "./components/NavBar/NavBar";

class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Route path="/" component={Calendar} />
            </div>
        );
    }
}

export default App;
