var balloon,balloonimg;
var backgroundimg;
var database,balloonPos;
var height;



function preload(){
  balloonimg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
  backgroundimg = loadImage("Hot Air Ballon-01.png");

}
function setup() {
  database = firebase.database();

  createCanvas(800,400);
   balloon = createSprite(200, 250,10,10);
   balloon.addAnimation("moving",balloonimg);

   var balloonPos = database.ref('balloon/position');
   balloonPos.on("value",readPosition,showError);


   
}

function draw() {
 

  background(backgroundimg); 
  balloon.scale = 0.5;   
  textSize(30);
 stroke(3);
 fill("black");
 text("Use arrow keys to move Hot Air Balloon !",20,30);
  
  if (keyDown(LEFT_ARROW)){
    updatePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
   updatePosition(0,+1);
  }
  
  drawSprites();
}
function updatePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
  })

}
function readPosition(data){
 position = data.val();

balloon.x = position.x;
 balloon.y = position.y;

}
function showError(){
  console.log("error in writting to database ");
}