///Define html elements
const board=document.getElementById('game-board');
const instructionText=document.getElementById('instruction-text')
const logo= document.getElementById('logo')
//Define Game Variables
const gridSize=20;
let snake=[{x:10,y:10}]//start position is the middle of the board
let food=generateFood();//Create and position food on the map
let direction='right'
let gameInterval;
let gameSpeedDelay=200
let gameStarted=false
//Drawing game map
function draw(){
    board.innerHTML='';
    drawSnake();
    drawFood();
}

//Drawing Snake
function drawSnake(){
    snake.forEach((segment)=>{
        const snakeElement=createGameElement('div','snake')
        //adding new snake peice
        setPosition(snakeElement,segment);
        board.appendChild(snakeElement)
    })
}

//Create a snake or food cube/div
function createGameElement(tag,className){
    const element=document.createElement(tag);
    element.className=className;
    return element;
}

//Set postition of the snake or food
function setPosition(element,position){
    element.style.gridColumn=position.x;
    element.style.gridRow=position.y;
}

//testing draw function

// draw();
//drawFood function
function drawFood(){
    const foodElement=createGameElement('div','food')
    setPosition(foodElement,food)
    board.appendChild(foodElement);
}
//generate food
function generateFood(){
    const x=Math.floor(Math.random()*gridSize)+1;
    const y=Math.floor(Math.random()*gridSize)+1;
    return{x,y};
}

//Moving the snake

function move(){
    const head={...snake[0]}
    //using switch for specified movement
    switch(direction){
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    snake.unshift(head);

    // snake.pop();

    if (head.x===food.x && head.y===food.y){
        food=generateFood();
        clearInterval();//clear past interval
        gameInterval=setInterval(()=>{
            move();
            draw();
        },gameSpeedDelay)
    }else{
        snake.pop();
    }
}

// //Test moving
// setInterval(()=>{
//     move();//move first
//     draw();//then draw again new position
// },200)



//Start FGame Function
function startGame(){
    gameStarted=true;///keep track of running game
    instructionText.style.display='none'
    logo.style.display='none'
    gameInterval=setInterval(()=>{
        move()
        // checkCollision();
        draw()
    },gameSpeedDelay)
}

//key press listener
function handleKeyPress(event){
    if(
        (!gameStarted && event.code==='Space') ||
        (!gameStarted && event.key===' ')
    ){
        startGame();
    }else{
        switch(event.key){
            case 'ArrowUp':
                direction='up'
                break;
            case 'ArrowDown':
                direction='down'
                break;
            case 'ArrowLeft':
                direction='left'
                break;
            case 'ArrowRight':
                direction='right'
                break;

        }
    }
}
document.addEventListener('keydown',handleKeyPress)