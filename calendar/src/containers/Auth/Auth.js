import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import axios from "axios";

import Input from "../../components/UI/Input/Input";
import formElementHelper from "../../helpers/formElementHelper";
import { Send } from "@material-ui/icons";
import Button from "material-ui/Button";
import Snackbar from "material-ui/Snackbar";

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
        },
        formIsValid: false,
        isSignUp: false,
        errorMessage: "",
        openSnackBar: false
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

    submitFormHandler = async event => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url =
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD35mSKACuABFE3847ZKPAatDcFgsQ9O4I";
        if (!this.state.isSignUp)
            url =
                "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD35mSKACuABFE3847ZKPAatDcFgsQ9O4I";
        const response = await axios.post(url, authData).catch(e => {
            let error = e.response.data.error.message;
            if (error === "INVALID_PASSWORD") error = "Invalid password";
            else if (error === "EMAIL_EXISTS") error = "This email already exists";
            else if (error === "EMAIL_NOT_FOUND") error = "This email is not found";
            this.setState({ errorMessage: error, openSnackBar: true });
        });
        this.props.router.authaction(response.data.localId, response.data.idToken);
        setTimeout(() => {
            this.props.router.auth("", "");
        }, response.data.expiresIn * 1000);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp };
        });
    };

    snackbarClosedHandler = () => {
        this.setState({ openSnackBar: false });
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
                <form className={classes.form} onSubmit={this.submitFormHandler}>
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
                    <br />
                    <Button
                        variant="raised"
                        color="secondary"
                        onClick={this.switchAuthModeHandler}
                        /* disabled={!this.state.formIsValid}> */
                    >
                        Switch to {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
                    </Button>
                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        open={this.state.openSnackBar}
                        autoHideDuration={4000}
                        onClose={this.snackbarClosedHandler}
                        message={<div>{this.state.errorMessage}</div>}
                        SnackbarContentProps={{
                            "aria-describedby": "message-id"
                        }}
                    />
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(Auth);
