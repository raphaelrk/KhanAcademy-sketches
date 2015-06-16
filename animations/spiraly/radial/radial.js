// https://www.khanacademy.org/computer-programming/radial/4913994287546368

/**
 * Radial
 * Program by Raphael-Rouvinov Kats
 * */
var shapeSize = 5;

var draw = function() {
    noStroke();
    
    // bg
    background(0, 0, 0);
    
    // loop through 360 degrees and every magnitude
    for(var ang = 0; ang < 360; ang += 10) {
        for(var r = 10; r < 290; r += 10) {
            pushMatrix();
                // move to canvas center
                translate(200, 200);
                
                // rotate by angle, time, and magnitude
                rotate(ang + frameCount*0.01*r);
                
                // move to shape center
                translate(0, -r);
                
                // fill shape color
                fill(sin(frameCount)*127 + 127, random(0, 255), cos(frameCount)*127 + 127);
                
                // draw shape
                //ellipse(0, 0, shapeSize, shapeSize);
                rect(-shapeSize/2, 0, shapeSize, shapeSize);
            popMatrix();
        }
    }
};
