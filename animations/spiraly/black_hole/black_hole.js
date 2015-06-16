// https://www.khanacademy.org/computer-programming/black-hole/5734005392015360

var step = 1;
var maxLen = 280;
var rotateStep = 1;

var fullArc = 360;
frameRate(0);
translate(200, 200);
var draw = function() {
    var f = frameCount;
    
    rotate(rotateStep*(f%(fullArc/rotateStep)));
    for(var i = 0; i < maxLen; i+=step) {
        rotate(step);
        point(0, i);
    }
};
