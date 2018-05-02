import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SUBMIT_START:
            return updateObject(state, { loading: true });
        case actionTypes.ADD_SUBMIT_SUCCESS:
            return updateObject(state, { loading: false });
        case actionTypes.ADD_SUBMIT_FAIL:
            return updateObject(state, { loading: false });
        default:
            return state;
    }
};

export default reducer;
