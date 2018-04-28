import React, { Component } from "react";
import { connect } from "react-redux";

import Person from "../components/Person/Person";
import AddPerson from "../components/AddPerson/AddPerson";
import * as propTypes from "../store/actions";

class Persons extends Component {
    render() {
        return (
            <div>
                <AddPerson personAdded={this.props.onAddPerson} />
                {this.props.persons.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.onDeletePerson(person.id)}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        persons: state.persons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPerson: (name, age) =>
            dispatch({ type: propTypes.ADD_PERSON, personData: { name, age } }),
        onDeletePerson: personId => dispatch({ type: propTypes.DELETE_PERSON, personId })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
