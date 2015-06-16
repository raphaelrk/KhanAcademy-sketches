// https://www.khanacademy.org/computer-programming/shifting-sands/4665700407312384

/**
 * Blend
 * By Raphael Rouvinov-Kats
 * 
 * An experiment to see how colors look when blended by changing
 * their opacity
 * */

// VARIABLES! Feel free to mess with them
var dotsAmount = 36 * 8; // how many dots
var dotDiam = 38; // diameter of dots
var maxRadius = 181; // how far out the dots go
var speed = 3; // multiplier to how fast the dots move
var opacity = 10; // opacity of dots
var gap = 360/dotsAmount*2; // frames it takes for one dot to go
                            // to the next one's position

frameRate(60);
colorMode(HSB);
background(255, 0, 250);
var draw = function() {
    // background
    //background(255, 10, 250);
    
    pushMatrix();
        // move to center
        translate(200, 200);
        
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
