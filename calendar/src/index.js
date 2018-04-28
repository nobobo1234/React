import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import addReducer from "./store/reducers/add";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const store = createStore(addReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider>
    <BrowserRouter>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <App />
        </MuiPickersUtilsProvider>
    </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
