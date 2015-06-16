// https://www.khanacademy.org/computer-programming/visualization-example-2/4958741536702464

/**
 * Visualization Example 2
 * Raphael Rouvinov-Kats
 */

strokeWeight(5);
var draw = function() {
    background(255, 255, 255);
    
    for(var theta = 0; theta < 360; theta += 60) {
        for(var magnitude = 0; magnitude < 250; magnitude += 10) {
            translate(200, 200);
            rotate(theta + frameCount/3 + frameCount*magnitude/80);
            translate(0, magnitude);
            
            point(0, 0);
            
            resetMatrix();
        }
    }
};
