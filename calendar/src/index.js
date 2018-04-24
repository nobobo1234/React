import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import MomentUtils from "material-ui-pickers/utils/moment-utils";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const app = (
    <BrowserRouter>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <App />
        </MuiPickersUtilsProvider>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
