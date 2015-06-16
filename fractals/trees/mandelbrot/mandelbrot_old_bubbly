// https://www.khanacademy.org/computer-programming/bubbly-mandelbrot-set-color/5996613156208640

var baseB = 20; //base brightness
var maxB = 500; // brightness of set
var maxIters = 40; // how many iterations done before stopping
var maxD = 2; // max distance for mandelbrot before you know it's going out of bounds

colorMode(HSB);
var hueMult = 100;
var sat = 255;
strokeWeight(0.2);

var lBound = -2;
var rBound = 2;
var tBound = -2;
var bBound = 2;

var lastClickFrame = 0;

var calcIters = function(origX, origY, lastX, lastY, thisIteration) {
    //[new value] = [old-value]^2 + [original-value]
    var newX = origX + lastX*lastX - lastY * lastY;
    var newY = origY + 2*lastX*lastY;
    var d = dist(newX, newY, 0, 0);
    
    if(d >= maxD) {
        return [thisIteration, lastX, lastY];
    } else if(thisIteration >= maxIters) {
        return [maxIters, lastX, lastY];
    } else {
        return calcIters(origX, origY, newX, newY, thisIteration+1);
    }
};

frameRate(0);
var draw = function() {
    var c = (frameCount-lastClickFrame)%400;
    var x = c/400*(rBound - lBound) + lBound;
    for(var r = 0; r < 400; r++) {
        var y = r/400*(bBound - tBound) + tBound;
        var iters = calcIters(x, y, x, y, 1);
        
        stroke(map(iters[0], 0, maxIters, 0, 255), 
            sat - dist(0, 0, iters[1], iters[2])*40, 
            255-map(iters[0], 0, maxIters, 0, 255));
        point(c, r);
    }
};

var mouseClicked = function() {
    lBound = map(mouseX-50, 0, 400, lBound, rBound);
    rBound = map(mouseX+50, 0, 400, lBound, rBound);
    tBound = map(mouseY-50, 0, 400, tBound, bBound);
    bBound = map(mouseY+50, 0, 400, tBound, bBound);
    maxIters += 5;
    lastClickFrame = frameCount;
};
