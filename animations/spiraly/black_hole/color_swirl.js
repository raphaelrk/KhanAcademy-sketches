// https://www.khanacademy.org/computer-programming/color-swirl/4577069044858880

colorMode(HSB, 360);
var step = 0.59;
var maxLen = 280;
var rotateStep = 0.997/7;

var fullArc = 360;
frameRate(0);
translate(200, 200);
strokeWeight(0.1);
var draw = function() {
    var f = frameCount;
    
    rotate(rotateStep*(f%(fullArc/rotateStep)));
    for(var i = 0; i < maxLen; i+=step) {
        stroke((f*rotateStep)%fullArc, fullArc, fullArc-i);
        rotate(step);
        point(0, i);
    }
};
