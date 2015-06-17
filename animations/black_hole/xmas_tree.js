// https://www.khanacademy.org/computer-programming/xmas-tree/6021233120378880

/**
 * xmas tree
 * By Raphael Rouvinov-Kats
 * */
var stars = [];
var staramt = 200;
var holeY = -5;

var generateStar = function() {
    var r = random(0, 360);
    var c = color(random(0, 255), 
                random(127, 255), 
                random(0, 255),
                random(0, 255));
    var w = random(0.5, 20);
    var s = random(1, 5);
    return [r, c, w, s];
};

var generateStars = function(arr, amt) {
    for(var i = 0; i < staramt; i++) {
        arr.push(generateStar());
    }
};

var shiftArr = function(arr) {
    for(var i = 0; i < arr.length; i++) {
        arr[i][0] += arr[i][3]*(staramt - i)/staramt;
    }
    arr.pop();
    arr.unshift(generateStar());
};

generateStars(stars);

// xd and yd are the distance from the center to the inner
// vertex of the triangle
var drawTop = function(xd, yd) {
    arc(0, 0, xd*1.5, yd*1.5, 135, 405);
    arc(0, 0, -xd*1.5, yd*1.5, 135, 405);
    var xr = xd/2;
    var yr = yd/2;
    pushMatrix();
        for(var i = 0; i < 6; i++) {
            var r = (xr*yr)/sqrt(pow(xr*cos(i*60), 2) + 
                                 pow(yr*sin(i*60), 2));
            var lr = 2*pow(xr, 2)/yr;
            pushMatrix();
                translate(0, r);
                triangle(-lr, 0, lr, 0, 0, r*3);
            popMatrix();
            rotate(60);
        }
    popMatrix();
};

var draw = function() {
    background(0, 0, 0);
    //pushMatrix();
    //    translate(200, 50);
    //    drawTop(35*sin(frameCount*8), 30);
    //popMatrix();
    for(var i = 0; i < stars.length; i += 1) {
        pushMatrix();
            translate(200, 50);
            rotate((frameCount + stars[i][0])%60 - 30);
            fill(stars[i][1]);
            noStroke();
            triangle(10, holeY + (staramt - i)*3/2, 
                    -10, holeY + (staramt - i)*3/2, 
                    0, holeY + random(-5, 5));
            fill(238, 255, 0);
        popMatrix();
    }
    
    //pushMatrix();
    //    translate(200, 53);
    //    var ww = 25*sin(frameCount*8)*1.5;
    //    rect(-ww, -ww*2/3, ww*2, ww*4/3);
    //popMatrix();
    shiftArr(stars);
};
