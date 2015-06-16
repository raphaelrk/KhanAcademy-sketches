/**
 * Adjustable Fractal Drawer
 * By Raphael Rouvinov-Kats
 * */
// if anyone knows how to make it so the circles show and clear themselves but the fractal still shows up, leave me a tip saying how :) thanks!

var circlemode = false; // enable to show circles
                        // disable to show point/fractal
var pointweight = 2; // thickness of the line
var speed = 10; // speed, higher is slower
frameRate(0);

// Adjust these arrays for different fractals!
// Lots of patterns here that make cool results.
// Comment with your favorite setting!
var cirr = [133, 44, 15, 5, 2]; // radius
var cirs = [1, 3, -9,  27, -81]; // speed = how many periods(circles) - 1 an inner circle does as the outer circle does a full orbit. Lots of cool patterns possible here

var cirx = [0, 0, 0, 0, 0]; // x
var ciry = [0, 0, 0, 0, 0]; // y

var screenl = 400;
var hscreenlen = screenl/2;
var t = 0;

fill(0,0,0);
noStroke();
rect(0,0,screenl,screenl);

var draw = function() {
     // background
     fill(0, 0, 0, 1);
     if(circlemode) {
         fill(0, 0, 0, 10);
     }
     noStroke();
     rect(0,0,screenl,screenl);
     
     // static circle
     color(255, 255, 255);
     stroke(255, 255, 255);
     strokeWeight(2);
     ellipse(hscreenlen,hscreenlen,screenl,screenl);
     
     // updates
     t += PI/speed;
     cirx[0] = (hscreenlen-cirr[0]/2)*
                cos(t*cirs[0])+hscreenlen;
     ciry[0] = -(hscreenlen-cirr[0]/2)*
                sin(t*cirs[0]) + hscreenlen;
     
     //cirx[1] = cir1x + cir2r/2*cos(4*t);
     //ciry[1] = cir1y +  cir2r/2*sin(4*t);
     
     for(var i = 1; i < 5; i++) {
         cirx[i] = cirx[i-1] + cirr[i]*cos(cirs[i]*t);
         ciry[i] = ciry[i-1] + cirr[i]*sin(cirs[i]*t);
     }
     
     // drawing inner circles
     if(circlemode) {
         for(var i = 0; i < 5; i++) {
             stroke(255, 255, 255, 80);
             ellipse(cirx[i], ciry[i], cirr[i], cirr[i]);
         }
     }
     
     // draws the point/fractal
     stroke(cos(t)*110 + 134, 100, sin(t)*110 + 134); // color
     strokeWeight(pointweight); // thickness
     point(cirx[4], ciry[4]);
};
