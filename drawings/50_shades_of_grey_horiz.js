// https://www.khanacademy.org/computer-programming/50-shades-of-grey/5869775284076544

/** 
 * 50 shades of grey
 * for the lols by raphael rouvinov-kats
 * */

colorMode(HSB);

var blocks = 50;
var blockSize = height/blocks;

background(0, 0, 255);
noStroke();
for(var block = 0; block < blocks; block++) {
    var y1 = block*blockSize;
    var val = 255 * block/blocks;
    fill(0, 0, val);
    rect(0, y1, width, blockSize+1);
}
