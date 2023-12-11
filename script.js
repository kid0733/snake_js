///Define html elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');
console.log(highScoreText.textContent);
//Define Game Variables
const gridSize=20;
let snake=[{x:10,y:10}]//start position is the middle of the board
let food=generateFood();//Create and position food on the map
let highScore=0
let direction='right'
let gameInterval;
let gameSpeedDelay=200
let gameStarted=false
//Drawing game map
function draw(){
    board.innerHTML='';
    drawSnake();
    drawFood();
    updateScore()
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
    if(gameStarted){
        const foodElement=createGameElement('div','food')
        setPosition(foodElement,food)
        board.appendChild(foodElement);
    }
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
        increaseSpeed();
        clearInterval(gameInterval);//clear past interval
        gameInterval=setInterval(()=>{
            move();
            checkCollision();
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
        checkCollision();
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

function increaseSpeed(){
    if(gameSpeedDelay>150){
        gameSpeedDelay-=5;

    }else if(gameSpeedDelay>100){
        gameSpeedDelay-=3;
    }
    else if(gameSpeedDelay>50){
        gameSpeedDelay-=2;
    
    }else if(gameSpeedDelay>25){
        gameSpeedDelay-=1;
    }
    
}


function checkCollision(){
    const head=snake[0];
    if(head.x<1 || head.x>gridSize || head.y<1 || head.y>gridSize){
        resetGame();
    }

    for(let i=1;i<snake.length;i++){
        if(head.x===snake[i].x && head.y===snake[i].y){
            resetGame();
        }
    }
}

function resetGame(){
    updateHighScore();
    stopGame();
    snake=[{x:10,y:10}];
    food=generateFood();
    direction='right';
    gameSpeedDelay=200;
    updateScore();
}

function updateScore(){
    const currentScore=snake.length-1;
    score.textContent=currentScore.toString().padStart(3,'0');//padstart() to retain triple digit nums   
}


function stopGame(){
    clearInterval(gameInterval);
    gameStarted=false;
    instructionText.style.display='block';
    logo.style.display='block';
}

function updateHighScore(){
    const currentScore=snake.length-1;
    if(currentScore>highScore){
        highScore=currentScore;
        highScoreText.textContent=highScore.toString().padStart(3,'0');
    }
    highScoreText.style.display='block';
}