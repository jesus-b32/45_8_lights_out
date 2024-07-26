import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function recieved from the board which flips this
 *      cell and the cells around of it; onCLick handle function
 *
 * - isLit: boolean, is this cell lit? Use this to change the className
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAroundMe, isLit }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td className={classes} onClick={flipCellsAroundMe} />;
}

export default Cell;
