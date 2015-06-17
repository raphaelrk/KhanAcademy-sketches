// https://www.khanacademy.org/computer-programming/superorb/6735978492329984

var mouseMoved = function() {
    background(216, 255, 212);
    for(var y = 0; y < 420; y+= 10) {
        for(var x = 0; x < 420; x += 10) {
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
            strokeWeight(0.3);
            var l = 400 * sqrt(2);
            line(-10, -l, 10, l);
            popMatrix();
        }
    }
};
mouseX = 200;
mouseY = 200;
mouseMoved();
