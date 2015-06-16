// https://www.khanacademy.org/computer-programming/matrix-number-2/2826614063

/**
 * Draws numbers the matrix way
 * This one is closer to the movie version than the last one
 * By Raphael Rouvinov
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
            
            text(arr[c][r], x, y);
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
};
