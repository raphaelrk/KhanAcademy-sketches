// https://www.khanacademy.org/computer-programming/perspective/5537308149284864

var draw = function() {
    background(218, 240, 216);
    background(0, 0, 0);
    stroke(255, 255, 255);
    for(var y = 1; y < 500; y+= 1 + y/4) {
        for(var x = -50 - y*3.4; x < 500; x += 20 + abs(200 - x)/23 + (y)/4) {
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
            strokeWeight(1 + y/100);
            line(0, 0, (1 + y/5.1), 0);
            popMatrix();
        }
    }
};
