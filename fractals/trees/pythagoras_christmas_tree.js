// https://www.khanacademy.org/computer-programming/christmas-tree/2411359084

/**
 * Program by Raphael Rouvinov-Kats
 * Pythagoras Tree Fractal
 * */

// change the starting values!

var lAngle = 45; // c-clockwise
var rAngle = 45; // clockwise

var startLength = 60;
var startX = 200;
var startY = 380;

// careful changing these... could freeze your page
var maxIterations = 8;
frameRate(10);

var topAngle = 180 - lAngle - rAngle;
var leftLengthMultiplier = sin(rAngle)/sin(topAngle);
var rightLengthMultiplier = sin(lAngle)/sin(topAngle);

var square = function(length) {
    this.length = length;
    var subSquares = [];
    
    this.selfDraw = function() {
        stroke(240, 166, 17);
            
        fill(150 + random(-50, 50), 
             100 + random(-50, 50),
             25  + random(-50, 50));
        
        var rand = random(0, 1);
        
        if(rand < 1/4) {
            fill(191, 28, 28);
        } else if(rand < 2/4) {
            fill(237, 240, 226);
        } else if(rand < 7/8){
            fill(4, 84, 14);
        } else {
            fill(219, 203, 21);
        }
        
        rect(0, 0, length, -length);
    };
    
    this.subDraw = function() {
        // move up
            translate(0, -length);
                //rotate ccw
                rotate(-lAngle);
              
                  // draw left square
                  subSquares[0].draw(redraw);
                
                //rotate cw
                rotate(lAngle);
              // move right
              translate(length, 0);
                // rotate cw
                rotate(rAngle);
                  // move left
                  translate(-subSquares[1].getL(), 0);
                  
                    // draw right square
                    subSquares[1].draw(redraw);
                  
                  // move right
                  translate(subSquares[1].getL(), 0);
                // rotate ccw
                rotate(-rAngle);
              // move back
              translate(-length, 0);
            // move back down
            translate(0, length);
    };
    
    this.draw = function() {
        this.selfDraw();
        if(subSquares.length !== 0) {
            this.subDraw();
        }
    };
    
    this.iterate = function() {
        if(subSquares.length === 0) {
            subSquares.push(new square(length * 
                    leftLengthMultiplier));
            subSquares.push(new square(length * 
                    rightLengthMultiplier));
        } else {
            subSquares[0].iterate();
            subSquares[1].iterate();
        }
    };
    
    this.getL = function() {
        return length;
    };
};

background(66, 18, 18);
fill(27, 135, 49);
stroke(135, 184, 199);

translate(startX - startLength / 2, startY);
var orig = new square(startLength);
orig.draw();

var iterations = 1;
var draw = function() {
    if(iterations <= maxIterations) {
        orig.iterate();
        orig.draw();
        iterations++;
    } else {
        background(39, 82, 47);
        if(random(0, 1) < 0.1) {
            //background(204, 176, 104);
        }
        orig.draw();
    }
};

var mouseMoved = function() {
};
