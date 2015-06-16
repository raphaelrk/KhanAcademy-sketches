// https://www.khanacademy.org/computer-programming/sierpinski-triangle/6201303171072000

/**
 * Sierpinski Triangle
 * Modification of Robot nightmare to show the sierpinski triangle
 * Modification by Raphael Rouvinov-Kats
 * 
 * I programmed it to stop after a bit. Hold the mouse or comment out
 * the stop code to make it go further
 * */

/*
Robot nigtmare? This zooms out further and further on an XOR "fractal"...
It does eventually end, when javascript's math freaks out. :)
This started as a test of rect(), but it turns out that rect() is really slow.

"Ones and zeroes everywhere... and I thought I saw a two."
"It was just a dream, Bender. There's no such thing as two."

--Wrath Of Academy
*/

frameRate(100);
loop();
var tick = 0.1;

var draw = function() {
    if (!this.loadPixels) { return; }
    if (tick === 0.1) {
        this.loadPixels();
        //debug(this);
        var pix=this.imageData.data;
        for (var i = 1; i < 640000; i+=4) {
            pix[i] = 0;
            pix[i+1] = 0;
        }
    } else {
        var pix=this.imageData.data;
        var t = tick; // This is a huge perf benefit because global var access
                      // is bizarrely expensive in KA JavaScript.
        for (var x = 0; x < 400; x++) {
            for (var y = 0; y < 400; y++) {
                pix[y*1600+x*4] = ((x*t & y*t) ^ 255);
            }
        }
    }
    this.updatePixels();
    
    // stop code
    if(tick < 82 || mouseIsPressed) {
        tick *= 1.01;
    }
};
