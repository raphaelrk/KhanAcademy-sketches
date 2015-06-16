// https://www.khanacademy.org/computer-programming/tetris/1782938813

// created by Raphael Rouvinov / Kats
/*
 * To do:
 * WASD controls
 * Mobile support
 * Consistent block coloring
 * Main menu
 *
 * Program is set up like this:
 * -Variable/constant declarations
 * -Functions
 *  -getX(), getY()
 *  -getBlock(col, row), setBlock(col, row, value)
 *  -drawShapes(), eraseShapes()
 *  -bottomCollision(), leftCollision(), rightCollision()
 *  -collision()
 *  -rotateBlock()
 *  -keyPressed()
 *  -nextBlock()
 *  -moveDown()
 *  -drawSide(), drawGameOverScreen()
 *  -setDifficulty()
 *  -removeLines()
 * --draw()
 *
 * The variables are all declared/initialized at the top and
 * then draw() calls all the functions that it needs to to
 * run the game
 *
 * Left/right keys to move left/right
 * Up to rotate
 * Down to go faster
 * P or pause button to pause
 * Restart button to restart
 * 
 */
var blockSize = 20;
var borderX = 200;
var row = [0, 0, 1, 1];
var col = [5, 4, 5, 4];
var levelwidth = 10;
var levelheight = 20;
var blockArray = [levelwidth * levelheight];
var time = 0;
var score = 0;
var updateSpeed = 20;
var level = 1;
var linesCleared = 0;
// block constants
  var singleBlock = 0;
  var squareBlock = 1;
  var regularLBlock = 2;
  var backwardsLBlock = 3;
  var zigzagHighLeftBlock = 4;
  var zigzagLowLeftBlock = 5;
  var lineBlock = 6;
  var tBlock = 7;
var currentBlockType = squareBlock;
var currentBlockRotation = 0;//0, 90, 180, 270
                             //this is how many degrees
                             //clockwise it is
var currentBlockColor = 0xff0000;
var nextBlockColor = random() * 255 + 255 * 255 * 255;
var nextBlockType = round(random()*6.49)+1;
var mainMenu = true;
var gameOver = false;
var paused = false;
var mobile = false;
textSize(21);
line(borderX, 0, borderX, 400);
var leftLag = 200;
var rightLag = 200;
var lastLeftPressTime = 0;
var lastRightPressTime = 0;
var lastUpPressTime = 0;
var lastPausePressTime = 0;
for(var r = 0; r < levelwidth - 0; r++) {
    for(var c = 0; c < levelheight - 0; c++) {
        blockArray[r + c * levelwidth] = 0;
    }
}
var getX = function(column) {
    return 200 + column * blockSize;
};
var getY = function(roww) {
    return roww * 20;
};
var getBlock = function(column, rowe) {
    return blockArray[column + rowe * levelwidth];
};
var setBlock = function(column, rowe, value) {
    blockArray[column + rowe * levelwidth] = value;
};
// draws the block
var drawShapes = function() {
    fill(255, 0, 0);
    stroke(0, 0, 0);
    for(var r = 0; r < levelheight; r++) {
        for(var c = 0; c < levelwidth; c++) {
            if(getBlock(c, r) !== 0) {
                var color = getBlock(c, r);
                var blue = color % 255;
                var green = ((color - blue)  % (255^2)) >> 8;
                var red = (color - green - blue) >> 16;
                fill(red, green, blue);
                rect(getX(c), getY(r), blockSize, blockSize);
            }
        }
    }
    //rect(getX(col), getY(row), blockSize, blockSize);
};
// erases the block
var eraseShapes = function() {
    // background equal to a number between 0 and 255
    // depending on current block location and time
    var rowValue = (row[0] * blockSize + 
                    (time - 1) % updateSpeed) * 255 /
                    (levelheight * blockSize);
    var colValue = (col[0] * blockSize + 
                    (time - 1 - updateSpeed / 2) % 
                    updateSpeed) * 255 / 
                    (levelwidth * blockSize);
    fill(rowValue, colValue, 20);
    noStroke();
    rect(borderX, 0, blockSize * levelwidth, 
                     blockSize * levelheight);
};
var bottomCollision = function() {
    for(var i = 0; i < 4; i++) {
        var btmCollisionCol = col[i];
        var btmCollisionRow = row[i] + 1;
        var btmCollisionColor= blockArray[btmCollisionCol + 
                               btmCollisionRow * levelwidth];
        // if at the bottom, there's a bottom collision
        if(btmCollisionRow >= levelheight) {
            return true;
        }
        // if the space below isn't empty
        // and you didn't collide with yourself
        // return true
        if(btmCollisionColor !== 0) {
            var selfcollision = false;
            for(var j = 0; j < 4; j++) {
                if(col[j] === btmCollisionCol && 
                   row[j] === btmCollisionRow) {
                    selfcollision = true;
                    break;
                }
            }
            if(selfcollision === false) {
                return true;
            }
        }
    }
    return false;
};
var leftCollision = function() {
    for(var i = 0; i < 4; i++) {
        // if touching left, there's a left collision
        if(col[i] === 0) {
            return true;
        }
        // check blocks on your left
        if(getBlock(col[i] - 1, row[i]) !== 0) {
            var selfcollision = false;
            for(var j = 0; j < 4; j++) {
                if(col[i] - 1 === col[j] &&
                   row[i] === row[j]) {
                       selfcollision = true;
                }
            }
            if(selfcollision === false) {
                return true;
            }
        }
    }
    return false;
};
var rightCollision = function() {
    for(var i = 0; i < 4; i++) {
        // if touching right, there's a right collision
        if(col[i] === 9) {
            return true;
        }
        // check blocks on your right
        if(getBlock(col[i] + 1, row[i]) !== 0) {
            var selfcollision = false;
            for(var j = 0; j < 4; j++) {
                if(col[i] + 1 === col[j] &&
                   row[i] === row[j]) {
                       selfcollision = true;
                }
            }
            if(selfcollision === false) {
                return true;
            }
        }
    }
    return false;
};
var collision = function() {
    for(var i = 0; i < 4; i++) {
        if(col[i] < 0 || col[i] >= levelwidth ||
           row[i] < 0 || row[i] >= levelheight) {
            return true;
        }
        if(getBlock(col[i], row[i]) !== 0) {
            return true;
        }
    }
};
var rotateBlock = function() {
    var oldBlockRotation = currentBlockRotation;
    currentBlockRotation += 90;
    currentBlockRotation %= 360;
    var oldrow = [0, 0, 0, 0];
    var oldcol = [0, 0, 0, 0];
    var newrow = [0, 0, 0, 0];
    var newcol = [0, 0, 0, 0];
    for(var i = 0; i < 4; i++) {
        oldrow[i] = row[i];
        oldcol[i] = col[i];
    }
    if(currentBlockType === 1) { // square
        newrow = row;
        newcol = col;
    }
    else if(currentBlockType === 2) { // normal l
        if(currentBlockRotation === 0) {
            // commented these arrays to help me understand
            // how far each block should move
            //row = [0, 1, 2, 2]
            //col = [4, 4, 4, 5]
            newrow = [row[0] - 1, row[1],
                      row[2] + 1, row[3] + 2];
            newcol = [col[0] + 1, col[1],
                      col[2] - 1, col[3]];
        }
        else if(currentBlockRotation === 90) {
            //row = [1, 1, 1, 2]
            //col = [5, 4, 3, 3]
            newrow = [row[0] + 1, row[1],
                      row[2] - 1, row[3]];
            newcol = [col[0] + 1, col[1],
                      col[2] - 1, col[3] - 2];
        }
        else if(currentBlockRotation === 180) {
            //row = [2, 1, 0, 0]
            //col = [4, 4, 4, 3]
            newrow = [row[0] + 1, row[1],
                      row[2] - 1, row[3] - 2];
            newcol = [col[0] - 1, col[1],
                      col[2] + 1, col[3] ];
        }
        else if(currentBlockRotation === 270) {
            //row = [1, 1, 1, 0]
            //col = [3, 4, 5, 5]
            newrow = [row[0] - 1, row[1],
                      row[2] + 1, row[3]];
            newcol = [col[0] - 1, col[1],
                      col[2] + 1, col[3] + 2];
        }
    }
    else if(currentBlockType === 3) { // backwards l
        if(currentBlockRotation === 0) {
            //row = [0, 1, 2, 2];
            //col = [5, 5, 5, 4];
            newrow = [row[0] - 1, row[1],
                      row[2] + 1, row[3]];
            newcol = [col[0] + 1, col[1],
                      col[2] - 1, col[3] - 2];
        }
        else if(currentBlockRotation === 90) {
            //row = [1, 1, 1, 0];
            //col = [6, 5, 4, 4];
            newrow = [row[0] + 1, row[1],
                      row[2] - 1, row[3] - 2];
            newcol = [col[0] + 1, col[1],
                      col[2] - 1, col[3]];
        }
        else if(currentBlockRotation === 180) {
            //row = [2, 1, 0, 0];
            //col = [5, 5, 5, 6];
            newrow = [row[0] + 1, row[1],
                      row[2] - 1, row[3]];
            newcol = [col[0] - 1, col[1],
                      col[2] + 1, col[3] + 2];
        }
        else if(currentBlockRotation === 270) {
            //row = [1, 1, 1, 2];
            //col = [4, 5, 6, 6];
            newrow = [row[0] - 1, row[1],
                      row[2] + 1, row[3] + 2];
            newcol = [col[0] - 1, col[1],
                      col[2] + 1, col[3]];
        }
    }
    else if(currentBlockType === 4) { // zigzag
        if(currentBlockRotation === 0) {
            //row = [1, 1, 0, 0];
            //col = [4, 5, 5, 6];
            newrow = [row[0] - 1, row[1],
                      row[2] - 1, row[3]];
            newcol = [col[0] - 1, col[1],
                      col[2] + 1, col[3] + 2];
        }
        else if(currentBlockRotation === 90) {
            //row = [0, 1, 1, 2];
            //col = [5, 5, 6, 6];
            newrow = [row[0] - 1, row[1],
                      row[2] + 1, row[3] + 2];
            newcol = [col[0] + 1, col[1],
                      col[2] + 1, col[3]];
        }
        else if(currentBlockRotation === 180) {
            //row = [1, 1, 2, 2];
            //col = [6, 5, 5, 4];
            newrow = [row[0] + 1, row[1],
                      row[2] + 1, row[3]];
            newcol = [col[0] + 1, col[1],
                      col[2] - 1, col[3] - 2];
        }
        else if(currentBlockRotation === 270) {
            //row = [2, 1, 1, 0];
            //col = [5, 5, 4, 4];
            newrow = [row[0] + 1, row[1],
                      row[2] - 1, row[3] - 2];
            newcol = [col[0] - 1, col[1],
                      col[2] - 1, col[3]];
        }
    }
    else if(currentBlockType === 5) { // backwards zigzag
        if(currentBlockRotation === 0) {
            //row = [1, 1, 2, 2];
            //col = [4, 5, 5, 6];
            newrow = [row[0] - 1, row[1],
                      row[2] + 1, row[3] + 2];
            newcol = [col[0] - 1, col[1],
                      col[2] - 1, col[3]];
        }
        else if(currentBlockRotation === 90) {
            //row = [0, 1, 1, 2];
            //col = [5, 5, 4, 4];
            newrow = [row[0] - 1, row[1],
                      row[2] - 1, row[3]];
            newcol = [col[0] + 1, col[1],
                      col[2] - 1, col[3] - 2];
        }
        else if(currentBlockRotation === 180) {
            //row = [1, 1, 0, 0];
            //col = [6, 5, 5, 4];
            newrow = [row[0] + 1, row[1],
                      row[2] - 1, row[3] - 2];
            newcol = [col[0] + 1, col[1],
                      col[2] + 1, col[3]];
        }
        else if(currentBlockRotation === 270) {
            //row = [2, 1, 1, 0];
            //col = [5, 5, 6, 6];
            newrow = [row[0] + 1, row[1],
                      row[2] + 1, row[3]];
            newcol = [col[0] - 1, col[1],
                      col[2] + 1, col[3] + 2];
        }
    }
    else if(currentBlockType === 6) { // line
        if(currentBlockRotation === 0) {
            //row = [0, 1, 2, 3];
            //col = [5, 5, 5, 5];
            newrow = [row[0] - 1, row[1],
                      row[2] + 1, row[3] + 2];
            newcol = [col[0] - 2, col[1] - 1,
                      col[2], col[3] + 1];
        }
        else if(currentBlockRotation === 90) {
            //row = [1, 1, 1, 1];
            //col = [7, 6, 5, 4];
            newrow = [row[0] + 1, row[1],
                      row[2] - 1, row[3] - 2];
            newcol = [col[0] + 2, col[1] + 1,
                      col[2], col[3] - 1];
        }
        else if(currentBlockRotation === 180) {
            //row = [0, 1, 2, 3];
            //col = [6, 6, 6, 6];
            newrow = [row[0] - 1, row[1],
                      row[2] + 1, row[3] + 2];
            newcol = [col[0] - 1, col[1],
                      col[2] + 1, col[3] + 2];
        }
        else if(currentBlockRotation === 270) {
            //row = [1, 1, 1, 1];
            //col = [7, 6, 5, 4];
            newrow = [row[0] + 1, row[1],
                      row[2] - 1, row[3] - 2];
            newcol = [col[0] + 1, col[1],
                      col[2] - 1, col[3] - 2];
        }
    }
    else if(currentBlockType === 7) { // T
        if(currentBlockRotation === 0) {
            //row = [0, 1, 1, 1];
            //col = [5, 4, 5, 6];
            newrow = [row[0] - 1, row[1] - 1,
                      row[2], row[3] + 1];
            newcol = [col[0] + 1, col[1] - 1,
                      col[2], col[3] + 1];
        }
        else if(currentBlockRotation === 90) {
            //row = [1, 0, 1, 2];
            //col = [6, 5, 5, 5];
            newrow = [row[0] + 1, row[1] - 1,
                      row[2], row[3] + 1];
            newcol = [col[0] + 1, col[1] + 1,
                      col[2], col[3] - 1];
        }
        else if(currentBlockRotation === 180) {
            //row = [2, 1, 1, 1];
            //col = [5, 6, 5, 4];
            newrow = [row[0] + 1, row[1] + 1,
                      row[2], row[3] - 1];
            newcol = [col[0] - 1, col[1] + 1,
                      col[2], col[3] - 1];
        }
        else if(currentBlockRotation === 270) {
            //row = [1, 2, 1, 0];
            //col = [4, 5, 5, 5];
            newrow = [row[0] - 1, row[1] + 1,
                      row[2], row[3] - 1];
            newcol = [col[0] - 1, col[1] - 1,
                      col[2], col[3] + 1];
        }
    }
    row = newrow;
    col = newcol;
    if(collision()) {
        row = oldrow;
        col = oldcol;
        currentBlockRotation = oldBlockRotation;
    }
};
// update block based on keypresses
var keyPressed = function() {
    if (keyIsPressed) {
        for(var i = 0; i < 4; i++) {
            setBlock(col[i], row[i], 0);
        }
        if ((keyCode === LEFT || keyCode === 65) && 
            !leftCollision() && 
            millis() - lastLeftPressTime > leftLag){
             lastLeftPressTime = millis();
             leftLag -= 150;
             rightLag = 200;
             for(var i = 0; i < 4; i++) {
                 col[i]--;
             }
        }
        if ((keyCode === RIGHT || keyCode === 68) && 
            !rightCollision() && 
            millis() - lastRightPressTime > rightLag) {
             rightLag -= 150;
             leftLag = 200;
             lastRightPressTime = millis();
             for(var i = 0; i < 4; i++) {
                 col[i]++;
             }
        }
        if ((keyCode === UP || keyCode === 87 || 
             keyCode === CONTROL) && 
             millis() - lastUpPressTime > 200) {
            rightLag = 200;
            leftLag = 200;
            rotateBlock();
            lastUpPressTime = millis();
        }
        if ((keyCode === DOWN || keyCode === 83) && 
            !bottomCollision()) {
            rightLag = 200;
            leftLag = 200;
            for(var i = 0; i < 4; i++) {
                row[i]++;
            }
        }
        for(var i = 0; i < 4; i++) {
            setBlock(col[i], row[i], currentBlockColor);
        }
    }
};
var mobileKeyPressed = function() {
    var mouseKey = null;
    if(mouseIsPressed && mobile &&
       mouseX > borderX && mouseY > 290) {
        if(mouseX < 263 && mouseY < 360) { // left
            mouseKey = LEFT;
            rect(borderX, 300, 63, 60);
        }
        if(mouseX > 263 && mouseX < 337 &&  // rotate
           mouseY < 355) {
           rect(268, 290, 63, 60);
            mouseKey = UP;
        }
        if(mouseX > 337 && mouseY < 360) { // right
            mouseKey = RIGHT;
            rect(337, 300, 63, 60);
        }
        if(mouseY > 363) { // down
            mouseKey = DOWN;
            rect(borderX, 363, 200, 37);
        }
    }
    if (mouseKey !== null) {
        for(var i = 0; i < 4; i++) {
            setBlock(col[i], row[i], 0);
        }
        if (mouseKey === LEFT && !leftCollision() && 
            millis() - lastLeftPressTime > leftLag){
             lastLeftPressTime = millis();
             leftLag -= 150;
             rightLag = 200;
             for(var i = 0; i < 4; i++) {
                 col[i]--;
             }
        }
        if (mouseKey === RIGHT && !rightCollision() && 
            millis() - lastRightPressTime > rightLag) {
             rightLag -= 150;
             leftLag = 200;
             lastRightPressTime = millis();
             for(var i = 0; i < 4; i++) {
                 col[i]++;
             }
        }
        if (mouseKey === UP && 
            millis() - lastUpPressTime > 200) {
            rightLag = 200;
            leftLag = 200;
            rotateBlock();
            lastUpPressTime = millis();
        }
        if (mouseKey === DOWN && !bottomCollision()) {
            rightLag = 200;
            leftLag = 200;
            for(var i = 0; i < 4; i++) {
                row[i]++;
            }
        }
        for(var i = 0; i < 4; i++) {
            setBlock(col[i], row[i], currentBlockColor);
        }
    }
};
// sets your current block to what was shown and makes a
// random next block
var nextBlock = function() {
    if(nextBlockType === 1) { // square
        row = [0, 0, 1, 1];
        col = [5, 4, 5, 4];
    }
    else if(nextBlockType === 2) { // normal l
        row = [0, 1, 2, 2];
        col = [4, 4, 4, 5];
    }
    else if(nextBlockType === 3) { // backwards l
        row = [0, 1, 2, 2];
        col = [5, 5, 5, 4];
    }
    else if(nextBlockType === 4) { // zigzag
        row = [1, 1, 0, 0];
        col = [4, 5, 5, 6];
    }
    else if(nextBlockType === 5) { // backwards zigzag
        row = [0, 0, 1, 1];
        col = [4, 5, 5, 6];
    }
    else if(nextBlockType === 6) { // line
        row = [0, 1, 2, 3];
        col = [5, 5, 5, 5];
    }
    else if(nextBlockType === 7) { // T
        row = [0, 1, 1, 1];
        col = [5, 4, 5, 6];
    }
    if(collision()) {
        gameOver = true;
    }
    currentBlockColor = nextBlockColor;
    currentBlockType = nextBlockType;
    currentBlockRotation = 0;
    nextBlockColor = random() * 255 + 255 * 255 * 255;
    nextBlockType = round(random()*6.49)+1;
};
// move block down and check block under
// if block underneath, goes to next block
var moveDown = function() {
    if (!bottomCollision()) {
        for(var i = 0; i < 4; i++) {
            setBlock(col[i], row[i], 0);
            row[i]++;
        }
    }
    else{
        score += 15 + linesCleared;
        nextBlock();
    }
    for(var i = 0; i < 4; i++) {
        setBlock(col[i], row[i], currentBlockColor);
    }
};
// draw the sidebar
var drawSide = function() {
    textSize(21);
    // sidebar bg
    fill(178, 227, 104);
    rect(0, 0, 199, 399);
    // sidebar textbox
    fill(245, 228, 245);
    rect(15, 10, 166, 200);
    // text
    fill(0, 0, 0);
    text("Time: " + time, 20, 30);
    text("Score: " + score, 20, 59);
    text("row: " + row, 20, 130);
    text("col:   " + col, 20, 170);
    text("lines: " + linesCleared, 20, 90);
    text("rotation: " + currentBlockRotation, 20, 190);
    text("block: " + currentBlockType, 20, 150);
    // next block type box
    fill(245, 218, 81);
    rect(15, 210, 166, 120);
    fill(26, 18, 26);
    text("Next: " + nextBlockType, 20, 230);
    // next block
    fill(255, 0, 0);
    rect(65, 260, 20, 20);
    rect(65, 240, 20, 20);
    if(nextBlockType === squareBlock) {
        rect(85, 240, 20, 20);
        rect(85, 260, 20, 20);
    }
    if(nextBlockType === regularLBlock) {
        rect(65, 280, 20, 20);
        rect(85, 280, 20, 20);
    }
    if(nextBlockType === backwardsLBlock) {
        rect(65, 280, 20, 20);
        rect(45, 280, 20, 20);
    }
    if(nextBlockType === zigzagHighLeftBlock) {
        rect(85, 240, 20, 20);
        rect(45, 260, 20, 20);
    }
    if(nextBlockType === zigzagLowLeftBlock) {
        rect(85, 260, 20, 20);
        rect(45, 240, 20, 20);
    }
    if(nextBlockType === lineBlock) {
        rect(65, 280, 20, 20);
        rect(65, 300, 20, 20);
    }
    if(nextBlockType === tBlock) {
        rect(45, 260, 20, 20);
        rect(85, 260, 20, 20);
    }
    // pause button
    if(paused === false) {
        fill(86, 245, 96);
        rect(15, 335, 166, 25);
        fill(26, 18, 26);
        text("Pause", 66, 355);
    }
    else {
        fill(255, 0, 0);
        rect(15, 335, 166, 25);
        fill(255, 255, 255);
        text("Continue", 55, 355);
    }
    // name
    fill(26, 18, 26);
    textSize(17);
    text("By Raphael Kats", 72, 394);
};
// draw GAME OVER on the screen
var drawGameOverScreen = function() {
    fill(255, 255, 255);
    textSize(40);
    text("GAME\nOVER", 235, 95);
};
// makes the game go faster after you clear a line$
var setDifficulty = function() {
    updateSpeed = 21 - linesCleared;
    if(linesCleared >= 19) {
        updateSpeed = 2;
    }
};
// removes lines 
// if lines were removed, updates score and difficulty and 
// goes to the next block
var removeLines = function() {
    //from bottom to top, check if rows are filled
    var posReset = false;
    var row0 = levelheight - 1;
    while(row0 >= 0) {
        var filled = true;
        for(var col0 = 0; col0 < levelwidth; col0++) {
            if(getBlock(col0, row0) === 0) {
                filled = false;
                break;
            }
        }
        // if a row is filled move everything above it down
        // else check the next row up
        if(filled === true) {
            linesCleared++;
            // move the lines down
            for(var roow = row0; roow >= 1; roow--) {
               for(var cool = 0; cool < levelwidth; cool++) {
                   setBlock(cool, roow, 
                            getBlock(cool, roow - 1));
               }
            }
            for(var i = 0; i < levelwidth; i++) {
                blockArray[i] = 0;
            }
            score += 100;
            // only reset your block once
            if(posReset === false) {
                nextBlock();
                posReset = true;
            }
            setDifficulty();
        }
        else {
            row0--;
        }
    }
};
var drawMainMenu = function() {
    // bg
    fill(157, 184, 51);
    rect(0, 0, 400, 400);
    // "Tetris"
    fill(255 * sin(millis()/50) + 255, 
         255 * cos(millis()/50) + 255, 
         100 + 100 * cos(millis()/50));
    textSize(91);
    text("Tetris", 79, 92);
    // Regular mode
    fill(255, 213, 0);
    rect(114, 167, 182, 41);
    textSize(37);
    fill(0, 0, 0);
    text("Regular", 142, 200);
    // Mobile mode
    fill(255, 213, 0);
    rect(114, 229, 182, 41);
    fill(0, 0, 0);
    text("Mobile", 155, 262);
};
// draws arrow boxes for mobile browser support
var drawMobile = function() {
    fill(255, 255, 255, 40);
    noStroke();
    //boxes
    rect(borderX, 300, 63, 60); // left
    rect(268, 290, 63, 60); // rotate
    rect(337, 300, 63, 60); // right
    rect(borderX, 363, 200, 37); // down
    fill(0, 0, 0, 40);
    // arrows
    triangle(210, 330, 250, 310, 250, 350); // left
    triangle(270, 330, 300, 293, 330, 330); // rotate
    triangle(390, 330, 350, 310, 350, 350); // right
    triangle(270, 370, 330, 370, 300, 390); // down
    stroke(0, 0, 0);
};
// main loop
var draw = function() {
    if(focused === false) {
        //paused = true;
    }
    if(mouseIsPressed && 
        millis() - lastPausePressTime > 500 &&
        mouseX > 15 && mouseX < 181 &&
        mouseY > 335 && mouseY < 360) 
    {   
        paused = !paused;
        lastPausePressTime = millis();
    }
    if(!mainMenu) { // in-game
        if(!paused) {
            if(!gameOver) {
                eraseShapes();
                drawShapes();
                drawSide();
                if(mobile) {
                    drawMobile();
                    mobileKeyPressed();
                } else {
                    keyPressed();
                }
                if(bottomCollision()) {
                    removeLines();
                }
                if(time % updateSpeed === 0) {
                    moveDown();
                }
                time++;
            }
            else { // if game over
                drawGameOverScreen();
            }
        }
        else { // if paused
            drawSide();
        }
    } else { // in Main Menu
        drawMainMenu();
        if(mouseIsPressed) {
            if(mouseX > 114 && mouseX < 296) {
                // regular
                if(mouseY > 167 && mouseY < 208) {
                    rect(114, 167, 182, 41);
                    mainMenu = false;
                    paused = false;
                }
                // mobile
                if(mouseY > 229 && mouseY < 270) {
                    rect(114, 229, 182, 41);
                    mobile = true;
                    mainMenu = false;
                    paused = false;
                }
            }
        }
    }
};
var keyReleased = function() {
    if(keyCode === 80) {
        paused = !paused;
    }
};
