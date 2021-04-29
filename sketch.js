var canvas;
var caveground, caveImg;
var cactusImg;
var ninja,ninjajumping, ninjadead;
var invisibleline, invisiblelineGroup;
var endingline1, endingline2, endinegline3, endingline4;
var gameState = "serve";
var level = 1;
var power1, power2, rube, diamonds, score;
var hororSound;
var scoringline, scorelineGroup;
var enemy1Img, enemy2Img;
var gameover, gameoverImg, leftarrow, leftarrowImg, right_arrow, right_arrowImg, restart, restartImg;
var rubiImg, woodImg,diamondImg;
var gamesound, gameoversound;
var caveImage, coinImage, playImage;
var start;
var coin, coinGroup;
var box;


function preload(){
  caveImg = loadImage("background_cave.png");
  cactusImg = loadImage("cactus_01.png");
  ninjajumping = loadAnimation("Jump__000.png",
                               "Jump__001.png",
                               "Jump__002.png",
                               "Jump__003.png",
                               "Jump__004.png",
                               "Jump__005.png",
                               "Jump__006.png",
                               "Jump__007.png",
                               "Jump__008.png",
                               "Jump__009.png");

  gameoverImg = loadImage("gameover.png"); 
  rubiImg = loadImage("rubi.png");
  woodImg = loadImage("wood.png");
  diamondImg = loadImage("diamond.png");
  leftarrowImg = loadImage("leftarrow.png");
  right_arrowImg = loadImage("rightarrow.png");
  enemy1Img = loadImage("enemy1.png");
  enemy2Img = loadImage("enemy2.png");
  restartImg = loadImage("reset.png");
  ninjadead = loadAnimation("Idle__008.png");
  gamesound = loadSound("game.mp3");
  gameoversound = loadSound("gameover.mp3");
  caveImage = loadImage("caveImage.jpg");
  coinImage = loadImage("coin.png");
  playImage = loadImage("play.png");

 
}

function setup(){
 canvas= createCanvas(600,600);
 

  caveground = createSprite(300,300);
  caveground.addImage(caveImg);
  caveground.scale = 1.5;
  ninja = createSprite(100,300,20,20);
  ninja.addAnimation("dying",ninjadead);
  ninja.addAnimation("jumping",ninjajumping);
  ninja.scale = 0.15;
 // ninja.debug = true;
  ninja.setCollider("rectangle",0,105,160,160);
  endingline1 = createSprite(300,599,600,1);
  endingline1.visible = false;

  endingline2 = createSprite(300,2,600,1);
  endingline2.visible = false;

  endinegline3 = createSprite(2,300,1,600);
  endinegline3.visible = false;

  endingline4 = createSprite(599,300,1,600);
  endingline4.visible = false;

  leftarrow = createSprite(550,550,10,10);
  leftarrow.addImage(leftarrowImg);
  leftarrow.scale = 0.1;

  right_arrow = createSprite(500,550,10,10);
  right_arrow.addImage(right_arrowImg);
  right_arrow.scale = 0.1;

  gameover = createSprite(285,300,10,10);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5;

  score = 0;
  rube = 0;
  diamonds = 0;
  coin = 0;
  power1 =0;
  power2 = 0;

  restart = createSprite(560,75,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.1;

  start = createSprite(300,300,10,10);
  start.addImage(playImage);
  start.scale = 0.5;
  start.visible =  true;

  box = createSprite(550,120,20,20);
  box.shapeColor = "black";
  box.visible = false;


  invisiblelineGroup = createGroup();
  scorelineGroup = createGroup();
  cactusGroup = createGroup();
  rubiGroup = createGroup();
  woodGroup = createGroup();
  diamondGroup = createGroup();
  lineGroup = createGroup();
  enemyGroup = createGroup();
  coinGroup = createGroup();

 // gamesound.play();
  gameover.visible = false;
  restart.visible = false;
  leftarrow.visible = false;
  right_arrow.visible = false;
 // ninja.y = 70;
 // ninja.x= 50;

  
  
}

function draw(){

 

 if(mousePressedOver(start) && gameState === "serve"){

  gameState = "play";
  start.visible = false;
  gameover.visible = false;
  restart.visible = false;
  leftarrow.visible = false;
  right_arrow.visible = false;
  box.visible = true;
  ninja.x= 100;
  ninja.y = 570;
  gamesound.play();

 }

  background(3,3,23);

 // console.debug(endinegline3.x);


  if(gameState==="play" && level ===1 ){

    ninja.changeAnimation("jumping", ninjajumping);
    
    gameover.visible = false;
    restart.visible = false;
    leftarrow.visible = true;
    right_arrow.visible = true;
    
    caveground.velocityY = (6+1*score/100);
    spawnLine();
    spawnCactus();
    spawnWood();
    spawndiamond();
    spawnObstacles();

    score = score+Math.round(getFrameRate()/60);
    
    if(keyDown("space")){
    ninja.velocityY = -(6+2*score/300); 

        
  }
  ninja.velocityY = ninja.velocityY+0.5;

 /* var x_position = ninja.x;
  var y_position = ninja.y;*/

 camera.position.x  = ninja.x;
 camera.position.y =  ninja.y;

  
  if(mousePressedOver(leftarrow) || keyDown(LEFT_ARROW)){
    ninja.x = ninja.x-5;
  }
  
  if(mousePressedOver(right_arrow) || keyDown(RIGHT_ARROW)){
    ninja.x = ninja.x+5;
  }
  
  if(ninja.isTouching(lineGroup)){

    lineGroup.destroyEach();
    score = score+1;
    power1 = power1 +1;
   
    
  }

  if(ninja.isTouching(woodGroup)){

    ninja.velocityY = 0;

  }
    
    if(ninja.isTouching(scorelineGroup)){

    scorelineGroup.destroyEach();
    rubiGroup.setLifetimeEach(0);
    rube = rube+1;
    score = score+5;
    power1 = power1 +1;

    
    
  }

  if(ninja.isTouching(diamondGroup)){

    diamondGroup.destroyEach();
    diamonds = diamonds+1;
    score = score+50;
    power1 = power1 +1;
    

  }
  if(diamonds === 3){

    level =2;

  } 
  if(ninja.isTouching(invisiblelineGroup)||
      ninja.isTouching(endingline2) ||
      ninja.isTouching(endinegline3) ||
      ninja.isTouching(endingline4) ||     
      ninja.isTouching(cactusGroup)||
      ninja.isTouching(enemyGroup)){

       // power1 = power1 -1;
       power2 = power2 +1;

      // gameState = "end";
      
      

  }

 /* if(enemyGroup.isTouching(invisiblelineGroup)|| 
    enemyGroup.isTouching(cactusGroup))
    {
     // power1 = power1 -1;
     power2 = power2 +1;
     invisiblelineGroup.destroyEach();
    // gameState = "end";
    
    
}

if(cactusGroup.isTouching(enemyGroup))
{
 // power1 = power1 -1;
 power2 = power2 +1;
// gameState = "end";

}*/

if(power1===10){
  box.shapeColor = "blue";
}
if(power1===20){
  box.shapeColor  = "green";
}
if(power1===30){
  box.shapeColor = "yellow";
}
if(power1===40){
  box.shapeColor = "red";
}

if(power2===10){
  box.shapeColor = "pink";
}
if(power2===20){
  box.shapeColor = "lightyellow";
}
if(power2===30){
  box.shapeColor = "lightgreen";
}
if(power2===40){
  box.shapeColor = "lightblue";
}
  
  
  if(power2>power1){
    gameState= "end";
    gameoversound.play();
    gamesound.stop();
  }
    
    
  }else if(gameState === "play" && level ===2){
  
    gameover.visible = false;
    restart.visible = false;
    leftarrow.visible = true;
    right_arrow.visible = true;
    
    caveground.velocityY = (6+2*score/100);
    caveground.addImage(caveImage);
    caveground.scale = 3;

    spawnline();
    spawnCactus();
    spawnWood();
    spawndiamond();
    spawnObstacles();

    score = score+Math.round(getFrameRate()/60);
    
    if(keyDown("space")){
    ninja.velocityY = -(6+2*score/300);       
  }
    ninja.velocityY = ninja.velocityY+0.5;

    camera.position.x  = canvas.width/2;
    camera.position.y = canvas.height/2;
  
  if(mousePressedOver(leftarrow) || keyDown(LEFT_ARROW)){
    ninja.x = ninja.x-5;
  }
  
  if(mousePressedOver(right_arrow) || keyDown(RIGHT_ARROW)){
    ninja.x = ninja.x+5;
  }
  
  if(ninja.isTouching(lineGroup)){

    lineGroup.destroyEach();
    score = score+1;
    
  }

  if(ninja.isTouching(woodGroup)){

    ninja.velocityY = 0;

  }
    
    if(ninja.isTouching(scorelineGroup)){

    scorelineGroup.destroyEach();
    coinGroup.setLifetimeEach(0);
    coin = coin+1;
    score = score+5;
    
    
  }

  if(ninja.isTouching(diamondGroup)){

    diamondGroup.destroyEach();
    diamonds = diamonds+1;
    score = score+50;

  }
    
   if(ninja.isTouching(invisiblelineGroup)||
      ninja.isTouching(endingline2) ||
      ninja.isTouching(endinegline3) ||
      ninja.isTouching(endingline4) || 
     
      ninja.isTouching(cactusGroup)){

       gameState = "end";
       gameoversound.play();
       gamesound.stop();

  }
    
    
  }else if(gameState==="end"){
     
     caveground.velocityY = 0;

    // gamesound.stop();

     ninja.changeAnimation("dying",ninjadead);
     //ninja.x = 120;
     //ninja.y = 300;
     ninja.velocityY=0;
     invisiblelineGroup.setVelocityXEach(0);
     invisiblelineGroup.setVelocityYEach(0);
     invisiblelineGroup.setLifetimeEach(-1);
     scorelineGroup.setVelocityYEach(0);
     scorelineGroup.setVelocityXEach(0);
     scorelineGroup.setLifetimeEach(-1);
     cactusGroup.setVelocityXEach(0);
     cactusGroup.setVelocityYEach(0);
     cactusGroup.setLifetimeEach(-1);
     rubiGroup.setVelocityXEach(0);
     rubiGroup.setVelocityYEach(0);
     rubiGroup.setLifetimeEach(-1);
     lineGroup.setVelocityXEach(0);
     lineGroup.setVelocityYEach(0);
     lineGroup.setLifetimeEach(-1);
     diamondGroup.setLifetimeEach(-1);
     diamondGroup.setVelocityXEach(0);
     diamondGroup.setVelocityYEach(0);
     woodGroup.setVelocityXEach(0);
     woodGroup.setVelocityYEach(0);
     woodGroup.setLifetimeEach(-1);
    enemyGroup.setLifetimeEach(-1);
    enemyGroup.setVelocityXEach(0);
    enemyGroup.setVelocityYEach(0);
     coinGroup.setVelocityXEach(0);
     coinGroup.setVelocityYEach(0);
     coinGroup.setLifetimeEach(-1);
     box.shapeColor = "white";
     gameover.visible = true;
     restart.visible = true;
     leftarrow.visible = false;
     right_arrow.visible = false;

     if(mousePressedOver(restart)){

      reset();

     }
    
  }


  if(caveground.y>450){
   
    caveground.y = 300;
 
  }
 
       

  
  drawSprites();

  if(level ===1 && (gameState==="end" || gameState==="play" )  ){

    fill("yellow");
    textSize(20);
    text("Ruby: "+rube,25,50);
    
    fill("lightgreen");
    textSize(20);
    text("Diamond: "+diamonds,25,30);

    fill("white");
    textSize(20);
    text("Score: "+score,480,50);

    fill("white");
    textSize(10);
    text("Power: "+power1, 530,150);
    //text("Power: "+power2, 480,200);

    }

    


    if(level===2 && (gameState === "end" || gameState==="play" ) ){

          
      fill("lightgreen");
      textSize(20);
      text("Diamond: "+diamonds,25,30);
      fill("white");
      textSize(20);
      text("Score: "+score,480,50);
      fill("yellow");
      textSize(20);
      text("Coin: "+coin,25,50);

    }



    if(gameState ==="serve"){
      textSize(20);
      fill("white");
      textFont("Roboto");
      text("Hunt the treasures, beware of the Gatekeepers",90,80);
      text("How to play:",90, 150 );
      text("Click space to keep the Ninja moving up..", 90, 180);
      text("Use arrow keys to move Left & Right", 90,210);
      text("Collect treasures, Diamonds will take to you next level", 70,400);
      text("Try to keep the colours of the 'BOX' in dark to save the power of the Ninja", 5,430);
    }

  }

function spawnLine(){
  if(frameCount % 200 === 0){

  var scoringline = createSprite(100,5,50,5);
  var rubi = createSprite(100,100,5,5);
  rubi.addImage(rubiImg);
  rubi.scale = 0.01;
 
  scoringline.visible = false;
  

  scoringline.velocityY = (1+2*score/500);
  rubi.velocityY = (1+2*score/500);
  scoringline.x = Math.round(random(150,400));
 
 
  rubi.x = scoringline.x;
  
  rubi.y = scoringline.y;
  
  scoringline.lifetime = 700;
  rubi.lifetime = 700;

  scorelineGroup.add(scoringline);
  rubiGroup.add(rubi);
    
    
  }
}

  function spawnCactus(){

    if(frameCount % 500 === 0){

      var cactus = createSprite(100,5,50,5);
      cactus.addImage(cactusImg);
      cactus.scale = 0.1;
      cactus.velocityY = (1+2*score/100);
      cactus.x = Math.round(random(150,400));
      cactus.lifetime = 700;
      cactusGroup.add(cactus);


    }
  }


    function spawnWood(){

      if(frameCount % 100 === 0){

        var wood = createSprite(250,20,25,5);
        var invisibleline = createSprite(100,25,100,5);
        invisibleline.visible = false;
        var line = createSprite(100,10,100,5);
        line.visible = false;
        wood.addImage(woodImg);
        wood.scale = 0.1;
        wood.velocityY = (1+2*score/500);
        invisibleline.velocityY = (1+2*score/500);
        line.velocityY = (1+2*score/500);
        wood.x = Math.round(random(100,400));
        
        invisibleline.x =  wood.x ;
        line.x = wood.x;
        wood.lifetime = 700;
        invisibleline.lifetime = 700;
        line.lifetime = 700;
        woodGroup.add(wood);
        invisiblelineGroup.add(invisibleline);
        lineGroup.add(line);



      }
    
  
}

function spawndiamond(){

  if(frameCount % 2500 === 0){

    var diamond = createSprite(103,20,5,4);
    diamond.addImage(diamondImg);
    diamond.scale = 0.15;
    diamond.velocityY = (1+2*score/50);
    diamond.x = Math.round(random(20,600));
    diamond.lifetime = 700;
    diamondGroup.add(diamond);

  }
}

function spawnObstacles(){
  
  if(frameCount % 200 === 0){
    var enemy = createSprite(300,50,10,10);
    enemy.lifetime = 180;
    enemy.y = Math.round(random(250,370));
  
   var rand;
  
   rand = Math.round(random(1,2));
   
  switch(rand){
      case 1: enemy.addImage(enemy1Img);
              enemy.scale = 0.2;
              enemy.velocityX = -(5+2*score/500);
      break;
      case 2: enemy.addImage(enemy2Img);
              enemy.scale = 0.2;
              enemy.velocityX = (5+2*score/500);
      break;
  }
    enemyGroup.add(enemy);
    
  }
}

function spawnline(){

  if(frameCount % 200 === 0){
    var scoringline = createSprite(100,5,50,5);
    var coin = createSprite(100,100,5,5);
    coin.addImage(coinImage);
    coin.scale = 0.05;
    scoringline.visible = false;
      
    scoringline.velocityY = (1+2*score/500);
    coin.velocityY = (1+2*score/500);
    scoringline.x = Math.round(random(150,400));
    coin.x = scoringline.x;
    coin.y = scoringline.y;
      
    scoringline.lifetime = 700;
    coin.lifetime = 700;
    scorelineGroup.add(scoringline);
    coinGroup.add(coin);
      
      
    }


}


function reset(){

  gameState = "play";
  box.shapeColor = "black";
  ninja.changeAnimation("jumping",ninjajumping);
  caveground.addImage(caveImg);
  ninja.x = 100;
  ninja.y = 300;
  score = 0;
  rube = 0;
  diamonds = 0;
  power1 = 0;
  power2 = 0;
  level = 1;
  cactusGroup.destroyEach();
  rubiGroup.destroyEach();
  woodGroup.destroyEach();
  enemyGroup.destroyEach();
  diamondGroup.destroyEach();
  invisiblelineGroup.destroyEach();
  scorelineGroup.destroyEach();
  lineGroup.destroyEach();
  coinGroup.destroyEach();
  gameover.visible = false;
  restart.visible = false;
  leftarrow.visible = true;
  right_arrow.visible = true;
  gamesound.play();
 
  
}
