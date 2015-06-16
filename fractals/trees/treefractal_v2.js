// https://www.khanacademy.org/computer-programming/tree-fractal-v2/2367763251

/**
 * Raphael Rouvinov-Kats
 * I realized how complicated I made my original program
 * after seeing John Resig's tree generator..
 * https://www.khanacademy.org/cs/tree-generator/822944839
 * I twiddled with rotate and translate and (finally) 
 * figured them out!
 * Here is my much "simplified" version of my fractal tree
 * program, based on John Resig's program and my own
 * */
 
var startX = 200;
var startY = 380;
var startLength = 70;
var startWeight = 7.5;
var startAngle = 88;

var iterations = 7;
var angleBetweenBranches = 20;
var numSplits = 3;

var leafLength = 40;

var weightMultMin = 0.7;
var weightMultMax = 0.9;
var weightAddMin = -0.2;
var weightAddMax = 0.2;
var weightMin = 0.1;

var branchLengthMinMultiplier = 0.7;
var branchLengthMaxMultiplier = 0.95;
var branchLengthMinAddition = -5;
var branchLengthMaxAddition = 5;  

var tiltMin = -20; // added to rotation ccw
var tiltMax = 20;

var clouds = true;
var BGgrass = true;
var FGgrass = true;

var left = function(angle) {
    //debug("left");
    rotate(-angle);
};

var right = function(angle) {
    //debug("right");
    rotate(angle);
};

var forward = function(length) {
    //debug("forward");
    line(0, 0, 0, length);
    translate(0, length);
};

var back = function(length) {
    //debug("back");
    translate(0, -length);
};

var drawTree = function(depth, length, weight) {
    //debug("depth: " + depth);
    if(depth === 0) {
        return;
    }
    
    stroke(125 + random(-20, 20), // branch stroke
            77 + random(-10, 10),
            26 + random(-20, 20));
    if(length < leafLength) { // leaf stroke
        stroke(53 + random(-30, 30), 
                99 + random(-30, 30), 
                22 + random(-30, 30));
    }
    
    strokeWeight(weight);
    
    var weightMult = random(weightMultMin, weightMultMax);
    var weightAdd = random(weightAddMin, weightAddMax);
    
    weight = weight * weightMult + weightAdd;
    if(weight < weightMin) {
        weight = weightMin;
    }
    
    // here's where it all gets done!
    // it moves forward, rotates itself counterclockwise
    // draws branches from left to right
    // and rotates and moves itself back
    
    forward(length);
    
    var totalAngle = angleBetweenBranches*(numSplits - 1);
    
    left(totalAngle / 2);
    
    for(var i = 0; i < numSplits ; i++) {
        var blMult = random(branchLengthMinMultiplier, 
                            branchLengthMaxMultiplier);
        var blAdd = random(branchLengthMinAddition,
                            branchLengthMaxAddition);
        
        var tilt = random(tiltMin, tiltMax);
        left(tilt);
        
        drawTree(depth - 1, length * blMult + blAdd, weight);
        
        right(angleBetweenBranches + tilt);
    }
    
    left(totalAngle / 2 + angleBetweenBranches);
    
    back(length);
};

var drawClouds = function(amt) {
    for(var i = 0; i < amt; i++) {
        var x = random(0, 400);
        var y = random(0, 200);
        var overallSize = random(80, 100);
        var indSize = random(30, overallSize);
        noStroke();
        fill(255, 255, 255);
        for(var j = 5; j < 10; j++) {
            ellipse(x + random(-overallSize + indSize), 
                    y + random(overallSize - indSize)/
                        random(2, 5), 
                    indSize, indSize/random(1.5, 2.5));
        }
    }
};
    
var drawGradient = function(c1, c2, splits, x, y, w, h) {
    noStroke();
    for(var i = 1; i <= splits; i++) {
        fill(red(c1) - i/splits*(red(c1)-red(c2)), 
             green(c1) - i/splits*(green(c1)-green(c2)),
             blue(c1) - i/splits*(blue(c1)-blue(c2)));
        rect(x, y + h/splits * (i - 1),
             w, h/splits + 1);
    }
};
    
var drawBGGrass = function(height, c1, c2) {
    
    for(var y = 1; y < height; y+=random(4, 5)) {
        for(var x = 0; x < 400; x+=random(y/15, y/10)) {
            stroke(c1);
            stroke(c2);
            
            stroke(red(c1) - y/height*(red(c1) - red(c2)), 
                   green(c1)-y/height*(green(c1)-green(c2)),
                   blue(c1)- y/height*(blue(c1)- blue(c2)));
            
            strokeWeight(random(0.5, 1.5)*y/5);
            var slant = random(-3, 3)*y/10;
            var len = random(5, 10)*y/10;
            var y1 = 400 - height * 2 + y*2 + random(-0, 4);
            line(x, y1, x + slant, y1 - len);
        }
    }
};

var drawFGGrass = function(height) {
    for(var x = 0; x < 400; x+= random(1, 3)) {
        stroke(31, 148 + random(-30, 30), 43);
        strokeWeight(random(1, 10));
        line(x, 400, x + random(-4, 4), 400 - random(5, 30));
    }
};

// background
background(219, 244, 255);
drawGradient(color(156, 230, 205), color(25, 150, 44), 5, 0, 400 - 72, 400, 72);

if(clouds) {
    drawClouds(7);
}

if(BGgrass) {
    drawBGGrass(36, 
        color(156, 230, 205), color(25, 150, 44));
}

// tree
translate(startX, startY); // starting position
stroke(255, 255, 255);
rotate(180); // face up, not down
rotate(90 - startAngle);

drawTree(iterations, startLength, startWeight);

// extra grass
if(FGgrass) {
    rotate(180);
    rotate(-90 + startAngle);
    translate(-startX, -startY);
    drawFGGrass(50);
}
