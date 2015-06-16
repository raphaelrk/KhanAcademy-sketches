// https://www.khanacademy.org/computer-programming/matrix-number-1/2814051095

/**
 * Draws numbers the matrix way
 * By Raphael Rouvinov
 * */
 
var rowAmount = 20;
var colAmount = 17;

fill(25, 150, 27);

textFont(createFont("Courier New", 14), 16);
text("50", 50, 50);

var createRow = function(min, max) {
    var row = [];
    for(var r = 0; r < rowAmount; r++) {
        row.push(floor(random(min, max + 1)));
        if(random(0, 1) > 0.3) {
            row[r] = " ";
        }
    }
    return row;
};

var createArray = function() {
    var arr = [];
    for(var c = 0; c < colAmount; c++) {
        arr.push(createRow(0, 9));
    }
    return arr;
};

var shift = function(arr, offs, changes) {
    for(var c = 0; c < colAmount; c++) {
        if(offs[c] > 450) {
            offs[c] = -450;
            arr.push(floor(random(0, 10)));
            if(arr[0] === 10) {
                arr[0] = " ";
            }
            arr.pop();
        }
        offs[c] += changes[c];
    }
};

var drawArr = function(arr, offs) {
    for(var c = 0; c < colAmount; c++) {
        var offset = offs[c];
        for(var r = 0; r < rowAmount; r++) {
            var x = c/colAmount * 450 - random(19,21);
            var y = r/rowAmount * 450 - random(19,21)+offset;
            
            fill(10 + random(-20, 50), 
                255 + random(-100, 20), 
                38 + random(-38, 50));
            
            text(arr[c][r], x, y);
        }
    }
};

var fillArray = function(size, min, max) {
    var arr = [];
    for(var i = 0; i < size; i++) {
        arr.push(floor(random(min, max + 1)));
    }
    return arr;
};

var nums = createArray();
var speeds = fillArray(colAmount, 10, 20);
var offsets = fillArray(colAmount, 0, 0);
    
var draw = function() {
    fill(0, 0, 0, 50);
    rect(0, 0, 400, 400);
    shift(nums, offsets, speeds);
    if(random(0, 1) > 0.95) {
        speeds = fillArray(colAmount, 5, 20);
    }
    drawArr(nums, offsets);
    point(random(0, 400),random(0, 400));
};
