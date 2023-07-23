var bg, bgImg;
var balloon, balloonImg;
var bottomGround, topGround;
var gamestate, play, end;
play = 1;
end = 0;
gamestate = play;
var topObstaclesGroup, bottomObstaclesGroup;
var gameOver, gameOverImg;
var coin;
var scoreboard = 0;

function preload(){
bgImg = loadImage("assets/bg.png");
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");
obsTop1 = loadImage("assets/obsTop1.png");
obsTop2 = loadImage("assets/obsTop2.png");
obsBottom1 = loadImage("assets/obsBottom1.png");
obsBottom2 = loadImage("assets/obsBottom2.png");
obsBottom3 = loadImage("assets/obsBottom3.png");
gameOverImg = loadImage("assets/gameOver.png");
coinImg = loadImage("assets/coin.png");
}

function setup(){
  createCanvas(750,750);
// bg image

bg = createSprite(300,300,10,5);
bg.addImage(bgImg);
bg.scale = 1.15;

balloon = createSprite(200,320,20,50)
balloon.addAnimation("balloon", balloonImg);
balloon.scale = 0.2;
//creating top and bottom ground
bottomGround = createSprite(500,700,1000,20)
topGround = createSprite(500,10,1000,20)
//declaring group
topObstaclesGroup = new Group();
bottomObstaclesGroup = new Group();
coinsGroup = new Group();
//creating game over sprite and adding picture
gameOver = createSprite(200,200);
gameOver.addImage(gameOverImg);
gameOver.scale = 2;
gameOver.visible = false;
}

function draw(){
  background(bgImg);
  
  if(gamestate == play){
    //making hot air baloon jump
    if(keyDown("SPACE")){
      balloon.velocityY = -6;
     }
     //to pull it down
     balloon.velocityY = balloon.velocityY + 1;
        
    if(keyDown("LEFT_ARROW")){
      balloon.velocityX = -2;
    }
    if(keyDown("RIGHT_ARROW")){
      balloon.velocityX = 2;
    }
    spawnObstaclesTop();
    spawnObstaclesBottom();
    spawnCoins();
    // condition for end state
    if(topObstaclesGroup.isTouching(balloon)|| bottomObstaclesGroup.isTouching(balloon)|| balloon.isTouching(bottomGround)|| balloon.isTouching(topGround)){
      gamestate = end;
    }
    if(balloon.isTouching(coinsGroup)){
      coinsGroup.destroyEach();
      scoreboard = scoreboard + 2;
    }
  }

  if(gamestate == end){
    gameOver.visible = true;
    balloon.velocityX = 0;
    balloon.velocityY = 0;
    topObstaclesGroup.setvelocityXEach(0);
    bottomObstaclesGroup.setvelocityXEach(0);
  }



//making hot air balloon collide with grounds
balloon.collide(bottomGround);
balloon.collide(topGround);
drawSprites();
textSize(30);
text('scoreboard: '+scoreboard,30,100);
}
/*
8/2=4
8%2 = 0
10%3 = 1
40/3 = 13
40%3 = 1
*/
function spawnObstaclesTop(){
  //adding delay of 50 frames
  if(frameCount%50==0){
    obstacleTop = createSprite(800,50,40,50)
    obstacleTop.velocityX = -4;
    //obstacleTop.addImage(obsTop1)
    obstacleTop.scale = 0.1
    obstacleTop.y = Math.round(random(50,300))
    //generate random obstacles 
    var r = Math.round(random(1,2))
    switch(r){
      case 1: obstacleTop.addImage(obsTop1)
      break;
      case 2: obstacleTop.addImage(obsTop2)
      break;
      default: break;
    }
    obstacleTop.lifetime = 350
    topObstaclesGroup.add(obstacleTop);
  }
}

function spawnObstaclesBottom(){
  if(frameCount%50==0){
  obstacleBottom = createSprite(800,900,40,50)
  obstacleBottom.velocityX = -3;
  obstacleBottom.scale = 0.1;
  obstacleBottom.y = Math.round(random(600,700))
  var r = Math.round(random(1,3))
  switch(r){
    case 1: obstacleBottom.addImage(obsBottom1)
    break;
    case 2: obstacleBottom.addImage(obsBottom2)
    break;
    case 3: obstacleBottom.addImage(obsBottom3)
    default: break;
  }
  obstacleBottom.lifetime = 350
  bottomObstaclesGroup.add(obstacleBottom);
  }
}

function spawnCoins(){
  if(frameCount%150==0){
    coin = createSprite(600,random(20,500),50,50)
    coin.addImage(coinImg)
    coin.scale = 0.01;
    coin.velocityX = -2;
    coinsGroup.add(coin)
    coin.lifetime = 350
  }
}