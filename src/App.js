import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Minesweeper from './Minesweeper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="minesweeper-logo" />
        </header>
        <Minesweeper />
      </div>
    );
  }
}

export default App;
