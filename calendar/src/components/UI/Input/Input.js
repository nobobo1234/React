import React from "react";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/Menu/MenuItem";
import { withStyles } from "material-ui/styles";
import { TimePicker, DatePicker } from "material-ui-pickers";

const styles = {
    input: {
        width: "300px",
        margin: "5px"
    }
};

const input = props => {
    const { classes } = props;
    let inputElement = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        props.elementConfig.error = true;
    } else {
        props.elementConfig.error = false;
    }

    switch (props.type) {
        case "input":
            inputElement = (
                <TextField
                    className={classes.input}
                    margin="normal"
                    onChange={props.changed}
                    value={props.value}
                    {...props.elementConfig}
                />
            );
            break;
        case "select":
            inputElement = (
                <TextField
                    className={classes.input}
                    margin="normal"
                    select
                    onChange={props.changed}
                    value={props.value}
                    {...props.elementConfig}>
                    {props.elementConfig.options.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            );
            break;
        case "textarea":
            inputElement = (
                <TextField
                    className={classes.input}
                    margin="normal"
                    multiline
                    value={props.value}
                    onChange={props.changed}
                    {...props.elementConfig}
                />
            );
            break;
        case "timepicker":
            inputElement = (
                <div>
                    <TimePicker
                        className={classes.input}
                        ampm={false}
                        showTodayButton
                        todayLabel="now"
                        onChange={props.changed}
                        value={props.value}
                        {...props.elementConfig}
                    />
                </div>
            );
            break;
        case "datepicker":
            inputElement = (
                <DatePicker
                    className={classes.input}
                    label={props.label}
                    showTodayButton
                    value={props.value}
                    onChange={props.changed}
                    animateYearScrolling={false}
                    {...props.elementConfig}
                />
            );
            break;
        default:
            inputElement = (
                <TextField
                    className={classes.input}
                    margin="normal"
                    onChange={props.changed}
                    value={props.value}
                    {...props.elementConfig}
                />
            );
            break;
    }
    return <div>{inputElement}</div>;
};

export default withStyles(styles)(input);
