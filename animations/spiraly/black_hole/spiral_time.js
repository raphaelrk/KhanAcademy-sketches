// https://www.khanacademy.org/computer-programming/spiral-time/6094060855492608

var step = 0.1;
var maxLen = 280;
var rotateStep = 10;

var fullArc = 360;
frameRate(0);
translate(200, 200);

background(41, 37, 41);
stroke(245, 237, 245, 10);
var draw = function() {
    var f = frameCount;
    
    rotate(rotateStep*(f%(fullArc/rotateStep)));
    for(var i = 0; i < maxLen; i+=step) {
        rotate(step);
        point(0, i);
    }
};
