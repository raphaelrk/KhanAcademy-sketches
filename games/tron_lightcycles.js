// https://www.khanacademy.org/computer-programming/tron-lightcycles/6754316966952960

/**
 * TRON Lightcycles
 * By Raphael Rouvinov-Kats
 * 
 * Just a quick lightcycles implementation
 * 2 player
 * */

// this function creates a Cycle object
var Cycle = function(x, y, dx, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = 0;
    this.color = color;
    this.weight = 3;
};

Cycle.prototype.draw = function() {
    stroke(this.color);
    strokeWeight(this.weight);
    point(this.x, this.y);
};

Cycle.prototype.move = function() {
    this.x += this.dx;
    this.y += this.dy;
};

// colors for the cycles
var cycleColors = [];
var redCycleColor = color(255, 0, 0);
var blueCycleColor = color(0, 255, 255);
cycleColors.push(redCycleColor);
cycleColors.push(blueCycleColor);

// the cycles
var cycles = [];
var redCycle;
var blueCycle;

var createAndAddCycles = function() {
    redCycle = new Cycle(100, 200, 2, redCycleColor);
    blueCycle = new Cycle(300, 200, -2, blueCycleColor);
    cycles[0] = redCycle;
    cycles[1] = blueCycle;
};

createAndAddCycles();

var drawBgAndWalls = function() {
    // background
    background(0, 0, 0);
    
    // walls
    strokeWeight(10);
    stroke(blueCycleColor);
    line(0, 0, 400, 0);
    line(0, 0, 0, 400);
    line(0, 400, 4000, 400);
    line(400, 0, 400, 400);
};

drawBgAndWalls();

// tests whether the cycle is colliding with something
Cycle.prototype.testCollision = function() {
    for(var i = 0; i < cycleColors.length; i++) {
        var overColor = get(this.x + this.dx * 2,
                            this.y + this.dy * 2);
        if(cycleColors[i] === overColor) {
            return true;
        }
    }
    
    return false;
};

var startMenu = true;
var gameOver = false;

var draw = function() {
  if(startMenu) {
        for(var i = 0; i < cycles.length; i++) {
            cycles[i].draw();
        }
      
        fill(255, 255, 255, 10);
        textFont(loadFont("Tahoma", 64), 64);
        text("TRON", 126, 87);
        text("Lightcycles", 53, 159);
        
        fill(255, 255, 255, 1);
        textFont(loadFont("Tahoma", 32), 32);
        text("Click to play", 117, 324);
  }
  else if(!gameOver) {
    // draw the cycles
    for(var i = 0; i < cycles.length; i++) {
        cycles[i].draw();
    }
    
    // move the cycles
    for(var i = 0; i < cycles.length; i++) {
        cycles[i].move();
    }
    
    // check cycle collision
    for(var i = 0; i < cycles.length; i++) {
        var lost = cycles[i].testCollision();
        if(lost) {
            gameOver = true;
        }
    }
  } else { // if game over
    fill(255, 255, 255, 10);
    textFont(loadFont("Tahoma", 64), 64);
    text("GAME OVER", 27, 100);
    
    fill(255, 255, 255, 1);
    textFont(loadFont("Tahoma", 32), 32);
    text("Click to play again", 75, 342);
  }
};

var keyPressed = function() {
    // move red left
    if(key.toString() === 'a' && redCycle.dx === 0) {
        redCycle.dx = -abs(redCycle.dy);
        redCycle.dy = 0;
    }
    // move red right
    if(key.toString() === 'd' && redCycle.dx === 0) {
        redCycle.dx = abs(redCycle.dy);
        redCycle.dy = 0;
    }
    // move red up
    if(key.toString() === 'w' && redCycle.dy === 0) {
        redCycle.dy = -abs(redCycle.dx);
        redCycle.dx = 0;
    }
    // move red down
    if(key.toString() === 's' && redCycle.dy === 0) {
        redCycle.dy = abs(redCycle.dx);
        redCycle.dx = 0;
    }
    
    // move blues left
    if(keyCode === LEFT && blueCycle.dx === 0) {
        blueCycle.dx = -abs(blueCycle.dy);
        blueCycle.dy = 0;
    }
    // move blue right
    if(keyCode === RIGHT && blueCycle.dx === 0) {
        blueCycle.dx = abs(blueCycle.dy);
        blueCycle.dy = 0;
    }
    // move blue up
    if(keyCode === UP && blueCycle.dy === 0) {
        blueCycle.dy = -abs(blueCycle.dx);
        blueCycle.dx = 0;
    }
    // move blue down
    if(keyCode === DOWN && blueCycle.dy === 0) {
        blueCycle.dy = abs(blueCycle.dx);
        blueCycle.dx = 0;
    }
};

var mousePressed = function() {
    if(gameOver || startMenu) {
        // redeclare cycles
        createAndAddCycles();
        
        drawBgAndWalls();
        
        gameOver = false;
        startMenu = false;
    }
};
