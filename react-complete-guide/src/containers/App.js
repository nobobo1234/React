import React, { PureComponent } from "react";

import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import Aux from "../hoc/ReactAux";
import withClass from "../hoc/withClass";

class App extends PureComponent {
  state = {
    persons: [
      { id: "1242", name: "Max", age: 28 },
      { id: "1245", name: "Manu", age: 29 },
      { id: "12453", name: "Stephanie", age: 26 }
    ],
    showPersons: false,
    toggleClicked: 0
  };

  deletePersonHandler = personIndex => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons });
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      };
    });
  };

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    return (
      <Aux>
        <button
          onClick={() => {
            this.setState({ showPersons: true });
          }}>
          Show Persons
        </button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
        />
        {persons}
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
