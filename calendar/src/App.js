import React, { Component } from "react";

import Calendar from "./components/Calendar/Calendar";
import Aux from "./hoc/ReactAux";
import moment from "moment";

class App extends Component {
    state = {
        events: {}
    };

    handleDate = data => {
        for (let item of data) {
            for (const [key, value] of Object.entries(item)) {
                if (value) {
                    let regex = /^(.+) (\d{2}:\d{2}) ?- ?(\d{2}:\d{2})$/g;
                    let testedregex = regex.exec(value);
                    let startdate = moment(
                        `${key} ${testedregex[2]}:00`,
                        "dddd HH:mm:ss"
                    );
                    console.log(startdate.toString());
                }
            }
        }
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
