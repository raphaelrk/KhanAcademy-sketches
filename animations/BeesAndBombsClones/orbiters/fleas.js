// https://www.khanacademy.org/computer-programming/fleas/5047306083106816

// my attempt at http://beesandbombs.tumblr.com/post/45513650541/orbiters

var N = 10;

frameRate(60);
fill(0, 0, 0, 50);
var draw = function() {
    background(250);
    for(var r = -1; r <= N; r ++) {
        for(var c = -1; c <= N; c++) {
            var x = 400/N * (c + 0.5);
            var y = 400/N * (r + 0.5);
            pushMatrix();
                translate(x, y);
                stroke(140, 140, 140);
                strokeWeight(1);
                ellipse(0, 0, 700/N, 700/N);
            
                rotate(frameCount*8 + (x + y)*1.1);
                stroke(255, 255, 255);
                strokeWeight(6);
                point(0, 700/N/2);
            popMatrix();
        }
    }
};
