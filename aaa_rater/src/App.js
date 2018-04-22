import React, { Component } from "react";
import "./App.css";
import Table from "./containers/Table/Table";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Table resizable />
            </div>
        );
    }
}

export default App;
