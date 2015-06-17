// https://www.khanacademy.org/computer-programming/50-shades-of-grey/4670373617991680

/** 
 * 50 shades of grey
 * for the lols by raphael rouvinov-kats
 * */

colorMode(HSB);

var columns = 5;
var rows = 10;
var blockWidth = width/columns;
var blockHeight = height/rows;

background(0, 0, 255);
noStroke();
for(var row = 0; row < rows; row++) {
    var y = row * blockHeight;
    for(var col = 0; col < columns; col++) {
        var x = col * blockWidth;
        var val = 255 * (col + row*columns)/(columns*rows);
        fill(0, 0, val);
        rect(x, y, blockWidth, blockHeight);
    }
}
