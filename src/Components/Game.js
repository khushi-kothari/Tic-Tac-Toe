import React, {Component} from 'react'
import Board from './Board'

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            highlight: false,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length -1];
        const squares_cpy = current.squares.slice();
        let arr = calculateWinner(squares_cpy);
        if (arr[1] || squares_cpy[i]) {
          return;
        }
        squares_cpy[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares_cpy
          }]),
          stepNumber : history.length,
          xIsNext: !this.state.xIsNext,
        });
      }

      jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0
        });
      }

      render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        let arr = calculateWinner(current.squares);
        
    
        const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
          return(
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        });
    
        let status;
        if (arr[1]) {
          status = 'Winner: ' + arr[1];

          }
        else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
    
        return (
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
        );
      }
    }


const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [lines[i], squares[a]];
      }
    }
    return [null, null];
  }

export default Game
