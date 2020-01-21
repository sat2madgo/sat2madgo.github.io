// The brain
let pixelBrain;


var videoSize=500;
var man,obs;
var kc=0;
var obs=[];
var isTouched=false;
var canv;
function setup() {
  canv=createCanvas(videoSize,videoSize);
  background(51);
   frameRate(30);
 // noStroke();
 // noLoop();
  

  // Inputs are total pixels times 3 (RGB)
  let totalPixels = videoSize * videoSize * 4;
  const options = {
    inputs: 5,
    outputs: 1,
    learningRate: 0.01,
    task:'regression',
    debug: true,
  }
  // Create the model
  pixelBrain = ml5.neuralNetwork(options);
  
    man=new Mover(40, 40, 0);
addObstacle();
  
}


function addObstacle(){
  obs.push(new Obstacle(random(6, 10)));
  setTimeout(addObstacle,random(1000,4000));
}
function draw() {
 background(127);
 
 

// Gravity is scaled by mass he
   // let gravity2 = createVector( -0.1* obs.mass,0);
	// Apply gravity
   // obs.applyForce(gravity2);
    // Update and display
	obs=obs.filter(function(e,i){
	 e.update();
    e.display();
    if(e.checkEdges()){
	return e;
	}
	if((man.position.x+16)>=e.position.x & (man.position.y+16)>=e.position.y ){
	document.getElementById("ded").innerText=kc++;
	}else{
	return e;
	}
	});
   
    
 // Gravity is scaled by mass here!
    let gravity = createVector(0, 0.3* man.mass);
	// Apply gravity
    man.applyForce(gravity);
    // Update and display
    man.update();
    man.display();
    isTouched=man.checkEdges();

}
function touchStarted() {
if(isTouched){
  var gravity = createVector(0, -10* man.mass);
	// Apply gravity
    man.applyForce(gravity);
	// Update and display
    man.update();
    man.display();
    isTouched=man.checkEdges();
	}
  // prevent default
  return false;
}
function keyPressed() {
  let keyIndex = -1;
 if(key==" "&isTouched){
 var gravity = createVector(0, -10* man.mass);
	// Apply gravity
    man.applyForce(gravity);
	// Update and display
    man.update();
    man.display();
    isTouched=man.checkEdges();
 }
  }
