// https://www.khanacademy.org/computer-programming/flower/5157950000201728

var rChange = 30;
var dChange = 10;

translate(200, 200);
noStroke();
var draw = function() {
    background(255, 255, 255);
    for(var d = 100; d > 0; d -= dChange) {
        for(var r = 0; r < 360; r += rChange) {
            pushMatrix();
            
                rotate(r - rChange/4 + frameCount*d/20);
                
                fill(0, 0, 0);
                rect(d, d, d+dChange, dChange);
                
                fill(255, 191, 191);
                ellipse(0, d, rChange/2, dChange);
                
                rotate(rChange/2);
                
                fill(255, 218, 69);
                ellipse(0, d, rChange/2, dChange);
                
            popMatrix();
        }
    }
};
