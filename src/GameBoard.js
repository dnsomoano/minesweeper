import React, { Component } from "react";
// import Tile from './Tile';

const BASE_URL = "https://minesweeper-api.herokuapp.com/";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // game is an object with an array key value
      game: {
        board: []
      },
      check: 0,
      flag: 0
    };
  }

  // Once component mounts
  componentDidMount() {
    fetch(BASE_URL + "games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ difficulty: 0 })
    })
      .then(resp => resp.json())
      .then(newGame => {
        console.log("This works!", newGame);
        // syntax for setState != this.state syntax
        this.setState({
          game: newGame
        });
      });
  }

  // Check handle a cell on right-click
  checkCell = (event, i, j) => {
    fetch(`${BASE_URL}games/${this.state.game.id}/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id:`${this.state.game.id}`, row: i, col: j })
    })
      .then(resp => resp.json())
      .then(checks => {
        console.log("This works!", checks);
        // syntax for setState != this.state syntax
        // TODO Append array of flags to game and increment flags Week 04 Day 3(for check) & 4(for game)... Wrap in if statement?
        this.setState({
          game: checks,
          check: 1
        });
      });
    console.log(`${this.state.game.id}`);
  };

  // Flag handle a cell on left-click
  flagCell = (event, i, j) => {
    fetch(`${BASE_URL}games/${this.state.game.id}/flag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id:`${this.state.game.id}`, row: i, col: j })
    })
      .then(resp => resp.json())
      .then(flags => {
        console.log("This works!", flags);
        // syntax for setState !== this.state syntax
        this.setState({
          // TODO Append array of flags to game and increment flags Week 04 Day 3(for flag) & 4(for game)
          game: flags,
          flag: 1
        });
      });
    console.log(`${this.state.game.id}`);
  };

  render() {
    return (
      <div>
        <div>
          Game in {this.state.game.state} state with id: #{this.state.game.id}{" "}
          -----
          {"   "}
          {this.state.game.mines} mines
        </div>
        <div>
          # of checks: {this.state.check} + # of flags:{" "}
          {this.state.flag}
        </div>
        <div className="board-tag">
          {this.state.game.board.map((row, j) => {
            // console.log("x-coordinate", row, j);
            // console.log("there are", row.length);
            return (
              // 2nd div tag
              <div>
                {row.map((column, i) => {
                  // console.log("y-coordinate", column, i);
                  // console.log("there are", column.length);
                  return (
                    <span
                      className="box"
                      onClick={this.checkCell}
                      onContextMenu={this.flagCell}
                    >
                      {this.state.game.board[i][j]} {`${""}`}
                    </span>
                  );
                })}
              </div>
              //
            );
            // return (
            // id={this.state.game.id}
          })}
        </div>
        {/* Closing render div*/}
      </div>
    );
  }
}

export default GameBoard;
