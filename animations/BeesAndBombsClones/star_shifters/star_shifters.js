// https://www.khanacademy.org/computer-programming/star-shifters/4894656385515520

/**
 * Star Shifters
 * Code by Raphael Rouvinov-Kats
 * 
 * My attempt at http://beesandbombs.tumblr.com/post/83546850181/star-shifters
 * I think it came out pretty well
 * Looking forward to tinkering with this code in the future
 * */
var smallCol = color(28, 28, 28);
var bigCol1 = color(231, 32, 0);
var bigCol2 = color(255, 219, 50);

var bigTriW = 73;

var bigTriH = bigTriW * 3/4;
var smallTriW = bigTriW/2;
var smallTriH = bigTriH/2;

var RIGHTSIDEUP = 0;
var UPSIDEDOWN = 180;

var Triangle = function(orientation, x, y) {
    this.orientation = orientation;
    this.x = x;
    this.y = y;
    
    var col = bigCol1;
    if(orientation !== RIGHTSIDEUP) {
        col = bigCol2;
    }
    
    this.col = col;
};

Triangle.prototype.drawBigTriangle = function() {
    pushMatrix();
        // move to big triangle center
        translate(this.x, this.y);
        
        // rotate if upside-down triangle
        rotate(this.orientation);
        
        // set color for big triangle
        noStroke();
        fill(this.col);
        
        // draw big triangle
        triangle(-bigTriW/2, bigTriH/2, 
                 bigTriW/2, bigTriH/2, 
                 0, -bigTriH/2);
    popMatrix();
};

Triangle.prototype.drawSmallTriangle = function() {
    pushMatrix();
        // move to big triangle center
        translate(this.x, this.y);
        
        // rotate if upside-down triangle
        rotate(this.orientation);
        
        // calculations to move to small triangle center
        var xt=0, yt=0; // xy-translate
        var d = dist(200, 200, this.x, this.y);
        var time = ((frameCount*3 - d/5)%300);
        
        if(time < 50) { // bottom-left to bottom-right (rightsideup)
            xt = map(time, 0, 50, -smallTriW/2, smallTriW/2);
            yt = smallTriH/2;
        }  else if(time < 100) { // bottom-right pause
            xt = smallTriW/2;
            yt = smallTriH/2;
        } else if(time < 150) { // bottom-right to top
            xt = map(time, 100, 150, smallTriW/2, 0);
            yt = map(time, 100, 150, smallTriH/2, -smallTriH/2);
        } else if(time < 200) { // top pause
            xt = 0;
            yt = -smallTriH/2;
        } else if(time < 250) { // top to bottom-left
            xt = map(time, 200, 250, 0, -smallTriW/2);
            yt = map(time, 200, 250, -smallTriH/2, smallTriH/2);
        } else { // bottom-left pause
            xt = -smallTriW/2;
            yt = smallTriH/2;
        }
        
        // move to small triangle center
        translate(xt, yt);
        
        // set color for small triangle
        fill(smallCol);
        
        // draw small triangle
        triangle(-smallTriW/2, smallTriH/2, 
                 smallTriW/2, smallTriH/2, 
                 0, -smallTriH/2);
        rotate(180);
    popMatrix();
};

var getOrientation = function(row, column) {
    var orientation = (row+column)%2; // 0 or 1
        orientation *= UPSIDEDOWN; // RIGHTSIDEUP or UPSIDEDOWN
        
    return orientation;
};

var loopThroughTris = function(action) {
    for(var r = 0; r < 400/bigTriH + 1; r++) {
        for(var c = 0; c < 400/bigTriW * 2 + 1; c++) {
            
            var o = getOrientation(r, c);
            var x = c*bigTriW/2;
            var y = r*bigTriH;
            
            var tri = new Triangle(o, x, y);
            action(tri);
        }
    }
};

draw = function() {
    background(0, 187, 255);
    
    loopThroughTris( function(a){a.drawBigTriangle();} );
    loopThroughTris( function(a){a.drawSmallTriangle();} );
};
