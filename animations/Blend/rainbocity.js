// https://www.khanacademy.org/computer-programming/rainbocity/5007497662824448

/**
 * Blend
 * By Raphael Rouvinov-Kats
 * 
 * An experiment to see how colors look when blended by changing
 * their opacity
 * */

// VARIABLES! Feel free to mess with them
var dotsAmount = 36 * 2; // how many dots
var dotDiam = 10; // diameter of dots
var maxRadius = 400*sqrt(2); // how far out the dots go
var speed = 0.5; // multiplier to how fast the dots move
var opacity = 100; // opacity of dots
var gap = 0; // frames it takes for one dot to go
                            // to the next one's position

var drawClover = function(x, y, speed) {
    pushMatrix();
        // move to center
        translate(x, y);
        
        // go through every dot
        for(var i = 0; i < dotsAmount; i++) {
            // rotate to face dot
            rotate(360/dotsAmount);
            
            pushMatrix();
                // move to dot
                var t = frameCount*speed + i*gap;
                translate(0, maxRadius * sin(t));
                
                // set its color
                noStroke();
                fill(255/dotsAmount*i, 255, 255, opacity);
                
                // draw the dot
                ellipse(0, 0, dotDiam, dotDiam);
            popMatrix();
        }
    popMatrix();
};

frameRate(60);
colorMode(HSB);
background(255, 0, 250);
var draw = function() {
    
    for(var r = 0; r < 5; r++) {
        for(var c = 0; c < 5; c++) {
            var x = c * 80 + 40;
            var y = r * 80 + 40;
            drawClover(x, y, speed);
        }
    }
};
