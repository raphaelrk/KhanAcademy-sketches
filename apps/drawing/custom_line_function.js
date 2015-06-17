// https://www.khanacademy.org/computer-programming/custom-line-function/6324914611552256

/**
 * Custom line function
 * By Raphael Rouvinov-Kats
 * Made June 2014
 * Updated August 2014
 * 
 * Just took a shot at making my own line function -
 * draws a line by chainging individual pixels
 * 
 * Hold 'e' and drag to erase!
 * */

var pointOn = function(x, y, pix, colour) {
    pix[y*1600 + x*4] = red(colour);
    pix[y*1600 + x*4 + 1] = green(colour);
    pix[y*1600 + x*4 + 2] = blue(colour);
};

var drawLine = function(x1, y1, x2, y2, pix, colour) {
    if(x1 > x2) {
        var t = x1; x1 = x2; x2 = t;
            t = y1; y1 = y2; y2 = t;
    }
    
    var dx = x2 - x1;
    
    if(dx > 0) {
        var dy = y2 - y1;
        var slope = dy/dx;
        var change = abs(dx/dy);
            change = constrain(change, 0.01, 0.5);
        
        for(var x = max(0, x1); x <= min(400, x2); x += change) {
            var y = y1 + (x - x1) * slope;
            pointOn(round(x), round(y), pix, colour);
        }
    } else {
        if(y1 > y2) {
            var t = y1; y1 = y2; y2 = y1;
        }
        
        for(var y = max(0, y1); y <= min(400, y2); y += 0.5) {
            pointOn(round(x1), round(y), pix, colour);
        }
    }
};

frameRate(0);
var draw = function() {
    if (!this.loadPixels) { return; }
    this.loadPixels();
    var pix=this.imageData.data;
    
    if(mouseIsPressed) {
        var lineColour = color(0, 0, 0);
        if(keyIsPressed && key.toString() === 'e') {
            lineColour = color(255, 255, 255);
        }
        drawLine(pmouseX, pmouseY, mouseX, mouseY, 
                                        pix, lineColour);
    }
    
    
    this.updatePixels();
    
    // compare to: (I think custom one's smoother!)
    // line(pmouseX, pmouseY, mouseX, mouseY);
};
