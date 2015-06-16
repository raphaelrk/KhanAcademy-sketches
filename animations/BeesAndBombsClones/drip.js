// https://www.khanacademy.org/computer-programming/drip/5773863227097088

/**
 * Drip
 * By Raphael Rouvinov-Kats
 * 
 * Intended to imitate http://beesandbombs.tumblr.com/image/110657677079
 * 
 * */

var points = [];
frameRate(60);

// create a grid of points, offset in a hexagonally way
var rows = 30;
var cols = 30;
for(var r = -5; r < rows+5; r++) {
    for(var c = -5; c < rows+5; c++) {
        var x = c/cols*width + width/cols/2;
        var y = r/rows*height + height/cols/2;
        
        if(r % 2 === 1) { x += width/cols/2; }
        
        points.push([x, y]);
    }
}

var draw = function() {
    background(0, 0, 0);
    
    stroke(255, 255, 255);
    strokeWeight(3);
    for(var i = 0; i < points.length; i++) {
        var px = points[i][0];
        var py = points[i][1];
        var d = dist(width/2, height/2, px, py);
        
        point(px, py + 10*sin(d*3 + frameCount*7));
    }
};
