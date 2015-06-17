// https://www.khanacademy.org/computer-programming/colorweb/5652771869032448

colorMode(HSB, 840);

var mouseMoved = function() {
    background(0, 0, 0);
    for(var y = 0; y < 420; y+= 10) {
        for(var x = 0; x < 420; x += 10) {
            var xdiff = mouseX - x;
            var ydiff = mouseY - y;
            var mag = dist(0, 0, xdiff, ydiff);
            var brightness = 840 - mag * 10;
            
            if(brightness > 100) {
                pushMatrix();
                translate(x, y);
                var dot = xdiff;
            
                var angle = acos(dot/mag);
                
                if(ydiff < 0) {
                    angle = 1 - angle;
                }
                
                rotate(angle);
                stroke(x+y + ((x+y < 150) ? (x+y)*1000 : 0), 
                        840, 
                        brightness);
                strokeWeight(0.5);
                var l = 400 * sqrt(2);
                line(-10, -l, 10, l);
                popMatrix();
            }
        }
    }
};
mouseX = 200;
mouseY = 200;
mouseMoved();
