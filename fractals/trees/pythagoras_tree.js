// https://www.khanacademy.org/computer-programming/pythagoras-tree-fractal/2397366600

/**
 * Program by Raphael Rouvinov-Kats
 * Pythagoras Tree Fractal
 * */

// change the starting values!

var lAngle = 45; // c-clockwise
var rAngle = 30; // clockwise

var startLength = 80;
var startX = 180;
var startY = 350;

var maxIterations = 15;


var topAngle = 180 - lAngle - rAngle;
var leftLengthMultiplier = sin(rAngle)/sin(topAngle);
var rightLengthMultiplier = sin(lAngle)/sin(topAngle);

var square = function(length) {
    this.length = length;
    var subSquares = [];
    
    this.draw = function() {
        if(subSquares.length === 0) {
            stroke(240, 166, 17);
            fill(150 + (10 - length/3)/10 * 
                        (112- 150), 
                 100 + (10 - length/3)/10 * 
                        (91 - 100), 
                 25  + (10 - length/3)/10 * 
                        (8  - 25));
            
            if(length < 10) {
                stroke(27, 161, 54);
                fill(79 + random(-30, 30), 
                    191 + random(-30, 30), 
                    42 + random(-30, 30));
            }
            
            
            rect(0, 0, length, -length);
            
            fill(150, 19, 19);
            
        } else {
            // move up
            translate(0, -length);
                //rotate ccw
                rotate(-lAngle);
              
                  // draw left square
                  subSquares[0].draw();
                
                //rotate cw
                rotate(lAngle);
              // move right
              translate(length, 0);
                // rotate cw
                rotate(rAngle);
                  // move left
                  translate(-subSquares[1].getL(), 0);
                  
                    // draw right square
                    subSquares[1].draw();
                  
                  // move right
                  translate(subSquares[1].getL(), 0);
                // rotate ccw
                rotate(-rAngle);
              // move back
              translate(-length, 0);
            // move back down
            translate(0, length);
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

background(242, 252, 255);
fill(27, 135, 49);
stroke(135, 184, 199);
ellipse(200, 400, 1000, 145);

translate(startX - startLength / 2, startY);
var orig = new square(startLength);
orig.draw();

var iterations = 1;
var mouseClicked = function() {
    if(iterations <= maxIterations) {
        //text(iterations, -60+iterations * 15, 10);
        //if(iterations === maxIterations) {
        //    text("limit", -45+iterations * 15, 10);
        //}
        orig.iterate();
        orig.draw();
        iterations++;
    }
};
