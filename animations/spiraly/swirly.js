// https://www.khanacademy.org/computer-programming/swirly/5497487729623040

/**
 * Swirly
 * By Raphael Rouvinov-Kats
 * 
 * Failed attempt at an illusion
 * */

colorMode(RGB);
frameRate(0);
var draw = function() {
    //var r = (frameCount % (360*3))/3 + random(-0.1, 0.1);
    //
    //for(var d = 0; d < 280; d++) {
    //    pushMatrix();
    //        rotate(r);
    //        var re =500000/(7.1*max(0, d + 0.17512*cos(r*100)))%255+100;
    //        var g = (7.1*max(0, d + 10*sin(r*100)))%255;
    //        var b = (9.2*(255-min(255, d + 10*sin(r*100))))%255;
    //        stroke(re, g, b);
    //        point(0, d);
    //    popMatrix();
    //}
    
    var x = frameCount % 400;
    
    for(var y = 0; y < 400; y++) {
        if(frameCount > 400) {
            x = random(0, 400);
        }
        var d = dist(200, 200, x, y);
        var r =atan2(y - 200, x - 200);
        
        var re =500000/(7.1*max(0, d + 0.17512*cos(r*100)))%255+100;
        var g = (7.1*max(0, d + 10*sin(r*100)))%255;
        var b = (9.2*(255-min(255, d + 10*sin(r*100))))%255;
        stroke(re, g, b);
        point(x, y);
    }
    
};
