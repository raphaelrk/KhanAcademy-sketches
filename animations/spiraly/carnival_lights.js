// https://www.khanacademy.org/computer-programming/carnival-lights/6284853215625216

/**
 * Carnival Lights
 * By Raphael Rouvinov-Kats
 * 
 * What's up Sherry :D
 * */
 
frameRate(35);

colorMode(HSB);
var armLen = 20;
var arms = 11;

textAlign(CENTER);
textSize(60);
var draw = function() {
    background(148, 145, 80);
    
    for(var ang = 0; ang < 360; ang += 360/arms) {
        pushMatrix();
        translate(200, 200);
        rotate(ang + frameCount*2);
        
        for(var c = 0; c < armLen; c++) {
            var x = map(c, 0, armLen, -200 * sqrt(2), -24);
            var y = 0;
            
            if(c % 2 === 0) { // white
                stroke(0, 0, 90);
                if((frameCount + c) % 6 < 3) {
                    fill(0, 0, 255); // on
                } else {
                    fill(0, 0, 90); // off
                }
            } else { // red
                stroke(255, 255, 90);
                if((frameCount + c) % 6 < 3) {
                    fill(255, 255, 255); // on
                } else {
                    fill(255, 255, 90); // off
                }
            }
            
            ellipse(x, y, 10, 10);
        }
        
        popMatrix();
    }
    
    pushMatrix();
        translate(200, 200);
        rotate(frameCount);
        text("♥", 0, 20);
    popMatrix();
};
