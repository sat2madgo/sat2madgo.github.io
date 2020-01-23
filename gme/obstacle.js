
function Obstacle(m) {
  this.mass = m;
  
  this.position = createVector(xSize-this.mass*6, ySize-this.mass*12);
  //this.velocity = createVector(-random(3,9), 0);
  this.velocity = createVector(-5, 0);
  this.acceleration = createVector(0, 0);
}

// Newton's 2nd law: F = M * A
// or A = F / M
Obstacle.prototype.applyForce = function(force) {
  let f = p5.Vector.div(force, this.mass);
  this.acceleration.add(f);
  debugger;
};

Obstacle.prototype.update = function() {
  // Velocity changes according to acceleration
  this.velocity.add(this.acceleration);
  // position changes by velocity
  this.position.add(this.velocity);
  // We must clear acceleration each frame
  this.acceleration.mult(0);
};

Obstacle.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  fill(255,127);
  rect(this.position.x, this.position.y, this.mass*6, this.mass*12);
};

// Bounce off bottom of window
Obstacle.prototype.checkEdges = function() {
  if (this.position.x < 0) {
    // A little dampening when hitting the bottom
    return false;
  }
  return true;
};

