// https://www.khanacademy.org/computer-programming/simple-aerial-3d/4542182924222464

var wallColor = color(69, 69, 69, 200);
var bgColor = color(218, 240, 216);

var blockSize = 35;
var wallLength = 1.5;

var px = width/2,
    py = height/2;

var leftDown = false,
    rightDown = false,
    upDown = false,
    downDown = false;

var draw = function() {
    background(bgColor);
    
    var img = getImage("avatars/leafers-seed");
    image(img, px-blockSize/2, py-blockSize/2, blockSize, blockSize);
    
    fill(wallColor);
    noStroke();
    
    for(var y = blockSize/2; y < height; y+= blockSize) {
        for(var x = blockSize/2; x < width; x += blockSize) {
            // top left corner of a box
            var x1 = x;
            var y1 = y;
            
            // upper wall
            var x2 = x + blockSize;
            var y2 = y;
            var x3 = x2 + (x2 - px) * wallLength;
            var y3 = y2 + (y2 - py) * wallLength;
            var x4 = x1 + (x1 - px) * wallLength;
            var y4 = y1 + (y1 - py) * wallLength; 
            quad(x1, y1, x2, y2, x3, y3, x4, y4);
            
            // left wall
            var x2 = x;
            var y2 = y + blockSize;
            var x3 = x2 + (x2 - px) * wallLength;
            var y3 = y2 + (y2 - py) * wallLength;
            var x4 = x1 + (x1 - px) * wallLength;
            var y4 = y1 + (y1 - py) * wallLength;
            quad(x1, y1, x2, y2, x3, y3, x4, y4);
        }
    }
    
    // move
    if(upDown) { py--; }
    if(downDown) { py++; }
    if(leftDown) { px--; }
    if(rightDown) { px++; }
};


var keyPressed = function() {
    if(keyCode === UP) {
        upDown = true;
    }
    if(keyCode === DOWN) {
        downDown = true;
    }
    if(keyCode === LEFT) {
        leftDown = true;
    }
    if(keyCode === RIGHT) {
        rightDown = true;
    }
};

var keyReleased = function() {
    if(keyCode === UP) {
        upDown = false;
    }
    if(keyCode === DOWN) {
        downDown = false;
    }
    if(keyCode === LEFT) {
        leftDown = false;
    }
    if(keyCode === RIGHT) {
        rightDown = false;
    }
};
