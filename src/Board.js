import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game. Value between zero and one
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit 
   * 3x3 Board Example: [[f, f, f], [t, t, f], [f, f, f]]
  */
  function createBoard() {
      /**
   * Random boolean generator
   * @param {float} chanceOfTrue 
   * @returns true or false
   */
    function randomBoolean (chanceOfTrue) {
      return Math.random() < chanceOfTrue ? true : false;
    }


    let initialBoard = [];
    let rows = [];

    for (let row = 0; row < nrows; row++) {
      for (let col = 0; col < ncols; col++) {
        rows.push(randomBoolean(chanceLightStartsOn));
      }
      initialBoard.push(rows);
      rows = [];
    }

    return initialBoard;
  }

  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);// converting coordinate string to numbers

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy); // current cell
      flipCell(y, x - 1, boardCopy); // cell to left
      flipCell(y, x + 1, boardCopy); // cell to right 
      flipCell(y - 1, x, boardCopy); // cell above
      flipCell(y + 1, x, boardCopy); // cell below

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <h1>"You Won!!"</h1>
    )
  }

  // make table board
  const tableBoard = [];

  for (let y = 0; y < nrows; y++) {
    const row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
          <Cell
              key={coord}
              isLit={board[y][x]}
              flipCellsAroundMe={evt => flipCellsAround(coord)}
          />,
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  )
}

export default Board;
