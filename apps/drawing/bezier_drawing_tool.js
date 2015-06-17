// https://www.khanacademy.org/computer-programming/bezier-drawing-tool/2711580088

/**
 * Bezier Drawing Tool
 * Program by Raphael Rouvinov-Kats
 * Idea came from using Art Maker 3.1 by Timothy Smith
 * 
 * Undo with Z!
 * */

/** the hierarchy
 * [ // var curves
 *  [ // point collection 1
 *   [ // point 1
 *    x, y, c
 *   ]
 *  ]
 * ]
 * curves[point collection][point][x, y, or color]
 * */
var curves = [];
var points = [];
var c = color(255, 0, 0);
var w = 0.2;

frameRate(0);

var lastPointTime = millis();
var lmx = mouseX;
var lmy = mouseY;
var mouseDragged = function() {
    if(millis() - lastPointTime > 50) {
        lmx = mouseX;
        lmy = mouseY;
    }
    if(millis() - lastPointTime > 0){
        points.push([mouseX + (mouseX - lmx)/3, 
                    mouseY + (mouseY - lmy)/3, c]);
        lastPointTime = millis();
        lmx = mouseX;
        lmy = mouseY;
    }
};

var mouseOut = function() {
    mouseIsPressed = false;
    mouseReleased();
};

var mouseReleased = function() {
    curves.push(points);
    points = [];
};

var keyTyped = function() {
    if(key + 0 === 122) {
        curves.pop();
    } else {
    println("/**");
    println("* Created with Bezier Drawing Tool,");
    println("* a program by Raphael Rouvinov-Kats");
    println("* https://www.khanacademy.org/cs/bezier-drawing-tool/2711580088");
    println("* */");
    println("");
    println("var speed = 30;");
    println("");
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

var drawCurve = function(pts) {
    for(var i = 0; i < pts.length - 4; i++) {
        stroke(pts[i][2]);
        strokeWeight(w);
        fill(0, 0, 0, 0);
        bezier(pts[i][0], pts[i][1], 
            pts[i + 1][0], pts[i + 1][1], 
            pts[i + 2][0], pts[i + 2][1], 
            pts[i + 3][0], pts[i + 3][1]);
    }
};

var draw = function() {
    background(255, 251, 245);
    for(var i = 0; i < curves.length; i++) {
        drawCurve(curves[i]);
    }
    drawCurve(points);
};
