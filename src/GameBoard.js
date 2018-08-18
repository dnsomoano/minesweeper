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

  componentDidMount() {
    fetch(BASE_URL + "games", {
      method: "POST",
      body: JSON.stringify({ difficulty: 0 })
    })
      .then(resp => resp.json())
      .then(newGame => {
        this.setState = {
          game: newGame
        };
      });
  }

  render() {
    return (
      <div>
        {this.state.game.id}
        {this.state.game.board.map((column, i) => {
          console.log("x-coordinate", column, i);
          return (
            <div>
              {column.map((row, j) => {
                console.log("y-coordinate", column, j);
                return (
                  <span className="tile">{this.state.game.board[i][j]}</span>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default GameBoard;
