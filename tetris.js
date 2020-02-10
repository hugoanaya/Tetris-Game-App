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

// the pieces and their colors

const PIECES = [
    [Z, "red"]
    [S, "greem"]
    [T, "yellow"]
    [O, "blue"]
    [L, "purple"]
    [I, "cyan"]
    [J, "orange"]
]

// generate random pieces

function randomPiece(){
    let r = randomN = Math.floor(Math.random() * PIECES.length)  // 0 --> 6
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

// The Object Piece

function Piece(tetrimino, color){
    this.tetrimino = tetrimino;
    this.tetriminoN = 0; // 0 cause we want to start from this pattern
    
    this.activeTetrimino = this.tetrimino[this.tetriminoN];
    this.color = color;
    
    // the default starting position for each piece 
    this.x = 3;
    this.y = -2;
}

// fill function

Piece.prototype.fill = function(color){
    for (r = 0; r < this.activeTetrimino.length; r++){
        for (c = 0; c < this.activeTetrimino.length; c++){
            if(this.activeTetrimino[r][c]){
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

// draw a piece on the board

Piece.prototype.draw = function(){
    for (r = 0; r < this.activeTetromino.length; r++){
        for (c = 0; c < this.activeTetromino.length; c++){
            if (this.activeTetrimino[r][c]){
                drawSquare(this.x + c, this.y + r, this.color);
            }
        }
    }
}

// undraw a piece on the board


Piece.prototype.unDraw = function(){
    for (r = 0; r < this.activeTetromino.length; r++){
        for (c = 0; c < this.activeTetromino.length; c++){
            if (this.activeTetrimino[r][c]){
                drawSquare(this.x + c, this.y + r, VACANT);
            }
        }
    }
}

// move the piece down

Piece.prototype.moveDown = function(){
    if(! this.collision(0,1, this.activeTetrimino)){
        
        this.unDraw();
        this.y++;
        this.draw();
    }
    else {
        // things we will see later
    }
}

// move the piece to the right

Piece.prototype.moveRight = function(){
    if(! this.collision(1,0, this.activeTetrimino)){
        
        this.unDraw();
        this.x++;
        this.draw();
    }
    else {
        // things we will see later
    }
}

// move the piece to the left

Piece.prototype.moveLeft = function(){
    if(! this.collision(-1,0, this.activeTetrimino)){
        
        this.unDraw();
        this.x--;
        this.draw();
    }
    else {
        // things we will see later
    }
}

// collision detection function 

Piece.prototype.collision = function(x,y, piece){
    for (r = 0; r < this.activeTetromino.length; r++){
        for (c = 0; c < this.activeTetromino.length; c++){
            
        }
    }
}
