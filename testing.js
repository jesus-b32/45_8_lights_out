function randomBoolean (chanceOfTrue) {
    return Math.random() < chanceOfTrue ? true : false;
}


function createBoard(nrows = 3, ncols = 3, chanceLightStartsOn = 0.5) {
    let initialBoard = [];
    let rows = [];
    // let cols = [];

    // const randomBoolean = Math.random() < chanceLightStartsOn ? true : false;

    for (let row = 0; row < nrows; row++) {
        for (let col = 0; col < ncols; col++) {
            rows.push(randomBoolean(chanceLightStartsOn));
        }
        initialBoard.push(rows);
        rows = [];
    }

    return initialBoard;
}


// function createBoard(nrows = 3, ncols = 3, chanceLightStartsOn = 0.5) {
//     const initialBoard = Array.from({length: nrows}).map(
//         row => Array.from({length: ncols}).map(
//             cell => Math.random() < chanceLightStartsOn));

//     return initialBoard;
// }




// function hasWon(board) {
//     for (let row of board) {
//       if (row.includes(true)) return false; // has not won
//     }
//     return true; // won game
// }


function hasWon(board) {
    return board.every(row => row.every(cell => !cell));
}


let board = createBoard(3, 3, 0.1);

console.log(board);
console.log("won? ", hasWon(board));