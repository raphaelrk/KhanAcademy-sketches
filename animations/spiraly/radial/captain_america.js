// https://www.khanacademy.org/computer-programming/captain-america-star/6450191146680320

/**
 * Captain America Star
 * Program by Raphael-Rouvinov Kats
 * */
var shapeSize = 5;

var draw = function() {
    noStroke();
    
    // bg
    background(0, 0, 0);
    
    // loop through every magnitude and 360 degrees
    for(var r = 290; r >= 0; r -= 10) {
        fill(255, 0, 0, 200);
        if(r/10 % 10 % 2 === 1) {
            fill(255, 255, 255, 200);
        }
        ellipse(200, 200, r*2, r*2);
        
        var angDiff = 90;
        
        for(var ang = 0; ang < 360; ang += angDiff) {
            pushMatrix();
                // move to canvas center
                translate(200, 200);
                
                // rotate by angle, time, and magnitude
                rotate(ang + r*0.001*millis() % 360);
                
                // move to shape center
                translate(0, -r);
                
                // fill shape color
                fill(255, 255, 255, 10);
                if(r/10 % 10 % 2 === 1) {
                    fill(0, 145, 255, 200);
                }
                
                // draw shape
                arc(0, 0, r*4, r*4, 90, 90 + angDiff/4);
            popMatrix();
        }
    }
    
    // star
    pushMatrix();
        translate(200, 200);
        rotate(-0.02*millis() % 360);
        
        fill(255, 255, 255);
        for(var i = 0; i < 5; i++) {
            triangle(0, 100, -40, 0, 40, 0);
            rotate(360/5);
        }
    popMatrix();
};
