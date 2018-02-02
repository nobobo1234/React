import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    inputValue: '',
  }

  updateLength = (event) => {
    this.setState({
      inputValue: event.target.value,
    })
  }

  clickedCharHandler = ( index ) => {
    let text = this.state.inputValue.split('');
    text.splice(index, 1);
    const updatedText = text.join('');
    this.setState({
      inputValue: updatedText
    })
  }

  render() {
    const charList = this.state.inputValue.split('').map((ch, index) => {
      return <CharComponent letter={ch} key={index} clicked={() => this.clickedCharHandler(index)} />
    })

    return (
      <div>
        <input onChange={this.updateLength} value={this.state.inputValue} />
        <ValidationComponent text={this.state.inputValue} />
        {charList}
      </div>
    );
  }
}

export default App;
