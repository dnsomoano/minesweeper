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
      // counter for player moves
      playerMove: 0,
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
        console.log("Start of game!", newGame);
        // syntax for setState != this.state syntax
        this.setState({
          game: newGame
        });
      });
  }

  // Retrieves an in-play board // TODO broken
  getGameBoard = () => {
    fetch(`${BASE_URL}games/${this.state.game.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: `${this.state.game.id}` })
    })
      .then(resp => resp.json())
      .then(boardInPlay => {
        // If state is equal to win -- show button and refresh game
        // else if state equal lose -- show button and refresh game
        this.state({
          game: boardInPlay
        });
        // dbg
        console.log("retrieves board!", boardInPlay);
      });
  };

  // Check handle a cell on right-click
  setCheck = (event, i, j) => {
    if (this.state.check !== 0) {
      this.getGameBoard(this.state.game.state); // FIX
      this.setState({
        playerMove: this.state.playerMove + 1,
        check: this.state.check + 1
      });
      console.log("2nd check click works", this.state.check);
    } else {
      fetch(`${BASE_URL}games/${this.state.game.id}/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: `${this.state.game.id}`, row: i, col: j })
      })
        .then(resp => resp.json())
        .then(checksBoard => {
          console.log("First check click works!", checksBoard);
          // syntax for setState != this.state syntax
          // TODO Append array of flags to game and increment flags Week 04 Day 3(for check) & 4(for game)... Wrap in if statement?
          this.setState({
            game: checksBoard,
            playerMove: this.state.playerMove + 1,
            check: 1
          });
        });
    }
    console.log(`${this.state.game.id}`);
  };

  // Flag handle a cell on left-click
  setFlag = (event, i, j) => {
    fetch(`${BASE_URL}games/${this.state.game.id}/flag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: `${this.state.game.id}`, row: i, col: j })
    })
      .then(resp => resp.json())
      .then(flagsBoard => {
        console.log("First flag fine!", flagsBoard);
        // syntax for setState !== this.state syntax
        this.setState({
          // TODO 4(for game)
          game: flagsBoard,
          playerMove: this.state.playerMove + 1,
          flag: this.state.flag + 1
        });
      });
    console.log(`${this.state.game.id}`);
  };

  // Renders page
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
          # of checks: {this.state.check} + # of flags: {this.state.flag}
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
                      onClick={this.setCheck}
                      onContextMenu={this.setFlag}
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
