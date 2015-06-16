// https://www.khanacademy.org/computer-programming/fun-spiral/5885551924740096

translate(200,200);
var draw = function() {
    rotate(frameCount);
    for(var i = 0; i < 10; i++) {
        rotate(360/10);
        for(var j = 0; j < 10; j++) {
            ellipse(0, j/10*280, 10, 10);
        }
    }
};
