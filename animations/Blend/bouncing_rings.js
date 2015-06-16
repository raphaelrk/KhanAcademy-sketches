// https://www.khanacademy.org/computer-programming/bouncing-rings/5856780737839104

/**
 * Blend
 * By Raphael Rouvinov-Kats
 * 
 * An experiment to see how colors look when blended by changing
 * their opacity
 * */

// VARIABLES! Feel free to mess with them
var dotsAmount = 36 * 14+1; // how many dots
var dotDiam = 15; // diameter of dots
var maxRadius = 164; // how far out the dots go
var speed = 0.4; // multiplier to how fast the dots move
var opacity = 100; // opacity of dots
var gap = 18*64; // frames it takes for one dot to go
                            // to the next one's position

frameRate(60);
colorMode(HSB);
var draw = function() {
    // background
    background(255, 0, 250);
    
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
