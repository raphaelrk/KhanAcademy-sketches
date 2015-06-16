// https://www.khanacademy.org/computer-programming/sol/5364335272656896

/**
 * worms
 * By Raphael Rouvinov-Kats
 * 
 * My attempt at http://beesandbombs.tumblr.com/post/79110959965/worms
 * By Bees & Bombs
 * */

frameRate(0);

var strands = 32;
var dAng = 1/strands*360;

var res = 4;
var period = 10;
var speed = 4;
var amp = 5;

var draw = function() {
    background(0, 0, 0);
    dAng = 1/strands*frameCount;
    //println(this.__frameRate);
    
    stroke(255, 255, 255);
    strokeWeight(2);
    translate(width/2, height/2);
    for(var strand = 0; strand < strands; strand++) {
        rotate(dAng);
        
        var inv = strand % 2 === 0 ? 1 : -1;
        for(var y = 75; y < 191; y+=res) {
            var y1 = y;
            var y2 = y + res;
            
            var x1 = sin(period*y1 - frameCount*speed)*amp*inv;
            var x2 = sin(period*y2 - frameCount*speed)*amp;
            
            line(x1, y1, x2, y2);
        }
    }
    translate(-width/2, -height/2);
    
    /*
    // inner black circle
    fill(0, 0, 0);
    ellipse(width/2, height/2, 150, 150);
    
    // outer black circle
    
    noFill();
    stroke(0, 0, 0);
    strokeWeight(110);
    ellipse(width/2, height/2, 500, 500);*/
};
