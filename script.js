///Define html elements
const board=document.getElementById('game-board');

//Define Game Variables
let snake=[{x:10,y:10}]//start position is the middle of the board
//Drawing game map
function draw(){
    board.innerHTML='';
    drawSnake();
}

//Drawing Snake
function drawSnake(){

}