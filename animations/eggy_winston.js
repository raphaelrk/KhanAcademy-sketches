// https://www.khanacademy.org/computer-programming/eggy-winston/6572385402617856

/**
 * based on
 * http://dvdp.tumblr.com/post/18569751797/120301
 * */

colorMode(HSB);
var img = getImage("creatures/BabyWinston");

var draw = function() {
    for(var i = 0; i < 400; i++) {
        stroke(random(0, 255), 
            255, 
            255,
            random(0, 255));
        strokeWeight(1);
        line(i, 0, i, 400);
    }
    for(var r = 0; r < 180; r++) {
        pushMatrix();
            translate(200, 300);
            noStroke();
            fill(0, 0, 0);
            // egg shape from http://processing.org/examples/compositeobjects.html
            var s = 2.0;
            beginShape();
            vertex(0, -100*s);
            bezierVertex(25*s, -100*s, 40*s, -65*s, 40*s, -40*s);
            bezierVertex(40*s, -15*s, 25*s, 0, 0, 0);
            bezierVertex(-25*s, 0, -40*s, -15*s, -40*s, -40*s);
            bezierVertex(-40*s, -65*s, -25*s, -100*s, 0, -100*s);
            endShape();
            
            image(img, -img.width / 2, -150);
        popMatrix();
    }
};
