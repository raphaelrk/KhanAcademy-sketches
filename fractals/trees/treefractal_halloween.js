// https://www.khanacademy.org/computer-programming/halloween-tree-fractal/2320500989

/** HALLOWEEN VERSION **/
/**
 * Tree fractal
 * Written by Raphael Rouvinov-Kats
 * Iteratively and recursively creates a tree based on a 
 * starting trunk of which branches branch off of
 * 
 * CLICK TO CREATE BRANCHES
 * 
 * when editing, create an "oh noes"/error first for speed
 * */

// starting trunk values
var stX = 200;
var stY = 380;
var stLength = 50;
var stAngle = 90; 
var stWidth = 10.0;

// branch change values
var minLengthMultiplier = 0.8; // number that is always
var maxLengthMultiplier = 1; // multiplied to length

var leafLengthCutoff = 20;  // length at which a branch
                            // becomes leaves
                            
var constantLengthChangeMin = 0; // number that is always 
var constantLengthChangeMax = 3; // subtracted from length

var minNegAngleChange = -30; // amount the right branch angle
var maxNegAngleChange = -10; // changes

var minPosAngleChange = 10; // amount the left branch angle
var maxPosAngleChange = 30; // changes

var minWeightChange = 0.1; // how quickly the line thickness
var maxWeightChange = 1.5; // changes
var minWeight = 1.0;

var oddsOfRandomAngleBranch = 1/20; // odds you get an extra 
                                    // branch in an iteration
                                    // that goes in a random
                                    // direction

// berries
var berries = true;
var bSizeMultMin = 0.5; // multipled to branch length to
var bSizeMultMax = 1.5;  // make berry size
var bLikelihood = 1/10; // odds of bearing a berry

// KA leaf image
var leaves = false;
var leaf = getImage("avatars/leaf-green");

// landscape
// to adjust, change the code at the bottom
background(46, 39, 34);
var clouds = true;
var grass_foreground = true;
var grass_bg = true;

// WHERE THE CONSTANTS END AND CODE BEGINS
         
// This is an "object" You create an object and then run
// the program by making it do commands like "draw" itself
// or "iterate" new branches off itself
var Branch = function(x, y, l, a, w) {
    this.x = x;
    this.y = y;
    this.l = l; // length
    this.a = a; // angle
    this.w = w; // stroke weight
    var branches = [];
    var x2;
    var y2;
    
    // make 'a' in the range [0, 360)
    a += 3600;
    a %= 360;
    
    // make sure weight isn't too low
    if(w < minWeight) {
        w = minWeight;
    }
    
    debug(a);
    
    // determine x2 and y2 values
    if(a <= 90) {
        x2 = x + l * cos(a);
        y2 = y - l * sin(a);
    } else if(a <= 180) {
        x2 = x + l * cos(a);
        y2 = y - l * sin(a);
    } else if(a <= 270) {
        x2 = x + l * sin(a);
        y2 = y - l * cos(a);
    } else {
        x2 = x - l * sin(a);
        y2 = y + l * cos(a);
    }
    
    this.draw = function() {
        if(branches.length === 0) {
            
         strokeWeight(w);
            
            // branch color
         stroke(158 + random(-30, 30),
                101 + random(-30, 10),
                41  + random(-30, 30));
         
         line(x, y, x2, y2);
         
         // Where berries are made
         if(berries === true && l < leafLengthCutoff && 
            random(0, 1) < bLikelihood) {
             // berry color
             fill(252, random(73, 192), 73);
             noStroke();
             var bSizeMult = random(bSizeMultMin, 
                                    bSizeMultMin);
             ellipse((x + x2)/2 + random(-l/2, l/2), 
                    (y + y2)/2 + random(-l/2, l/2),
                    l*bSizeMult,
                    l*bSizeMult);
         }
        } else {
            for(var i = 0; i < branches.length; i++) {
                branches[i].draw();
            }
        }
    };
    
    this.iterate = function() {
        if(branches.length === 0) {
            var len = l * random(minLengthMultiplier, 
                      maxLengthMultiplier) - random(
                      constantLengthChangeMin, 
                      constantLengthChangeMax);
            var ang = a + random(minNegAngleChange, 
                                maxNegAngleChange);
            var wid = w - random(minWeightChange,
                                maxWeightChange);
            branches.push(new Branch(
                x2, y2, len, ang, wid));
                
            len = l * random(minLengthMultiplier, 
                      maxLengthMultiplier) - random(
                      constantLengthChangeMin, 
                      constantLengthChangeMax);
            ang = a + random(minPosAngleChange, 
                            maxPosAngleChange);
            wid = w - random(minWeightChange,
                            maxWeightChange);
            branches.push(new Branch(
                x2, y2, len, ang, wid));
                
            if(random(0, 1) < oddsOfRandomAngleBranch) {
                len = l * random(minLengthMultiplier, 
                      maxLengthMultiplier) - random(
                      constantLengthChangeMin, 
                      constantLengthChangeMax);
                ang = random(0, 360);
                wid = w - random(minWeightChange,
                                maxWeightChange);
                branches.push(new Branch(
                    x2, y2, len, ang, wid));
            }
        } else {
            for(var i = 0; i < branches.length; i++) {
                branches[i].iterate();
            }
        }
    };
};

var origBranch = new Branch(stX, stY, stLength, stAngle,
                            stWidth);

if(clouds) {
    for(var i = 3; i < 10; i++) {
        var x = random(0, 400);
        var y = random(0, 200);
        var overallSize = random(80, 100);
        var indSize = random(30, overallSize);
        noStroke();
        fill(0, 0, 0);
        for(var j = 5; j < 10; j++) {
            ellipse(x + random(-overallSize + indSize), 
                    y + random(overallSize - indSize)/
                        random(2, 5), 
                    indSize, indSize/random(1.5, 2.5));
        }
    }
}

if(grass_bg) {
    for(var y = 1; y < 50; y+=random(1, 3)) {
        for(var x = 0; x < 400; x+=random(y/20, y/5)) {
            stroke(156, 230, 205);
            stroke(25, 150, 44);
            
            stroke(0 - y/20*(0-25), 
                   0 - y/20*(0-150),
                   0 - y/20*(0-44));
            
            strokeWeight(random(0.5, 1.5)*y/5);
            var slant = random(-3, 3)*y/10;
            var len = random(5, 10)*y/10;
            var y1 = 360 + y*2 + random(0, 4);
            line(x, y1, x + slant, y1 - len);
        }
    }
}

origBranch.draw();

if(grass_foreground) {
    for(var x = 0; x < 400; x+= random(1, 3)) {
        stroke(31, 148 + random(-50, 30), 43);
        strokeWeight(random(0.5, 2));
        line(x, 400, x + random(-4, 4), 400 - random(5, 30));
    }
}

var mouseClicked = function() {
    origBranch.iterate();
    origBranch.draw();
};
/** BOO **/
