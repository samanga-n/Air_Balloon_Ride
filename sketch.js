var ball;
var balloon,database;
var position;

function preload(){
   balloonImage = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png");
   bgImage = loadImage("images/Hot Air Ballon-01.png");
}
function setup(){
    database=firebase.database();
    //console.log(database);
    createCanvas(700,700);
    balloon = createSprite(250,250,10,10);
    // balloon.shapeColor = "red";
    balloon.addAnimation("bb",balloonImage);
    balloon.scale=0.5;

    var balloonPosition=database.ref('balloon/position');
    balloonPosition.on("value",readPosition,showError);
}

function draw(){
    background(bgImage);
    if(position!=undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    } 
}

function writePosition(x,y){
   database.ref('balloon/position').set({
       'x' : position.x+x,
       'y' : position.y+y
   })
}


function readPosition(data){
    position=data.val();
    console.log(position.x);
    balloon.x=position.x;
    balloon.y=position.y;
}
function showError(){
    console.log("Error in writing to the database");
  }
