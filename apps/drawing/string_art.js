// https://www.khanacademy.org/computer-programming/string-art/2753506147

/**
 * String Art Tool
 * Program by Raphael Rouvinov-Kats
 * 
 * Still a work in progress
 * 
 * Controls:
 * Select a color by pressing c
 * Use the unguided line tool by pressing l
 * Use the snap line tool by pressing k
 * Use the erase line tool by pressing e
 * Undo last uline with z
 * Undo last sline with x
 * Redo with y
 * Make it into a spinoff by pressing s and copy-pasting
 * 
 * What does this program do?
 * Basically, you make lines on the canvas with l and then
 * with the snap line tool you drag extra lines between them
 * If you've ever played line rider, you may know what this
 * does. It allows you to easily make curves from lots of 
 * straight lines like you do in line rider's slopes.
 * 
 * Here's the wikipedia page:
 * http://en.wikipedia.org/wiki/String_art
 * */

var uLines = []; // unguided lines
var sLines = []; // snap lines

// tools
var uLineTool = 0;
var sLineTool = 1;
var colorTool = 2;
var eraseTool = 3;

var currentTool = uLineTool;

var c = color(255, 0, 0);
var w = 0.2;

frameRate(0);

//determines if (px,py) is collinear with (x1,y1) and (x2,y2)
var doesPointLieBetweenPoints = function(px, py, 
                                         x1, x2, y1, y2) {
    var slope = (y2 - y1)/(x2 - x1);
    
    // differences between (px, py) and (x1, y1)
    var xDiff = px - x1;
    var yDiff = py - y1;
    
    if(xDiff * slope === yDiff) { // determines if ydiff
                                // is right for the slope
        return true;
    }
    return false;
};

var mousePressed = function() {
    if(currentTool === uLineTool) {
        uLines.push([mouseX, mouseY, mouseX, mouseY, 
                    color(0, 0, 0), 0.5]);
    } else if(currentTool === sLineTool) {
        // todo: make point snap to close line
        sLines.push([mouseX, mouseY, mouseX, mouseY, 
                    color(0, 0, 0), 0.5]);
    } else if(currentTool === eraseTool) {
        // find all uLines and sLines that touch that point
        // and erase them
    } else if(currentTool === colorTool) {
        // when pressed in colormode you'll be in the
        // colormode screen. From there, you can select
        // your r, g, b, opacity, and strokeweight
        
        // here you would determine what the user has pressed
    }
};

var mouseDragged = function() {
    if(currentTool === uLineTool) {
        var i = uLines.length - 1;
        uLines[i][2] = mouseX;
        uLines[i][3] = mouseY;
        //var l = uLines[uLines.length - 1];
        //stroke(l[4]);
        //strokeWeight(l[5]);
        //line(l[0], l[1], mouseX, mouseY);
    } else if(currentTool === sLineTool) {
        var i = sLines.length - 1;
        sLines[i][2] = mouseX;
        sLines[i][3] = mouseY;
        //var l = sLines[sLines.length - 1];
        //stroke(l[4]);
        //strokeWeight(l[5]);
        //line(l[0], l[1], mouseX, mouseY);
    } else if(currentTool === eraseTool) {
        // find all u or sline that ouch you and erase
    } else if(currentTool === colorTool) {
        // move r, g, b, opacity, weight sliders?
    }
};

var mouseOut = function() {
    //mouseIsPressed = false;
    //mouseReleased();
};

var mouseReleased = function() {
    if(currentTool === uLineTool) {
        var i = uLines.length - 1;
        uLines[i][2] = mouseX;
        uLines[i][3] = mouseY;
    } else if(currentTool === sLineTool) {
        var i = sLines.length - 1;
        sLines[i][2] = mouseX;
        sLines[i][3] = mouseY;
    } else if(currentTool === colorTool) {
        // set r, g, b, opacity, weight sliders
    }
};

var keyTyped = function() {
    if(key + 0 === 122) { // "z", undo uLine
        // history.push(curves[curves.length - 1]);
        // curves.pop();
        uLines.pop();
    } else if(key + 0 === 120) { // "x", undo sline
        // curves.push(history[history.length-1]);
        // history.pop();
        sLines.pop();
    } else if(key + 0 === 121) { // "y", redo
        // curves.push(history[history.length-1]);
        // history.pop();
    } else if(key + 0 === 108) { // "l", uline
        currentTool = uLineTool;
    } else if(key + 0 === 107) { // "k", sline
        currentTool = sLineTool;
    } else if(key + 0 === 101) { // "e", erase
        currentTool = eraseTool;
    } else if(key + 0 === 99) { // "c", color
        currentTool = colorTool;
    }
    
    if(key + 0 === 122) {
        //curves.pop();
    } else if(false) {
    println("/**");
    println("* Created with String Art Tool,");
    println("* a program by Raphael Rouvinov-Kats");
    println("* https://www.khanacademy.org/cs/bezier-drawing-tool/2711580088");
    println("* */");
    println("");
    println("var speed = 30;");
    println("");
    /**
    var s = "var curves = [";
    for(var i = 0; i < curves.length; i++) {
        var pts = curves[i];
        s += "[";
        for(var p = 0; p < pts.length; p++) {
            var pt = pts[p];
            s += "[" + pt[0] + "," + pt[1] + "," + pt[2] + "]";
            if(p < pts.length -1) {
                s += ",";
            }
        }
        s += "]";
        if(i < curves.length - 1) {
            s += ",";
        }
    }
    s += "];";
    println(s);
    **/
    println("frameRate(speed);");
    println("var c = 0;");
    println("var p = 0;");
    println("var points;");
    println("background(255, 251, 245);");
    println("var draw = function() {");
    println("    if(c < curves.length) {");
    println("        points = curves[c];");
    println("        if(p < points.length - 4) {");
    println("            stroke(points[p][2]);");
    println("            strokeWeight(0.2);");
    println("            fill(0, 0, 0, 0);");
    println("            bezier(points[p][0], points[p][1],");
    println("                points[p + 1][0], points[p + 1][1],");
    println("                points[p + 2][0], points[p + 2][1],");
    println("                points[p + 3][0], points[p + 3][1]);");
    println("            p++;");
    println("        } else {");
    println("            p = 0;");
    println("            c++;");
    println("        }");
    println("    }");
    println("};");
    println("");
    println("var mousePressed = function() {");
    println("    background(255, 251, 245);");
    println("    p = 0;");
    println("};");
    }
};

var drawLines = function() {
    for(var i = 0; i < uLines.length; i++) {
        stroke(uLines[i][4]);
        strokeWeight(uLines[i][5]);
        line(uLines[i][0], uLines[i][1],
            uLines[i][2], uLines[i][3]);
    }
    for(var i = 0; i < sLines.length; i++) {
        stroke(sLines[i][4]);
        strokeWeight(sLines[i][5]);
        line(sLines[i][0], sLines[i][1],
            sLines[i][2], sLines[i][3]);
    }
};

var draw = function() {
    background(255, 251, 245);
    
    drawLines();
};
