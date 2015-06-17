// https://www.khanacademy.org/computer-programming/sunflower/6599667303317504

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
    fill(224, 183, 18);
    ellipse(200, 200, holeY*5, holeY*5);
    for(var i = 0; i < stars.length; i += 1) {
        pushMatrix();
            translate(200, 200);
            rotate(frameCount + stars[i][0]);
            fill(stars[i][1]);
            noStroke();
            triangle(10, holeY, 
                    -10, holeY, 
                    0, holeY + (staramt - i)*3/2);
        popMatrix();
    }
    shiftArr(stars);
};
