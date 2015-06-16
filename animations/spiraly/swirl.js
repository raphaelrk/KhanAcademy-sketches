// https://www.khanacademy.org/computer-programming/swirl/4660155366506496

/**
 * SWIRL
 * By Raphael Rouvinov-Kats
 * 8/9/2014
 * 
 * Just a bunch of circles following each other :)
 * */

/** Global Variables **/
var circleAmount = 1000;
var baseCircleSize = 2;
var circleSizeMultiplier = -baseCircleSize/circleAmount;
var tightness = 0.71;

/** Objects **/
var Circle = function(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
};

// create an array of circles
var circs = [];
for(var i = 0; i < circleAmount; i++) {
    var x = random(0, 400);
    var y = random(0, 400);
    var r = i*circleSizeMultiplier + baseCircleSize;
    circs.push(new Circle(x, y, r));
}

/** Functions **/
Circle.prototype.draw = function() {
    noStroke();
    ellipse(this.x, this.y, this.r*2, this.r*2);
};

frameRate(60);
colorMode(HSB);
var draw = function() {
    // background
    background(frameCount % 255, 106, 106);
    
    // position smallest circle at mouse cursor
    circs[0].x = cos(frameCount*8) * 200 + 200;
    circs[0].y = sin(frameCount*8) * 200 + 200;
    
    // make each circle drawn toward the next
    for(var i = 1; i < circs.length; i++) {
        var circle0 = circs[i-1];
        var circle1 = circs[i];
        
        var dx = circle0.x - circle1.x;
        var dy = circle0.y - circle1.y;
        
        circle1.x += dx * tightness;
        circle1.y += dy * tightness;
    }
    
    // draw each circle
    for(var i = 0; i < circs.length; i++) {
        circs[i].draw();
    }
};
