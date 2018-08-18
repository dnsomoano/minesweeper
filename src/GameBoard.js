import React, { Component } from "react";

const BASE_URL = "https://minesweeper-api.herokuapp.com/";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        board: []
      }
    };
  }

  // once component mounts
  componentDidMount() {
    fetch(BASE_URL + "games", {
      method: "POST",
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

  render() {
    return (
      <div>
        <div>Game in play {this.state.game.id}</div>
        <div className="board-tag">
          {this.state.game.board.map((row, i) => {
            console.log("x-coordinate", row, i);
            console.log("row works");
            return (
              // 2nd div tag
              <div>
                {row.map((column, j) => {
                  console.log("y-coordinate", column, j);
                  console.log("column works");
                  return (
                    <span className="tile">{this.state.game.board[i][j]}</span>
                  );
                })}
              </div>
              //
            );
            return;
          })}
        </div>
      </div>
    );
  }
}

export default GameBoard;
