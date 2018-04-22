import React from "react";
import TextField from "material-ui/TextField";

const input = props => {
    let inputElement = null;
    switch (props.type) {
        case "input":
            inputElement = <TextField />;
    }
};
