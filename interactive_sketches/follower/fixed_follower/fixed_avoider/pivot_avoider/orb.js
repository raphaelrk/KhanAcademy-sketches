// https://www.khanacademy.org/computer-programming/orb/6052907631771648

var mouseMoved = function() {
    background(218, 240, 216);
    for(var y = 40; y < 380; y+= 20) {
        for(var x = 40; x < 380; x += 20) {
            pushMatrix();
            translate(x, y);
            
            var xdiff = mouseX - x;
            var ydiff = mouseY - y;
            
            var dot = xdiff;
            var mags = dist(0, 0, xdiff, ydiff);
            
            var angle = acos(dot/mags);
            
            if(ydiff < 0) {
                angle = 1 - angle;
            }
            
            rotate(angle);
            strokeWeight(1.0);
            var l = 400 * sqrt(2);
            line(-10, -l, 10, l);
            popMatrix();
        }
    }
};
mouseX = 200;
mouseY = 200;
mouseMoved();
