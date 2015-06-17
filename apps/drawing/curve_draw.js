// https://www.khanacademy.org/computer-programming/curve-draw/2768588283

/**
 * Curve Draw
 * Program by Raphael Rouvinov-Kats
 * Inspired by Art Maker 3.1
 * 
 * click and drag to draw
 * press z to undo
 * press y to redo
 * Press enter for a spin-off that includes your drawing
 * */
frameRate(0); // changes how quickly you see your drawing
var sw = 0.3; // changes the thickness of your lines
fill(0, 0, 0, 0);
var special_effect = 4; // changes amount of lines w/o
                        // attached lines/how many points
                        // away a line goes.
var special_effect1 = 2.0; // changes both how much lines go
                         // out and how curvy they are.
                         // 0 for jagged to 2 for curvy
                         // use other numbers if 
                         // you're feeling adventurous

var se = special_effect;
var se1 = special_effect1;
var nse1 = 1 - se1;

// given an array of [x, y] draws lines between points,
// based on the "special effects"
var drawCurve = function(pts, color) {
    stroke(color);
    for(var c = 0; c < pts.length - se; c++) {
        /**
        curve(pts[c][0], pts[c][1],
        
            pts[c][0]*nse1+
                pts[c+1][0]*se1, 
            pts[c][1]*nse1+
                pts[c+1][1]*se1,
            pts[c+se][0]*nse1+
                pts[c+se-1][0]*se1, 
            pts[c+se][1]*nse1+
                pts[c+se-1][1]*se1,
                
            pts[c+se][0], pts[c+se][1]);
        **/
        bezier(pts[c][0], pts[c][1],
        
            pts[c][0]*nse1+
                pts[c+1][0]*se1, 
            pts[c][1]*nse1+
                pts[c+1][1]*se1,
            pts[c+se][0]*nse1+
                pts[c+se-1][0]*se1, 
            pts[c+se][1]*nse1+
                pts[c+se-1][1]*se1,
                
            pts[c+se][0], pts[c+se][1]);
    }
};

var curves = [];
var history = [];
var mouseHasBeenDragged = false; // used for red and undo

var mousePressed = function() {
    mouseHasBeenDragged = false;
    curves.push([]);
    history = []; // comment out for extra albeit odd history
};

var mouseDragged = function() {
    mouseHasBeenDragged = true;
    curves[curves.length-1].push([mouseX, mouseY]);
};

var mouseReleased = function() {
    if(!mouseHasBeenDragged) {
        curves.pop();
    }
};

var mouseOut = function() {
    mouseIsPressed = false;
    if(mouseHasBeenDragged) {
        curves.push([]);
    }
};

var keyTyped = function() {
    if(key + 0 === 122) { // z to undo
        history.push(curves[curves.length-1]);
        curves.pop();
    } else if (key + 0 === 121) { // y to redo
        if(history.length > 0) {
            curves.push(history[history.length-1]);
            history.pop();
        }
    } else if (key + 0 === 10){ // enter to output
        println("/**");
        println("* Created with Curve Draw,");
        println("* a program by Raphael Rouvinov-Kats");
        println("* */");
        println("var speed = 30;");
        println("fill(0, 0, 0, 0);");
        println("var sw = " + sw + ";");
        println("var se = " + se + ";");
        println("var se1 = " + se1 + ";");
        println("var nse1 = " + nse1 + ";");
        println("var drawCurvePart = function(pt, pts, color) {");
        println("    stroke(color);");
        println("var c = pt;");
        println("if(c < pts.length - se) {");
        println("    bezier(pts[c][0], pts[c][1],");
        println("        pts[c][0]*nse1+");
        println("            pts[c+1][0]*se1,");
        println("        pts[c][1]*nse1+");
        println("            pts[c+1][1]*se1,");
        println("        pts[c+se][0]*nse1+");
        println("            pts[c+se-1][0]*se1,");
        println("        pts[c+se][1]*nse1+");
        println("            pts[c+se-1][1]*se1,");
        println("        pts[c+se][0], pts[c+se][1]);");
        println("    }");
        println("};");
        var c = "var curves = [";
        for(var i = 0; i < curves.length; i++) {
            c += "[";
            for(var j = 0; j < curves[i].length; j++) {
                c += "[" + curves[i][j][0] + "," +
                        curves[i][j][1] + "]";
                if(j < curves[i].length - 1) {
                    c += ",";
                }
            }
            c += "]";
            if(i < curves.length - 1) {
                c += ",";
            }
        }
        c += "];";
        println(c);
        println("frameRate(speed);");
        println("var c = 0; // current curve");
        println("var p = 0; // current point");
        println("background(247, 252, 247);");
        println("var draw = function() {");
        println("    if(c < curves.length) {");
        println("       strokeWeight(sw);");
        println("       drawCurvePart(p, curves[c], color(0, 0, 0));");
        println("       p++;");
        println("       if(p === curves[c].length) {");
        println("           c++;");
        println("           p = 0;");
        println("       }");
        println("    }");
        println("};");
    }
};

var draw = function() {
    background(247, 252, 247);
    strokeWeight(3);
    stroke(0, 0, 0);
    point(mouseX, mouseY);
    strokeWeight(sw);
    var c = color(0, 0, 0); //used to make newest curve red
    for(var i = 0; i < curves.length; i++) {
        if(i === curves.length - 1 && mouseHasBeenDragged) {
            c = color(255, 0, 0);
        }
        drawCurve(curves[i], c);
    }
};
