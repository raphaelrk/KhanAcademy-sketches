// https://www.khanacademy.org/computer-programming/string-art/5899093496823808

/**
 * String Art
 * By Raphael Rouvinov-Kats
 * makes curves out of lines using 3 points given by the user
 * Press X to undo
 * */

var change = 0.05;

var points = [[]]; // [art number][[pointx, pointy],[pointx, pointy],[pointx, pointy]]
var history = [[]];

var mousePressed = function() {
    if(points[points.length - 1].length < 3) { // adding a 2nd/3rd point

        points[points.length - 1].push([mouseX, mouseY]);
    } else { // creating a first point 
        points.push([]);
        points[points.length - 1].push([mouseX, mouseY]);
    }
};

var draw = function() {
    background(237, 245, 213);
    for(var i = 0; i < points.length; i++) { // draw finished curves
        if(points[i].length < 3) {
            break;
        }
        var pt1x = points[i][0][0];
        var pt1y = points[i][0][1];
        var pt2x = points[i][1][0];
        var pt2y = points[i][1][1];
        var pt3x = points[i][2][0];
        var pt3y = points[i][2][1];
        for(var j = 0; j <= 1; j += change) {
            var lineX1 = pt1x + j * (pt2x - pt1x);
            var lineY1 = pt1y + j * (pt2y - pt1y);
            var lineX2 = pt2x + j * (pt3x - pt2x);
            var lineY2 = pt2y + j * (pt3y - pt2y);
            stroke(0, 0, 0);
            strokeWeight(1);
            line(lineX1, lineY1, lineX2, lineY2);
        }
    }
    for(var i = points.length - 1; i < points.length; i++) { // draw unfinished/recent
        for(var j = 0; j < points[i].length; j++) {
            stroke(255, 0, 0);
            strokeWeight(5);
            point(points[i][j][0], points[i][j][1]);
            strokeWeight(2);
            if(j < points[i].length - 1) {
                line(points[i][j][0], points[i][j][1], points[i][j+1][0], points[i][j+1][1]);
            }
            
        }
    }
};

var keyTyped = function() {
    if(key + 0 === 122) { // "z", undo
        history.push(points[points.length - 1]);
        points.pop();
    } else if(key + 0 === 121) { // "y", redo
        points.push(history[history.length-1]);
        history.pop(); 
    } 
};
