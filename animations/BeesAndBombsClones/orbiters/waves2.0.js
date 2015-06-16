// https://www.khanacademy.org/computer-programming/waves-20/6136507373453312

// my attempt at http://beesandbombs.tumblr.com/post/45513650541/orbiters

var N = 20;

frameRate(0);
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
            
                rotate(frameCount*5 + x + y);
                strokeWeight(6);
                var dir = 1 - abs(225-((frameCount*5 + x + y) % 360))/360;
                stroke(0, 0, dir*151, 100 * dir & (N*4));
                point(0, 700/N/2);
            popMatrix();
        }
    }
    filter(DILATE);
};
