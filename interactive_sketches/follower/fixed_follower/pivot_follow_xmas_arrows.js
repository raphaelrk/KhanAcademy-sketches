// https://www.khanacademy.org/computer-programming/christmas-arrows/5949334830972928

var draw = function() {
    background(125, 219, 116);
    point(mouseX, mouseY);
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
            strokeWeight(3);
            line(-10, 0, 10, 0);
            strokeWeight(5);
            point(-10, 0);
            stroke(255, 255, 255);
            point(0, 0);
            stroke(255, 0, 0);
            triangle(5, -5, 5, 5, 15, 0);
            popMatrix();
        }
    }
};
