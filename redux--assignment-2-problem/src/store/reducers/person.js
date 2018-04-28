import * as propTypes from "../actions";

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            const newPerson = {
                id: Math.random(),
                name: action.personData.name,
                age: action.personData.age
            };
            return {
                persons: state.persons.concat(newPerson)
            };
        case "DELETE_PERSON":
            return {
                persons: state.persons.filter(person => person.id !== action.personId)
            };
        default:
            return state;
    }
};

export default reducer;
