// https://www.khanacademy.org/computer-programming/orbiters/5785899596513280

/**
 * Orbiters
 * Code by Raphael Rouvinov-Kats
 * 
 * my attempt at http://beesandbombs.tumblr.com/post/45513650541/orbiters
 * */

var N = 20;

frameRate(60);
fill(0, 0, 0, 0);
var draw = function() {
    background(250);
    for(var r = -1; r <= N; r ++) {
        for(var c = -1; c <= N; c++) {
            var x = 400/N * (c + 0.5);
            var y = 400/N * (r + 0.5);
            pushMatrix();
                translate(x, y);
                strokeWeight(1);
                ellipse(0, 0, 700/N, 700/N);
            
                rotate(frameCount*5 + (x + y)*1.1);
                strokeWeight(6);
                point(0, 700/N/2);
            popMatrix();
        }
    }
};
