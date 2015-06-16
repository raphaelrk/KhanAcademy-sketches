// https://www.khanacademy.org/computer-programming/radical/6273364121878528

/**
 * Radical
 * Program by Raphael-Rouvinov Kats
 * */
var shapeSize = 5;

var draw = function() {
    noStroke();
    
    // bg
    background(0, 0, 0);
    
    
    
    // loop through every magnitude and 360 degrees
    for(var r = 290; r >= 0; r -= 10) {
        fill(0, 0, 0);
        if(r/10 % 10 % 2 === 1) {
            fill(255, 255, 255);
        }
        ellipse(200, 200, r*2, r*2);
        
        var angDiff = 40;
        
        for(var ang = 0; ang < 360; ang += angDiff) {
            pushMatrix();
                // move to canvas center
                translate(200, 200);
                
                // rotate by angle, time, and magnitude
                rotate(ang + r*0.001*millis() % 360);
                
                // move to shape center
                translate(0, -r);
                
                // fill shape color
                //fill(sin(frameCount)*127 + 127, -sin(frameCount)*127 + 127, cos(frameCount)*127 + 127);
                
                fill(255, 255, 255);
                if(r/10 % 10 % 2 === 1) {
                    fill(0, 145, 255);
                }
                
                // draw shape
                //ellipse(0, 0, shapeSize, shapeSize);
                //rect(-shapeSize/2, 0, shapeSize, shapeSize);
                arc(0, 0, r*4, r*4, 90, 90 + angDiff/4);
                
                //fill(0, 0, 0, 200);
                
                //arc(1, -1, r*4, r*4, -180, 0);
            popMatrix();
        }
    }
};
