import React, { Component } from "react";
import { withStyles } from "material-ui/styles";

import Input from "../../components/UI/Input/Input";
import formElementHelper from "../../helpers/formElementHelper";
import { Send } from "@material-ui/icons";
import Button from "material-ui/Button";

const styles = {
    form: {
        boxShadow: "0 2px 3px #ccc",
        padding: "10px",
        textAlign: "center"
    }
};

class Auth extends Component {
    state = {
        controls: {
            email: formElementHelper(
                "input",
                {
                    type: "email",
                    label: "Mail Address"
                },
                {
                    required: true,
                    isEmail: true
                }
            ),
            password: formElementHelper(
                "input",
                {
                    type: "password",
                    label: "Password"
                },
                {
                    required: true,
                    minLength: 6
                }
            )
        }
    };

    checkValidity(value, rules, inputIdentifier) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        event.preventDefault();
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    };

    render() {
        const { classes } = this.props;
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                type={formElement.config.type}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={event => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        return (
            <div>
                <form className={classes.form}>
                    {form}
                    <br />
                    <Button
                        variant="raised"
                        color="primary"
                        type="submit"
                        /* disabled={!this.state.formIsValid}> */
                    >
                        Submit &nbsp;
                        <Send />
                    </Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(Auth);
