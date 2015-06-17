// https://www.khanacademy.org/computer-programming/follower/5281828613128192

var draw = function() {
    background(218, 240, 216);
    for(var y = 20; y < 400; y+= 40) {
        for(var x = 20; x < 400; x += 40) {
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
            line(-(1 + y/5), 0, 5, 0);
            popMatrix();
        }
    }
};
