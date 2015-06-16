// https://www.khanacademy.org/computer-programming/mandelbrot/5026670054998016

/**
 * Mandelbrot
 * Program by Raphael-Rouvinov Kats
 * */
var baseB = 20; //base brightness
var maxB = 500; // brightness of set
var maxIters = 100; // how many iterations done before stopping
var maxItersChange = 5; // how many more iterations allowed for every zoom-in
var maxD = 2; // max distance for mandelbrot before you know it's going out of bounds

colorMode(HSB);
var hueMult = 100;
var sat = 255;
strokeWeight(1);

var lBound = -maxD;
var rBound = maxD;
var tBound = -maxD;
var bBound = maxD;

var blockSize = 3;
var lastClickFrame = 0;

var antialias = false;

var calcIters = function(origX, origY, lastX, lastY, thisIteration) {
    //[new value] = [old-value]^2 + [original-value]
    var newX = origX + lastX*lastX - lastY * lastY;
    var newY = origY + 2*lastX*lastY;
    //newX -= 1/newX;
    //newY -= 1/newY;
    var d = dist(newX, newY, 0, 0);
    
    if(d >= maxD) {
        return [thisIteration, lastX, lastY];
    } else if(thisIteration >= maxIters) {
        return [maxIters, lastX, lastY];
    } else {
        return calcIters(origX, origY, newX, newY, thisIteration+1);
    }
};

var getColAt = function(x, y) {
    var iters = calcIters(x, y, x, y, 1);
    
    var h = map(iters[0], 0, maxIters, 0, 255); 
    var s = sat;
    var b = 255-map(iters[0], 0, maxIters, 0, 255);
    
    return color(h, s, b);
};

var getMedian = function(arr) {
    arr.sort(function(a, b){return b-a;}); // sort array ascending
    if(arr.length % 2 === 0) {
        return (arr[floor(arr.length/2)] + arr[ceil(arr.length/2)])/2;
    } else {
        return arr[ceil(arr.length/2)];
    }
};

frameRate(0);
var draw = function() {
    var frame = frameCount-lastClickFrame;
    var c = frame%400;
    c *= blockSize;
    
    while(c > 400 && blockSize > 1) {
        lastClickFrame = frameCount;
        frame = frameCount-lastClickFrame;
        c = frame%400;
        blockSize--;
        c *= blockSize;
    }
    
    antialias = false;
    if(frame > 400 && blockSize === 1) {
        antialias = true;
    }
    
    noStroke();
    var x = map(c, 0, 400, lBound, rBound);
    for(var r = 0; r < 400; r += blockSize) {
        var y = map(r, 0, 400, tBound, bBound);
        
        if(antialias) {
            x = map(c - 0.25, 0, 400, lBound, rBound);
            y = map(r - 0.25, 0, 400, tBound, bBound);
            var x2 = map(c + 0.25, 0, 400, lBound, rBound) + (rBound - lBound)/400;
            var y2 = map(r + 0.25, 0, 400, tBound, bBound) + (bBound - tBound)/400;
            
            var hsb1 = getColAt(x, y);
            var hsb2 = getColAt(x, y2);
            var hsb3 = getColAt(x2, y);
            var hsb4 = getColAt(x2, y2);
            
            var hues = [hue(hsb1), hue(hsb2), hue(hsb3), hue(hsb4)];
            var sats = [saturation(hsb1), saturation(hsb2), 
                        saturation(hsb3), saturation(hsb4)];
            var bris = [brightness(hsb1), brightness(hsb2), 
                        brightness(hsb3), brightness(hsb4)];
            
            // fill with median
            fill(getMedian(hues), getMedian(sats), getMedian(bris));
            
            //var lerp1= lerpColor(hsb1, hsb2, 0.5);
            //var lerp2= lerpColor(hsb3, hsb4, 0.5);
            //var lerpFinal = lerpColor(lerp1, lerp2, 0.5);
            // fill with mean
            //fill(lerpFinal);
        } else {
            fill(getColAt(x, y));
        }
        
        rect(c, r, blockSize, blockSize);
    }
    if(blockSize > 1 || frame < 800) { // line
        stroke(0, 0, 255, 100);
        line(c + blockSize, 0, c + blockSize, 400);
    }
};

var mouseClicked = function() {
    lBound = map(mouseX-50, 0, 400, lBound, rBound);
    rBound = map(mouseX+50, 0, 400, lBound, rBound);
    tBound = map(mouseY-50, 0, 400, tBound, bBound);
    bBound = tBound + (rBound - lBound);
    maxIters += maxItersChange;
    lastClickFrame = frameCount;
    blockSize = 3;
};
