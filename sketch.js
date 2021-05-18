var ball;
var position,database
function setup(){

    //name spaceing firebase.database()to database
    database=firebase.database()

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //before reading writing,updating or deleting we need to always refer to the node to the database
    //.ref() - is used to referring to a particular node in the database
    //ball/position/x and y
    var ballposition= database.ref("ball/position")

    //.on() - is used to read data from database 
    //"value" - is written to get the value of the node and not the name of the node
    ballposition.on("value",readPosition,showerror)    
}



function draw(){
    background("white");

    if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
}
    drawSprites();

}

//Read the data from the database
function readPosition(data){
    //.val() - which will return us the data stored in our node(x and y)
    position = data.val() //value
    console.log(position) //position variable will contain both  x and y values
    ball.x = position.x;
    ball.y=position.y;
}

//Writing to the database
function changePosition(x,y){    
    //.set() - to write the value to the database and accepts values in JSON format
    database.ref("ball/position").set({
        x:position.x+x,
        y:position.y+y
        
    })
}


function showerror(){
    console.log("Error in connecting to the firebase")
}
