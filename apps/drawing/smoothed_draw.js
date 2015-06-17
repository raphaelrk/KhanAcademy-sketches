// https://www.khanacademy.org/computer-programming/smoothed-draw/2760976216

frameRate(0);
var cpoly=function(pts){
    beginShape();
    var l = pts.length;
    
    for(var i=0; i < l-2; i++){
        curveVertex((pts[i][0]+pts[i+1][0]+pts[i+2][0])/3, 
                    (pts[i][1]+pts[i+1][1]+pts[i+2][1])/3);
                    
        //ellipse(pts[i][0], pts[i][1], 1, 1);
        
        //bezier(pts[i-1][0], pts[i-1][1],
        //        pts[i+1][0], pts[i+1][1]);
    }
    endShape();
};
fill(0,0,0,0);
strokeWeight(0.5);
stroke(0, 0, 0);

var curves = [];

var mousePressed = function() {
     curves.push([]);
};

var mouseDragged = function() {
    curves[curves.length - 1].push([mouseX, mouseY]);
};

var keyTyped = function() {
    if(key + 0 === 122) { // z to undo
        curves.pop();
    }
};

var draw = function() {
    background(255, 220, 200);
    for(var i = 0; i < curves.length; i++) {
        cpoly(curves[i]);
        
        //var pts = curves[i];
        //for(var j = 0; j < pts.length-1; j++) {
            //line(pts[j][0], pts[j][1],
            //    pts[j+1][0],pts[j+1][1]);
        //}
    }
};
