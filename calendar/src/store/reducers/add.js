import * as actionTypes from '../actions/actionTypes'

const initialState = {

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ORDER_SUBMIT:
            return state;
        default:
            return state;
    }
}

export default reducer;