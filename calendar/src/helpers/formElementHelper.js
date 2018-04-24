const formElementHelper = (type, elementConfig, validation, value = "") => {
    if (!validation) {
        return {
            type,
            elementConfig,
            value,
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
        type,
        elementConfig,
        value,
        validation,
        valid: false,
        touched: false
    };
};

export default formElementHelper;
