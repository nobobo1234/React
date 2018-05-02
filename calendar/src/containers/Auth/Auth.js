import React, { Component } from "react";
import { connect } from "react-redux";

import formElementHelper from "../../helpers/formElementHelper";
import checkValidity from "../../helpers/checkValidity";
import Input from "../../components/UI/Input/Input";
import Button from "material-ui/Button";
import { Send } from "@material-ui/icons";
import { withStyles } from "material-ui/styles";
import * as actions from "../../store/actions/";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

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
        formIsValid: false
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true
            }
        };

        let formIsValid = true;
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }

        this.setState({
            controls: updatedControls,
            formIsValid
        });
    };

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
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

        let form = formElementsArray.map(formElement => (
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

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error}</p>;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />;
        }

        return (
            <div>
                {authRedirect}
                <form className={classes.form} onSubmit={this.submitHandler}>
                    <br />
                    {errorMessage}
                    {form}
                    <br />
                    <Button
                        variant="raised"
                        color="primary"
                        type="submit"
                        disabled={!this.state.formIsValid}>
                        Submit
                        <Send />
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) =>
            dispatch(actions.authenticate(email, password, isSignUp))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Auth));
