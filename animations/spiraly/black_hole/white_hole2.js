// https://www.khanacademy.org/computer-programming/white-hole/5907573677490176

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
        point(10+i, 0);
    }
};
