

var xSize=700;
var ySize=200;
var man,obs;
var kc=0;
var obs=[];
var isTouched=false;
var canv;
var alive=true;
var featurez,desc="dont";
// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(canv, cavasReady);

// Create a KNN classifier
const knnClassifier = ml5.KNNClassifier();

// Create a featureExtractor that can extract features of an image
const fx = ml5.featureExtractor('MobileNet', cavasReady);
const classifierX = ml5.imageClassifier('MobileNet');
// Triggers when the video is ready
function cavasReady() {
  console.log('The cavas is ready!');
  featurez = fx.infer(canvas);
  var intv=setInterval(tryAct,1500);
}

function setup() {
  canv=createCanvas(xSize,ySize);
  background(51);
   frameRate(15);
 // noStroke();
 // noLoop();
  

    man=new Mover(40, 40, 0);
addObstacle();
  
}
// Converts canvas to an image
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/jpg");
	image.width=canvas.width;
	image.height=canvas.height;
	return image;
}

function addObstacle(){
  obs.push(new Obstacle(random(6, 10)));
  setTimeout(addObstacle,random(5000,9000));
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
	
	//console.log("man: "+(man.position.x+16)+"-"+(man.position.y+16)+" obs:"+e.position.x+"-"+e.position.y);
	if((man.position.x+16)>=e.position.x & (man.position.y+16)>=e.position.y ){
		alive=false;
	document.getElementById("ded").innerText=kc++;
	
	}else{
	return e;
	}
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


function tryAct(){
	if(alive){
	knnClassifier.addExample(featurez, desc);
	}
	else{
		if(desc=="Jump")
	knnClassifier.addExample(featurez, "dont");
	else
	knnClassifier.addExample(featurez, "Jump");
	}
featurez = fx.infer(canvas);

knnClassifier.classify(featurez, (err, result) => {
  console.log(result); // result.label is the predicted label
  alive=true;
  if(result.label=="Jump"){
	  if(isTouched){
 var gravity = createVector(0, -10* man.mass);
	// Apply gravity
    man.applyForce(gravity);
	// Update and display
    man.update();
    man.display();
    isTouched=man.checkEdges();
 }
 desc="Jump";
  }else{
  console.log("Dont Jump");
  desc="dont";
  }
  
});

}

function touchStarted() {
if(isTouched){
	/*
	// Get a prediction for that image
classifier.classify(canv, (err, result) => {
  console.log(result); // Should output 'dog'
});
*/
// Get the features of an image
/*
classifierX.predict(canvas, (err, result) => {
  console.log(result); // result.label is the predicted label
});*/
const features = fx.infer(canvas);
// Use KNN Classifier to classify these features
knnClassifier.classify(features, (err, result) => {
  console.log(result); // result.label is the predicted label
});
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
  var featuresx = fx.infer(canvas);
  if(key=="j"){
  // Add a new image with a label
//classifier.addImage(convertCanvasToImage(canv.canvas), 'Jump');



// Add an example with a label to the KNN Classifier
knnClassifier.addExample(featuresx, "Jump");
console.log("Jump");
  }
	  if(key=="n"){
		  // Add a new image with a label
//classifier.addImage(convertCanvasToImage(canv.canvas), 'Dont');


// Add an example with a label to the KNN Classifier
knnClassifier.addExample(featuresx, "Dont");
console.log("Dont");
	  }
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
