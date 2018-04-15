const formElementHelper = (elementType, elementConfig, validation, value) => {
    if (!validation) {
        return {
            elementType,
            elementConfig,
            value: "",
            valid: true,
            validation: {}
        };
    }

    if (typeof validation === "boolean") {
        validation = {
            required: validation
        };
    }

    return {
        elementType,
        elementConfig,
        value: "",
        validation,
        valid: false,
        touched: false
    };
};

export default formElementHelper;
