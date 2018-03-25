import React, { Component } from "react";

import Calendar from "./components/Calendar/Calendar";
import Aux from "./hoc/ReactAux";
import moment from "moment";

class App extends Component {
    state = {
        events: {}
    };

    render() {
        let fileheaders = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        return (
            <Aux>
                <Calendar fileheaders={fileheaders} upload={this.handleDate} />
            </Aux>
        );
    }
}

export default App;
