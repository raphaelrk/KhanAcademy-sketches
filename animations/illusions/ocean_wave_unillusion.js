// https://www.khanacademy.org/computer-programming/ocean-wave-unillusion/4578540586532864

/**
 * Ocean Wave unillusion
 * by Raphael Kats
 * idea from http://dvdp.tumblr.com/post/52563487952/130609-making-my-first-steps-in-processing-better by dvdp
 * */

var bgColor = color(0, 0, 0);
var lineColor = color(255, 255, 255);
var s = 16; // size of line. controls amount of lines, too
frameRate(30);
var speed = 15;

background(bgColor);
var draw = function() {
    background(bgColor);
    for(var y = s; y <= 400 - s; y += s) {
        for(var x = s; x <= 400 - s; x += s) {
            pushMatrix();
                translate(x, y);
                rotate(-(x+y) + frameCount*speed);
                stroke(lineColor);
                strokeWeight(2);
                line(-s/3, 0, s/3, 0);
            popMatrix();
        }
    }
};
