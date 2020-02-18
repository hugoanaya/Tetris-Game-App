const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const SQ = squareSize = 20;
const ROW = 20;
const COL = COLUMN = 10;
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
            // we draw only occupied spaces
            if(this.activeTetrimino[r][c]){
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

// draw a piece on the board

Piece.prototype.draw = function(){
    this.fill(this.color);
}

// undraw a piece on the board


Piece.prototype.unDraw = function(){
    this.fill(VACANT);
}

// move the piece down

Piece.prototype.moveDown = function(){
    if(! this.collision(0,1, this.activeTetrimino)){
        
        this.unDraw();
        this.y++;
        this.draw();
    }
    else {
        this.lock();
        piece = randomPiece();
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

// rotate the piece

Piece.prototype.rotate = function(){
    let nextPattern = this.tetrimino[(this.tetriminoN + 1)%this.tetrimino.length];
    let kick = 0;
    if ( this.collision(0,0, nextPattern)){
        if (this.x > COL / 2){
            kick = -1;
        }
        else {
            kick = 1;
        }
    }
    if (!this.collision(kick,0, nextPattern)){
        this.unDraw();
        this.x += kick;
        this.tetriminoN = (this.tetriminoN+1)%this.tetrimino.length;
        this.activeTetrimino = this.tetrimino[this.tetriminoN];
        this.draw();
    }
}

Piece.prototype.lock = function(){
    for (r = 0; r < this.activeTetrimino.length; r++){
        for (c = 0; c < this.activeTetrimino.length; c++){
            // we skip the vacant squares
            if(!this.activeTetrimino[r][c]){
                continue;
            }
            if (this.y + r < 0){
                gameOver = true;
                alert("Game Over");
                break;
            }
            board[this.y+r][this.x+c] = this.color;
        }
        // remove full rows
        for (r = 0; r < ROW; r++){
            let isRowFull = true;
            for (c = 0; c < COL; c++){
                isRowFull = isRowFull && (board[r][c] != VACANT);
            }
            if (isRowFull){
                for(y = r; y > 1; y--){
                    for(c = 0; c < COL; c++){
                        board[y][c] = board[y-1][c];
                    }
                }
                // the top row board[0][..] has no row above it
                for (c = 0; c < COL; c++){
                    board[0][c] = VACANT;
                }
                // increment the score
                score += 10;
            }
        }
        // update the board
        drawBoard();

        // update the score
        scoreElement.innerHTML = score;
    }
}
// collision detection function 

Piece.prototype.collision = function(x,y, piece){
    for (r = 0; r < piece.length; r++){
        for (c = 0; c < piece.length; c++){
            // if the square is VACANT, we go to the next one
            if(!piece[r][c]){
                continue;
            }
            // coordinates of the piece after movement
            let newX = this.x + c + x;
            let newY = this.y + r + y;

            // if any of the squares is beyond the boundaries.
            if (newX < 0 || newX >= COL || newY >= ROW){
                return true;
            }
            // skip newY < 0, board[-1] will crash the game
            if (newY < 0){
                continue;
            }
            // check if there is a locked piece already in place
            if (board[newX][newY] != VACANT){
                return true;
            }
        }
    }
    return false;
}

// CONTROL the piece

document.addEventListener("keydown", CONTROL);

function CONTROL(event){
    if(event.keyCode == 37){
        piece.moveLeft();
        dropStart = Data.now();
    }else if (event.keyCode == 38){
        piece.rotate();
        dropStart = Data.now();
    }else if (event.keyCode == 39){
        piece.moveRight();
        dropStart = Data.now();
    }else if (event.keyCode == 40){
        piece.moveDown();
    }
}

// drop the piece every 1sec
let dropStart = Data.now();
function drop(){
    let now = Data.now();
    let delta = now - dropStart;
    if(delta > 1000){
        piece.moveDown();
        dropStart = Data.now();
    }
    if (!gameOver){
        requestAnimationFrame(drop);
    }
}

drop();
