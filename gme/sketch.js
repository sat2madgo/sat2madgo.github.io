var man,obs;
var kc=0;
function setup() {
  createCanvas(windowWidth,windowHeight);
  background(51);
 // noStroke();
 // noLoop();
    man=new Mover(40, 40, 0);
  obs= new Obstacle(random(3, 10));
  
}

function draw() {
 background(127);
// Gravity is scaled by mass here!
   // let gravity2 = createVector( -0.1* obs.mass,0);
	// Apply gravity
   // obs.applyForce(gravity2);
    // Update and display
    obs.update();
    obs.display();
    if(!obs.checkEdges()){
	obs= new Obstacle(random(3, 10));
	}
    
 // Gravity is scaled by mass here!
    let gravity = createVector(0, 0.1* man.mass);
	// Apply gravity
    man.applyForce(gravity);
    // Update and display
    man.update();
    man.display();
    man.checkEdges();
	if((man.position.x+16)>=obs.position.x & (man.position.y+16)>=obs.position.y ){
	console.log("Killed");
	obs= new Obstacle(random(3, 10));
	document.getElementById("ded").innerText=kc++;
	}
}
function touchStarted() {
  var gravity = createVector(0, -3* man.mass);
	// Apply gravity
    man.applyForce(gravity);
	// Update and display
    man.update();
    man.display();
    man.checkEdges();
  // prevent default
  return false;
}
function keyPressed() {
  let keyIndex = -1;
 if(key==" "){
 var gravity = createVector(0, -3* man.mass);
	// Apply gravity
    man.applyForce(gravity);
	// Update and display
    man.update();
    man.display();
    man.checkEdges();
 }
  }
