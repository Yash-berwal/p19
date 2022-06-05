var PLAY = 1;
var END = 0;
var gameState = PLAY;

var plane, plane_running, plane_collided;
var ground,  groundImage;


var obstaclesGroup, obstacle1;
var score;


function preload(){
  plane_running = loadAnimation("ar.jpg");
  plane_collided = loadAnimation("cr.jpg");
  
  groundImage = loadImage("ground2.png");
  
 
  
  obstacle1 = loadImage(" st234.png");
  
  goImg=loadImage('gameOver.png');
 
}

function setup() {
  createCanvas(600, 200);
  
  plane = createSprite(50,180,20,50);
  plane.addAnimation("running", plane_running);
  plane.addAnimation("collided" , plane_collided)
  plane.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  gameover=createSprite(300,100)
 
  gameover.addImage(goImg)
 
  gameover.scale=0.5
  
  gameover.visible=false
 
  
 
  obstaclesGroup = createGroup();
 
  console.log("Hello" + 5);
  
  plane.setCollider("circle",0,0,40);
  plane.debug = true
  
  score = 0
}

function draw() {
  background(180);
 
  
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
   
    ground.velocityX = -4;
    
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("up_arrow")&& plane.y >=100) {
        plane.velocityY = -15;
    }
    
    
    plane.velocityY = plane.velocityY + 0.8
  
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(plane)){
        gameState = END;

    }
  }
   else if (gameState === END) {
     gameover.visible=true
     
     plane.changeAnimation('collided')
     plane.velocityY=0
      ground.velocityX = 0;
      obstaclesGroup.setLifetimeEach(-1)
     
     obstaclesGroup.setVelocityXEach(0);
     
   }
  
 
  
 
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle1);
              break;
      case 3: obstacle.addImage(obstacle1);
              break;
      case 4: obstacle.addImage(obstacle1);
              break;
      case 5: obstacle.addImage(obstacle1);
              break;
      default: break;
    }
   
   
              
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
  
    obstaclesGroup.add(obstacle);
 }
}


