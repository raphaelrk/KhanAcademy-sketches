// https://www.khanacademy.org/computer-programming/matrix-with-center-text/2831849251

/**
 * Draws numbers the matrix way
 * This one has a text overlay
 * By Raphael Rouvinov-Kats
 * */
 
var rowAmount = 16;
var colAmount = 16;
var numsCols = []; // columns' numbers
var offsets = []; // columns' coordinates
var speed = 0.7; // lower is faster, 0 being fastest
frameRate(30); // framerate, like speed of 'var speed'

textFont(createFont("Courier New", 18), 18);
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
        arr.push(createCol(0, 9, random(2, 10)));
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
        offs.push([i, random(-l - 20, -l + 1)]);
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
            col.push(floor(random(0,10)));
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
        if(offs[c][1] > rowAmount) { // move back up
            
            arr[c] = createCol(0, 9, random(2, 10));
            
            var l = arr[c].length;
            offs[c][1] = random(-l - 10, -l);
            arr[c].push(floor(random(0, 10)));
            arr[c].pop();
        }
        if(random(0, 1) > speed) { // move down one
             offs[c][1] += 1;
        }
    }
};

var drawText = function(str, x, y) {
    x += random(-1, 1);
    y += random(-1, 1);
    var newString = "";
    for(var i = 0; i < str.length; i++) {
        if(str[i] === 'o' || str[i] === 'O') {
            if(random(0, 1) > 0.8) {
                newString += "0";
            } else {
                newString += str[i];
            }
        } else if(str[i] === 'l' || str[i] === 'I' || str[i] === 'L' || str[i] === 'i') {
            if(random(0, 1) > 0.6) {
                if(random(0, 1) > 0.5) {
                    newString += "1";
                } else {
                    newString += "!";
                }
            } else {
                newString += str[i];
            }
        } else if(str[i] === 'e' || str[i] === 'E') {
            if(random(0, 1) > 0.8) {
                newString += "3";
            } else {
                newString += str[i];
            }
        } else if(str[i] === 't' || str[i] === 'T') {
            if(random(0, 1) > 0.8) {
                newString += "7";
            } else {
                newString += str[i];
            }
        }  else if(str[i] === 'a' || str[i] === 'A') {
            if(random(0, 1) > 0.6) {
                if(random(0, 1) > 0.5) {
                    newString += "4";
                } else {
                    newString += "@";
                }
            } else {
                newString += str[i];
            }
        } else if(str[i] === 'h' || str[i] === 'H') {
            if(random(0, 1) > 0.8) {
                newString += "#";
            } else {
                newString += str[i];
            }
        } else if(str[i] === 's' || str[i] === 'S') {
            if(random(0, 1) > 0.8) {
                newString += "$";
            } else {
                newString += str[i];
            }
        } else if(str[i] === 't' || str[i] === 'T') {
            if(random(0, 1) > 0.8) {
                newString += "7";
            } else {
                newString += str[i];
            }
        } else if(str[i] === 'u') {
            if(random(0, 1) > 0.8) {
                newString += "ü";
            } else {
                newString += str[i];
            }
        } else if(str[i] === 'U') {
            if(random(0, 1) > 0.8) {
                newString += "Ü";
            } else {
                newString += str[i];
            }
        } else if(str[i] === 'n') {
            if(random(0, 1) > 0.8) {
                newString += "ñ";
            } else {
                newString += str[i];
            }
        } else if(str[i] === 'N') {
            if(random(0, 1) > 0.8) {
                newString += "Ñ";
            } else {
                newString += str[i];
            }
        } else {
            newString += str[i];
        }
    }
    text(newString, x, y);
};

var writeText = function(str, x, y) {
    if(x < 100 || x > 300 || y < 100 || y > 300) {
        text(str, x, y);
    }
};

var drawArr = function(arr, offs) {
    for(var c = 0; c < colAmount; c++) {
        
        var yoffset = offs[c][1];
        var xoffset = offs[c][0];
        
        for(var r = 0; r < rowAmount; r++) {
            var x = xoffset/colAmount * 450 - random(19,21);
            var y = (r+yoffset)/rowAmount * 450 - random(19,21);
            
            // default vals + randomness + getting brighter
            fill(10 + random(-20, 50) + 1*r, 
                100 + random(-100, 20) + 25*r, 
                20 + random(-38, 50) + 4*r);
            
            writeText(arr[c][r], x, y);
        }
    }
};

numsCols = createNumberCols();
offsets = createOffsets(numsCols);

fill(8, 117, 0);
rect(0, 0, 400, 400);

var draw = function() {
    fill(0, 0, 0, 50);
    rect(0, 0, 400, 400);
    shift(numsCols, offsets);
    numsCols = changeNums(numsCols);
    drawArr(numsCols, offsets);
    filter(BLUR);
    drawText("Hello, world!", 150, 150);
    drawText("The quick brown fox", 110, 200);
    drawText("jumps over the lazy dog", 95, 250);
};
