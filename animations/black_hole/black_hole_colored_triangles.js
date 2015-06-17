// https://www.khanacademy.org/computer-programming/black-hole/6307027022249984

/**
 * Black Hole
 * By Raphael Rouvinov-Kats
 * */
var stars = [];
var staramt = 200;
var holeY = 40;

var generateStar = function() {
    var r = random(0, 360);
    var c = color(random(0, 255), 
                random(0, 255), 
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

var draw = function() {
    background(0, 0, 0);
    for(var i = 0; i < stars.length; i += 1) {
        pushMatrix();
            translate(200, 200);
            rotate(frameCount + stars[i][0]);
            fill(stars[i][1]);
            noStroke();
            triangle(10, holeY + (staramt - i)*3/2, 
                    -10, holeY + (staramt - i)*3/2, 
                    0, holeY + random(-5, 5));
        popMatrix();
    }
    shiftArr(stars);
};
