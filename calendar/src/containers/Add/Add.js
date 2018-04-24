import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { Send } from "@material-ui/icons";
import Button from "material-ui/Button";
import axios from "../../axios";

import Input from "../../components/UI/Input/Input";
import formElementHelper from "../../helpers/formElementHelper";
import Spinner from "../../components/UI/Spinner/Spinner";

const styles = {
    form: {
        boxShadow: "0 2px 3px #ccc",
        padding: "10px"
    },
    submit: {
        fontSize: "20px"
    }
};

class Add extends Component {
    state = {
        addForm: {
            subject: formElementHelper(
                "input",
                {
                    type: "text",
                    label: "Subject"
                },
                true
            ),
            makeorlearn: formElementHelper(
                "select",
                {
                    options: [
                        {
                            value: "make",
                            label: "Make"
                        },
                        {
                            value: "learn",
                            label: "Learn"
                        }
                    ],
                    label: "Make or Learn?"
                },
                null,
                "learn"
            ),
            date: formElementHelper(
                "datepicker",
                {
                    label: "Day"
                },
                null,
                Date.now()
            ),
            beginTime: formElementHelper(
                "timepicker",
                {
                    label: "Begin Time"
                },
                null,
                Date.now()
            ),
            endTime: formElementHelper(
                "timepicker",
                {
                    label: "End Time"
                },
                null,
                Date.now()
            )
        },
        formIsValid: false
    };

    orderHandler = async event => {
        event.preventDefault();
        this.setState({ loading: true });
        const info = {
            subject: this.state.addForm.subject.value,
            makeorlearn: this.state.addForm.subject.makeorlearn,
            date: this.state.addForm.date.value,
            times: {
                begin: this.state.addForm.beginTime.value,
                end: this.state.addForm.endTime.value
            }
        };
        await axios.post("/events.json", info).catch(e => console.log(e));
        this.setState({ loading: false });
    };

    checkValidity(value, rules, inputIdentifier) {
        let isValid = true;

        if (!rules) return true;

        if (
            rules.required &&
            (inputIdentifier !== "beginTime" &&
                inputIdentifier !== "endTime" &&
                inputIdentifier !== "date")
        ) {
            isValid = value.trim() !== "" && isValid;
        } else if (rules.required) {
            isValid = value !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedAddForm = {
            ...this.state.addForm
        };

        const updatedFormElement = {
            ...updatedAddForm[inputIdentifier]
        };
        if (
            inputIdentifier !== "beginTime" &&
            inputIdentifier !== "endTime" &&
            inputIdentifier !== "date"
        )
            updatedFormElement.value = event.target.value;
        else updatedFormElement.value = event;
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation,
            inputIdentifier
        );
        updatedFormElement.touched = true;
        updatedAddForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedAddForm) {
            formIsValid = updatedAddForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ addForm: updatedAddForm, formIsValid });
    };

    render() {
        const { classes } = this.props;
        const formElementsArray = [];
        for (let key in this.state.addForm) {
            formElementsArray.push({
                id: key,
                config: this.state.addForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        type={formElement.config.type}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={event =>
                            this.inputChangedHandler(event, formElement.id)
                        }
                    />
                ))}
                <br />
                <Button
                    variant="raised"
                    color="primary"
                    type="submit"
                    disabled={!this.state.formIsValid}>
                    Submit &nbsp;
                    <Send />
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.form}>
                <h4>Please fill in the form:</h4>
                {form}
            </div>
        );
    }
}

export default withStyles(styles)(Add);
