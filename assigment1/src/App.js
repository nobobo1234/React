import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    usernames: [
      'Nola', 'Tycho', 'Jelmar', 'Trevor', 'Cas'
    ]
  }

  changeNameHandler = (event) => {
    this.setState({
      usernames: [
        event.target.value, 'Tycho', 'Jelmar', 'Trevor', 'Cas'
      ]
    })
  }

  render() {
    return (
      <div>
        <UserInput change={this.changeNameHandler} username={this.state.usernames[0]} />
        <UserOutput username={this.state.usernames[0]} />
        <UserOutput username={this.state.usernames[1]} />
        <UserOutput username={this.state.usernames[2]} />
        <UserOutput username={this.state.usernames[3]} />
        <UserOutput username={this.state.usernames[4]} />
      </div>
    );
  }
}

export default App;
