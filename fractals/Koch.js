// https://www.khanacademy.org/computer-programming/koch/2228679466

/**
 * Koch
 * By Raphael Rouvinov-Kats
 * */
var coverMode = true;
var sameColorMode = true;
var startBLeftX = 50;
var startBLeftY = 275;
var sideLength = 300;

var Triangle = function(x1, y1, x2, y2, x3, y3) {
    this.x1 = x1; // left
    this.y1 = y1;
    this.x2 = x2; // middle
    this.y2 = y2;
    this.x3 = x3; // right
    this.y3 = y3;
    var r = sin(x1+y2)*127+127;
    var g = cos(x2+y3)*127+127;
    var b = sin(x3+y1)*127+127;
    var upsideDown = (y1 < y2);
    
    var subTriangles = [];
    
    this.draw = function() {
        fill(r, g, b);
        triangle(x1, y1, x2, y2, x3, y3);
        if(subTriangles.length === 0) {
            noStroke();
            fill(r, g, b);
            triangle(x1, y1, x2, y2, x3, y3);
        } else {
            for(var i = 0; i < subTriangles.length; i++) {
                subTriangles[i].draw();
            }
        }
        if(coverMode) {
            noStroke();
            fill(r, g, b);
            if(sameColorMode) {
                fill(cos(millis()/100) * 127 + 127,
                     sin(millis()/100) * 127 + 127,
                     -cos(millis()/100) * 127 + 127);
            }
            triangle(x1, y1, x2, y2, x3, y3);
        }
    };
    
    // creates 3 triangles coming outside of this one
    // plus 3 inside this one that will sprout 
    // triangles from themselves next iteration
    // inefficiency: sprouts into itself as well
    this.iterate = function() {
      if(subTriangles.length === 0)  {
        var heightThird = (y1 - y2) / 3;// sidelength but can
                                        // be negative
        var widthThird = (x3 - x1) / 3; // equals sideLength
        
        // inner triangles
        subTriangles.push(new Triangle( // left
            x1, y1,
            x1 + sideLength/2, y1-heightThird,
            x1+sideLength, y1));
        subTriangles.push(new Triangle( // middle
            x2-sideLength/2, y2 + heightThird,
            x2, y2,
            x2 + sideLength/2, y2 + heightThird));
        subTriangles.push(new Triangle( // right
            x3 - sideLength, y1, 
            x3 - sideLength/2, y1 - heightThird, 
            x3, y3));
            
        // outer triangles
        subTriangles.push(new Triangle( // left
            x1, y1 - heightThird * 2,
            x1+  sideLength / 2, y1 - heightThird,
            x1 + sideLength, y1 - heightThird * 2));
        subTriangles.push(new Triangle( // middle
            x1 + sideLength, y1,
            x1 + 3/2*sideLength, y1 + sqrt(3)/2*sideLength * ((upsideDown) ? -1 : 1), // to make the middle triangle face
                         // the right way
            x3 - sideLength, y1));
        subTriangles.push(new Triangle( // right
            x3 - sideLength, y3 - heightThird * 2,
            x3 - sideLength / 2, y3 - heightThird,
            x3, y3 - heightThird * 2));
        
      } else {
        for(var i = 0; i < subTriangles.length; i++) {
            subTriangles[i].iterate();
        }
      }
    };
};

var originalTriangle = new Triangle(
     startBLeftX, startBLeftY,
     startBLeftX + sideLength/2, startBLeftX + startBLeftY -
                                 sqrt(3)/2*sideLength,
     startBLeftX + sideLength, startBLeftY);

var iterations = 0;

var draw = function() {
     noStroke();
     fill(cos(millis()/200) * 20 + 230, 
          -cos(millis()/200) * 20 + 230,
          sin(millis()/200) * 20 + 230);
     rect(0, 0, 400, 400);
     originalTriangle.draw();
};

var mousePressed = function() {
    if(iterations < 7) { // put 7 as max..
        iterations++;
        sideLength /= 3;
        originalTriangle.iterate();
    }
};
