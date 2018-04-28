import React, { Component } from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "./../../../components/UI/Spinner/Spinner";
import Input from "./../../../components/UI/Input/Input";
import formElementHelper from "./../../../helpers/formElementHelper";

class ContactData extends Component {
    state = {
        orderForm: {
            name: formElementHelper(
                "input",
                {
                    type: "text",
                    placeholder: "Your name"
                },
                true
            ),
            street: formElementHelper(
                "input",
                {
                    type: "text",
                    placeholder: "Street"
                },
                true
            ),
            zipCode: formElementHelper(
                "input",
                {
                    type: "text",
                    placeholder: "ZIP Code"
                },
                {
                    required: true,
                    maxLength: 6,
                    minLength: 6
                }
            ),
            country: formElementHelper(
                "input",
                {
                    type: "text",
                    placeholder: "Country"
                },
                true
            ),
            email: formElementHelper(
                "input",
                {
                    type: "email",
                    placeholder: "Your E-Mail"
                },
                true
            ),
            deliveryMethod: formElementHelper(
                "select",
                {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ]
                },
                null,
                "fastest"
            )
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = async event => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };
        await axios.post("/orders.json", order).catch(err => this.setState({ loading: false }));
        this.setState({ loading: false });
        this.props.history.push("/");
    };

    checkValidity(value, rules) {
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={event => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>
                    ORDER
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

export default connect(mapStateToProps)(ContactData);
