// https://www.khanacademy.org/computer-programming/moving/5356567134208000

var draw = function() {
    background(218, 240, 216);
    for(var y = 20; y < 400; y+= 40) {
        for(var x = 20; x < 400; x += 40) {
            pushMatrix();
            translate(x, y);
            
            var xdiff = 200 + 200 * cos(millis()/8) - x;
            var ydiff = 200 + 200 * sin(millis()/8) - y;
            
            var dot = xdiff;
            var mags = dist(0, 0, xdiff, ydiff);
            
            var angle = acos(dot/mags);
            
            if(ydiff < 0) {
                angle = 1 - angle;
            }
            
            rotate(angle);
            strokeWeight(3);
            line(-142, 0, -50, 20);
            popMatrix();
        }
    }
};
