import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addSubmitSuccess = (id, formData) => {
    return {
        type: actionTypes.ADD_SUBMIT_SUCCESS,
        id,
        formData
    };
};

export const addSubmitFail = error => {
    return {
        type: actionTypes.ADD_SUBMIT_FAIL,
        error
    };
};

export const addSubmitStart = () => {
    return {
        type: actionTypes.ADD_SUBMIT_START
    };
};

export const submitAddForm = (formData, token) => {
    return dispatch => {
        dispatch(addSubmitStart());
        axios
            .post(`/events.json?auth=${token}`, formData)
            .then(response => {
                dispatch(addSubmitSuccess(response.data.name, formData));
            })
            .catch(err => {
                dispatch(addSubmitFail(err));
            });
    };
};
