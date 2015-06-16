// https://www.khanacademy.org/computer-programming/tribal-swirl/6386574401470464

var step = 1;
var maxLen = 280;
var rotateStep = 60;

var fullArc = 360;
frameRate(0);
translate(200, 200);
strokeWeight(0.1);
stroke(0, 0, 0, 10);
var draw = function() {
    var f = frameCount;
    
    rotate(rotateStep*(f%(fullArc/rotateStep)));
    for(var i = 0; i < maxLen; i+=step) {
        rotate(1+f/(360/rotateStep));
        point(0, i);
    }
};
