// https://www.khanacademy.org/computer-programming/sort-of-bond-bullet-scene/5060139430182912

var count = 0;
var draw = function() {
    count = min(count + 1, 500);
    background(209, 181, 146);
    {
        if(count > 100 && count < 110) {
            fill(255, 221, 0);
            noStroke();
            ellipse(200, 200, count/9, count/9);
        }
        fill(255, 0, 0, 127);
        noStroke();
        rect(0, 0, 400, 5*count - 600);
    }
    for(var y = 0; y < 500; y+= 10) {
        for(var x = 0; x < 500; x += 10) {
            pushMatrix();
            translate(x, y);
            
            var xdiff = 300+100*cos(min(count*2, 180)) - x;
            var ydiff = 200 - y;
            
            var dot = xdiff;
            var mags = dist(0, 0, xdiff, ydiff);
            
            var angle = acos(dot/mags);
            
            if(ydiff < 0) {
                angle = 1 - angle;
            }
            
            rotate(angle);
            strokeWeight(0.5);
            stroke(0, 0, 0);
            line(0, 100, -100, 0);
            popMatrix();
        }
    }
};
