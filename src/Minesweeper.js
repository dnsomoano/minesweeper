import React, { Component } from "react";
// import Tile from './Tile';

const BASE_URL = "https://minesweeper-api.herokuapp.com/";

class Minesweeper extends Component {
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

  // // Retrieves an in-play board // TODO broken
  // getGameBoard = () => {
  //   fetch(`${BASE_URL}games/${this.state.game.id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ id: `${this.state.game.id}` })
  //   })
  //     .then(resp => resp.json())
  //     .then(boardInPlay => {
  //       // If state is equal to win -- show button and refresh game
  //       // else if state equal lose -- show button and refresh game
  //       this.state({
  //         game: boardInPlay
  //       });
  //       // dbg
  //       console.log("retrieves board!", boardInPlay);
  //     });
  //   if (this.state.game.state === "lost") {
  //     console.log("You Lose!");
  //   } else if (this.state.game.state === "won") {
  //     console.log("You Won!");
  //   }
  // };

  // Check handle a cell on right-click
  setCheck = (row, col) => {
    fetch(`${BASE_URL}games/${this.state.game.id}/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: `${this.state.game.id}`, row: row, col: col })
    })
      .then(resp => resp.json())
      .then(newGame => {
        console.log("First check click works!", newGame);
        // syntax for setState != this.state syntax
        // TODO Append array of flags to game and increment flags Week 04 Day 3(for check) & 4(for game)... Wrap in if statement?
        if (
          this.state.game.state !== "lost" &&
          this.state.game.state !== "won"
        ) {
          console.log("Next check");
          this.setState({
            game: newGame,
            check: this.state.check + 1
          });
        } else if (this.state.game.state === "won") {
          console.log("You Won!");
        } else {
          console.log("You Lose!");
        }
      });
  };

  // Flag handle a cell on left-click
  setFlag = (event, row, col) => {
    event.preventDefault();
    fetch(`${BASE_URL}games/${this.state.game.id}/flag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ row: row, col: col })
    })
      .then(resp => resp.json())
      .then(flagsBoard => {
        console.log("First flag fine!", flagsBoard);
        // syntax for setState !== this.state syntax
        this.setState({
          // TODO 4(for game)
          game: flagsBoard,
          flag: this.state.flag + 1
        });
      });
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
              <div key={j}>
                {row.map((column, i) => {
                  // console.log("y-coordinate", column, i);
                  // console.log("there are", column.length);
                  return (
                    <span
                      key={i}
                      className="box"
                      onClick={() => this.setCheck(i, j)}
                      onContextMenu={event => this.setFlag(event, i, j)}
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

export default Minesweeper;
