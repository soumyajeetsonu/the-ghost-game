var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ghost,ghostImage;
var back,backImage,climber,climberImage,climberGroup,door,doorImage,doorGroup;
var invisibleBlock, invisibleBlockGroup;
function preload(){
  backImage =loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  
}

function setup(){
  createCanvas(600,600);
  
  //create background
  back = createSprite(300,300,600,600);
  back.addImage(backImage);
  
  
//create ghost
 ghost = createSprite(300,300,20,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.5;
  
 doorGroup = new Group();
  climberGroup = new Group();
  
  invisibleBlockGroup = new Group();
}

function draw(){
  background(180);
 spawnDoors();
  if(gameState === PLAY){
   //move the background
    back.velocityY = 3;
    
    //make the ghost jump
     if(keyDown("space")){
    ghost.velocityY = -10;
       
      
  }
     //add gravity
  ghost.velocityY = ghost.velocityY + 0.8;
    
  //make the ghost move right
  if(keyDown(RIGHT_ARROW)){
     ghost.x= ghost.x+ 5;
     }
  
    //make the ghost move left
   if(keyDown(LEFT_ARROW)){
     ghost.x= ghost.x-10;
     }
    
    //scrolling the background 
  if(back.y > 600){
    back.y=300;
     }
    
    //make the ghost stand on the climber
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY = 0;
     }
    
    //make the game end 
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
       gameState = END;
       }
    

  
  drawSprites();
  
  }
  else if(gameState === END){
    //stop the background
    back.velocityY = 0;
    
    textSize(60);
    fill("blue");
    text("Game Over",150,250);
  }
  
   
  
  
 
}

function spawnDoors(){
  if(frameCount%200===0){
     doors = createSprite(Math.round(random(100,500)),0,20,50);
    doors.addImage(doorImage);
    doors.velocityY= 3;
    doors.lifetime = 200;
    doorGroup.add(doors);
    
    climber = createSprite(Math.round(random(100,500)),60,50,50);
   climber.x = doors.x;
    climber.addImage(climberImage);
    climber.velocityY = 3;
    climber.lifetime = 200;
    climberGroup.add(climber);
    climber.scale = 0.8;
    
    invisibleBlock = createSprite(Math.round(random(100,500)),60,50,20);
    invisibleBlock.x = doors.x;
    invisibleBlock.velocityY = 3;
    invisibleBlock.lifetime = 200;
    invisibleBlock.visible = false;
    invisibleBlockGroup.add(invisibleBlock);
    
    doors.depth = ghost.depth;
    ghost.depth += 1;
  }
}

