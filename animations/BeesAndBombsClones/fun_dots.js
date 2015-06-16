// https://www.khanacademy.org/computer-programming/fun-dots/5658959023308800

/**
 * Fun Dots
 * By Raphael Rouvinov-Kats
 * 
 * My attempt at http://beesandbombs.tumblr.com/post/82380096929/fun-dots
 * By Bees & Bombs
 * */
frameRate(60);

var rows = 8;
var cols = 3; // columns of blue
var ellipseSize = 20;

var dx = 1/cols * 400; // distance between columns of blue

var speed = 30; // higher = slower
var cycleLength = speed * 3;

var draw = function() {
    background(0, 0, 0);
    
    // for performance testing
    // println(this.__frameRate);
    
    // ring/stroke calculations
    var ringSize = map(frameCount%speed, 0, speed, ellipseSize/3, ellipseSize + dx/3);
    var sw = 10 * sin(map(ringSize, ellipseSize/3, ellipseSize + dx/3, -180, 180));
    strokeWeight(sw);
    
    // which color gets the ring calculation
    var blueRing = frameCount % cycleLength < speed;
    var yellowRing = !blueRing && frameCount % cycleLength < (speed*2);
    var redRing = !blueRing && !yellowRing;
    
    for(var r = 0; r < rows+1; r++) {
        var y = r/rows * 400*0.97 + 6;
        
        for(var c = 0; c < cols+1; c++) {
            var x = c*dx;
            
            // shift every other row
            if(r % 2 === 1) { x -= dx/2; }
            
            // blue dot
            fill(76, 207, 255);
            ellipse(x, y, ellipseSize, ellipseSize);
            if(blueRing) {
                noFill();
                stroke(76, 207, 255);
                ellipse(x, y, ringSize, ringSize);
                noStroke();
            }
            
            // yellow dot
            x += dx/3;
            fill(243, 255, 76);
            ellipse(x, y, ellipseSize, ellipseSize);
            if(yellowRing) {
                noFill();
                stroke(243, 255, 76);
                ellipse(x, y, ringSize, ringSize);
                noStroke();
            }
            
            // red dot
            x += dx/3;
            fill(255, 76, 76);
            ellipse(x, y, ellipseSize, ellipseSize);
            if(redRing) {
                noFill();
                stroke(255, 76, 76);
                ellipse(x, y, ringSize, ringSize);
                noStroke();
            }
        }
    }
};
