// https://www.khanacademy.org/computer-programming/you-only-get-one-one/6720472435654656

/**
 * YOGOO
 * By Raphael Rouvinov-Kats
 * Written in ~9001 hours for Ludum Dare 28
 * Theme: "You Only Get One"
 * 
 * Rules:
 * THE GOLDEN RULE: One should seek for others the happiness 
 *      one desires for himself
 * The second rule of YOGOO is don't talk about YOGOO
 * The third law of robotics is "A robot must protect its own
 *      existence as long as such protection does not 
 *      conflict with the First or Second Law."
 * The fourth plague of Egypt was of animals capable of 
 *      harming people and livestock
 * The fifth planet in the Solar System is Jupiter
 * The sixth circle of hell is heresy
 * The seventh amendment codifies the right to a jury trial
 *      in certain civil cases, and inhibits courts from 
 *      overturning a jury's findings of fact.
 * The eighth day, according to the old nundinal cycle, is
 *      what Sunday was known as in patristic writings
 * The ninth month is September
 * 
 * Oh yeah and dodge the other numbers or whatever.
 *      (especially 7. I heard it 8 some 1. 3funny5you)
 * Arrow keys to move
 * */
 
var oneC = 8;
var oneR = 14;
var points = 0;

var minLength = 4; // fairly difficult minimum length
var rowAmount = 16;
var colAmount = 16;
var numsCols = []; // columns' numbers
var offsets = []; // columns' coordinates
var shots = [];
var speed = 0.7; // lower is faster, 0 being fastest
frameRate(30); // framerate, like speed of 'var speed'

var gameOver = false;
var startScreen = true;
var inGame = false;

var matrixFont = createFont("Courier New", 18);
var helvetica = createFont("Helvetica", 18);
textFont(helvetica, 18);
text("50", 50, 50);

/**
 * Creates and returns an array of 'amt' size of numbers
 * between min and max
 * */
var createCol = function(min, max, amt) {
    var col = [];
    for(var c = 0; c < amt; c++) {
        col.push(floor(random(min, max + 1)));
        if(random(0, 1) > 0.3) {
            col[c] = " ";
        }
    }
    return col;
};

/**
 * Creates an array of columns of numbers
 * */
var createNumberCols = function() {
    var arr = [];
    for(var i = 0; i < colAmount; i++) {
        arr.push(createCol(0, 9, random(minLength, 10)));
    }
    return arr;
};

/**
 * Creates and returns an array of numcols size that has
 * [column, row] for every index
 * */
var createOffsets = function(numcols) {
    var offs = [];
    for(var i = 0; i < numcols.length; i++) {
        var l = numcols[i].length;
        offs.push([floor(random(-l - 20, -l + 1))]);
    }
    return offs;
};

/**
 * Takes a 2d array 'arr' and switches each number in it with
 * a number zero through ten
 * */
var changeNums = function(arr) {
    var nums = [];
    for(var i = 0; i < arr.length; i++) {
        var col = [];
        var l = arr[i].length;
        for(var j = 0; j < l; j++) {
            col.push(floor(random(2,9)));
        }
        nums.push(col);
    }
    return nums;
};

/**
 * Takes an array of columns and shifts it down or moves
 * it back up
 * */
var shift = function(arr, offs) {
    for(var c = 0; c < arr.length; c++) {
        if(offs[c][0] > rowAmount) { // move back up
            
            arr[c] = createCol(1, 1, random(minLength, 10));
            
            var l = arr[c].length;
            offs[c][0] = random(-l - 10, -l);
            arr[c].push(floor(random(0, 10)));
            arr[c].pop();
        }
        if(random(0, 1) > speed) { // move down one
             offs[c][0] += 1;
        }
    }
};

var drawArr = function(arr, offs) {
    for(var c = 0; c < arr.length; c++) {
        
        var yoffset = offs[c][0];
        var xoffset = c;
        
        for(var r = 0; r < arr[c].length; r++) {
            var x = xoffset/colAmount * 450 - random(19,21);
            var y = (r+yoffset)/rowAmount * 450 - random(19,21);
            
            // default vals + randomness + getting brighter
            fill(10 + random(-20, 50) + 1*r, 
                100 + random(-100, 20) + 25*r, 
                20 + random(-38, 50) + 4*r);
                
            textSize(18);
            if(arr[c][r] === 7) {
                textSize(24);
            }
            
            text(arr[c][r], x, y);
            textSize(18);
        }
    }
};

var drawOne = function() {
    var x = oneC/colAmount * 450 - random(19,21);
    var y = (oneR)/rowAmount * 450 - random(19,21);
    
    // default vals + randomness + getting brighter
    fill(10 + random(-20, 50) + 1*oneC, 
        100 + random(-100, 20) + 25*oneC, 
        20 + random(-38, 50) + 4*oneC);
    
    text("1", x, y);
};

/**
 * Checks for collison
 * If you touch the top two numbers of a column it doesn't
 * count it
 * */
var checkCollision = function(offs, numcols) {
    var colTop = offs[oneC][0];
    var colLen = numcols[oneC].length;
    var colBottom = colTop + colLen;
    if(colTop + 2 <= oneR && colBottom - 1 >= oneR) {
        return true;
    }
};

var lastShootTime = millis();

var shoot = function() {
    if(millis() - lastShootTime > 100) {
        
    }
};

numsCols = createNumberCols();
offsets = createOffsets(numsCols);

fill(8, 117, 0);
rect(0, 0, 400, 400);

var draw = function() {
    if(startScreen) {
        background(5, 92, 32 + sin(millis()/10)*100);
        fill(255, 255, 255);
        textSize(36);
        text("You Only Get \nOne One\n\nClick window\nto begin\n\nUse arrow keys\nto move", 50, 75);
        textSize(18);
        if(mouseIsPressed) {
            startScreen = false;
            inGame = true;
            textFont(matrixFont, 18);
        }
    } else if (inGame) {
        points++;
        fill(0, 0, 0, 50);
        rect(0, 0, 400, 400);
        shift(numsCols, offsets);
        numsCols = changeNums(numsCols);
        drawArr(numsCols, offsets);
        filter(BLUR);
        
        drawOne();
        text("Score: " + points, 12, 400);
        
        if(checkCollision(offsets, numsCols)) {
            gameOver = true;
            inGame = false;
            textFont(helvetica, 36);
        }
    } else if(gameOver){
        background(5, 92, 32 + sin(millis()/10)*100);
        fill(255, 255, 255);
        text("You Lose.\n\nYour score:\n" + points + " \n\nPress Restart\nTo try again.", 
                60, 115);
    }
};

var keyPressed = function() {
    if(keyCode === LEFT) {
        oneC = max(1, oneC - 1);
    }
    if(keyCode === RIGHT) {
        oneC = min(14, oneC + 1);
    }
    if(keyCode === UP) {
        oneR = max(12, oneR - 1);
    }
    if(keyCode === DOWN) {
        oneR = min(14, oneR + 1);
    }
    if(key === " ") {
        gameOver = true;
    }
};

var keyTyped = function() {
    if(key + 0 === 32) {
        shoot();
    }
};
