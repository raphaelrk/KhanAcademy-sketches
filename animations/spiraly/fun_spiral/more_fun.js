// https://www.khanacademy.org/computer-programming/more-fun/4666520551030784

translate(200,200);
var draw = function() {
    rotate(frameCount);
    for(var i = 0; i < 10; i++) {
        rotate(360/10);
        for(var j = 0; j < 10; j++) {
            ellipse(0, j/10*280 + frameCount%(280/10), j, j);
        }
    }
};
