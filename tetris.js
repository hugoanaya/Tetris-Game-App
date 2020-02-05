const cvs = document.getElementById('canvas');
const ctx = cvs.msGetInputContext('2d');

const SQ = squareSize = 20;
const ROW = 20;
const COLUMN = 10;
const VACANT = "white"; // color of an empty square

// draw square
function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);
    ctx.strokeStyle ="black";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

// create the board

let board = [];
for(r = 0; r < ROW; r++){
    board[r] = [];
    for(c = 0; c < COLUMN; c++){
        board[r][c] = VACANT;
    }
}

// draw the board
function drawBoard(){
    for(r=0; r < ROW; r++){
        for(c=0; c < COLUMN; c++){
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();
