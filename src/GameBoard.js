import React, { Component } from "react";
import { start } from "pretty-error";
// import Tile from './Tile';

const BASE_URL = "https://minesweeper-api.herokuapp.com/";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        board: [],
        check: 0,
        flag: 0
      }
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
  checkCell = event => {
    fetch(`${BASE_URL}games/${this.state.game.id}/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // TODO edit stringify to take clicked row&col value i & j w/o falling out of scope
      body: JSON.stringify({ row: 0, col: 2 })
    })
      .then(resp => resp.json())
      // TODO edit promise so setState adds to checks
      .then(playing => {
        console.log("This works!", playing);
        // syntax for setState != this.state syntax
        this.setState({
          game: playing
        });
      });
    console.log(`${this.state.game.id}`);
  };

  // Flag handle a cell on left-click
  flagCell = event => {
    fetch(`${BASE_URL}games/${this.state.game.id}/flag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // TODO edit stringify to take clicked row&col value i & j w/o falling out of scope
      body: JSON.stringify({ row: 0, col: 7 })
    })
      .then(resp => resp.json())
      // TODO edit promise so setState adds to flags
      .then(playing => {
        console.log("This works!", playing);
        // syntax for setState != this.state syntax
        this.setState({
          game: playing
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
        <div className="board-tag">
          {this.state.game.board.map((row, i) => {
            // console.log("x-coordinate", row, i);
            console.log("there are", row.length);
            return (
              // 2nd div tag
              <div>
                {row.map((column, j) => {
                  console.log("y-coordinate", column, j);
                  console.log("there are", column.length);
                  return (
                    <span className="box" onClick={this.checkCell} onMouseDown={this.flagCell}>
                      {this.state.game.board[i][j]} {`${''}`}
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
      </div>
    );
  }
}

export default GameBoard;
