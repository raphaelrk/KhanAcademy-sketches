// https://www.khanacademy.org/computer-programming/perspective-3d/4549548250759168

/**
 * 3D
 * From Peter Collinridge's tutorial at 
 * http://www.petercollingridge.appspot.com/3D-tutorial
 * 
 * use up/down arrow keys to move in and out, mouse to look around
 * 
 * Added: perspective projection, faces, move forward/back with up/down arrow keys, autorotate
 * */

var focalLength = 300;
var focalLimiter = 0;
var backgroundColour = color(255, 250, 255);
var nodeColour = color(40, 168, 107);
var edgeColour = color(34, 68, 204);
var faceColour = color(69, 57, 237, 100);
var nodeSize = 6;
var showAxes = false;
var autoRotateX = false;
var autoRotateY = false;
var autoRotateZ = false;

var createCuboid = function(x, y, z, w, h, d) {
    var nodes = [[x,   y,   z  ],
                 [x,   y,   z+d],
                 [x,   y+h, z  ],
                 [x,   y+h, z+d],
                 [x+w, y,   z  ],
                 [x+w, y,   z+d],
                 [x+w, y+h, z  ],
                 [x+w, y+h, z+d]];
    var edges = [[0, 1], [1, 3], [2, 3], [2, 0],
                 [4, 5], [5, 7], [6, 7], [6, 4],
                 [0, 4], [1, 5], [2, 6], [3, 7]];
    var faces = [[0, 2], [2, 6], [6, 4], [4, 0], [1, 5], [3, 7]];
    return { 'nodes': nodes, 'edges': edges, 'faces':faces };
};
// -174, -120, 196 >> -116, -75, 254
// 60, 45, 60
var object1 = createCuboid(-55, -5, 320, 240, 40, 40);
var object2 = createCuboid(-45, -35, 310, -30, 100, 60);
var object3 = createCuboid( 175, -35, 310,  30, 100, 60);
var objects = [object1, object2, object3];

var rotateZ3D = function(theta, nodes) {
    var sin_t = sin(theta);
    var cos_t = cos(theta);
    
    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var y = node[1];
        node[0] = x * cos_t - y * sin_t;
        node[1] = y * cos_t + x * sin_t;
    }
};

var rotateY3D = function(theta, nodes) {
    var sin_t = sin(theta);
    var cos_t = cos(theta);
    
    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var z = node[2];
        node[0] = x * cos_t - z * sin_t;
        node[2] = z * cos_t + x * sin_t;
    }
};

var rotateX3D = function(theta, nodes) {
    var sin_t = sin(theta);
    var cos_t = cos(theta);
    
    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var y = node[1];
        var z = node[2];
        node[1] = y * cos_t - z * sin_t;
        node[2] = z * cos_t + y * sin_t;
    }
};

var transform3D = function(x, y, z, nodes) {
    for(var n=0; n<nodes.length; n++) {
        nodes[n][0] += x;
        nodes[n][1] += y;
        nodes[n][2] += z;
    }
};

for (var obj=0; obj<objects.length; obj++) {
    var nodes = objects[obj].nodes;
    rotateY3D(14, nodes);
    rotateX3D(19, nodes);
}

var draw = function() {
    background(backgroundColour);
    pushMatrix();
    translate(200, 200);
    
    var obj, nodes, edges, faces;
    
    // draw axes
    if(showAxes) {
        stroke(255, 0, 0);
        line(-180, 0, 180, 0);
        stroke(0, 255, 0);
        line(0, -180, 0, 180);
        stroke(0, 0, 255);
        strokeWeight(5);
        point(0, 0);
    }
    
    // draw faces of each object
    noStroke();
    fill(faceColour);
    for (obj=0; obj<objects.length; obj++) {
        nodes = objects[obj].nodes;
        edges = objects[obj].edges;
        faces = objects[obj].faces;
        
        for(var f=0; f<faces.length; f++) {
            var e0 = edges[faces[f][0]];
            var e1 = edges[faces[f][1]];
            var n0 = nodes[e0[0]];
            var n1 = nodes[e0[1]];
            var n2 = nodes[e1[1]];
            var n3 = nodes[e1[0]];
            
            if(n0[2] < focalLimiter || n1[2] < focalLimiter || 
                n2[2] < focalLimiter || n3[2] < focalLimiter) {
                continue;
            }
            
            var fx1 = focalLength * n0[0] / n0[2];
            var fy1 = focalLength * n0[1] / n0[2];
            var fx2 = focalLength * n1[0] / n1[2];
            var fy2 = focalLength * n1[1] / n1[2];
            var fx3 = focalLength * n2[0] / n2[2];
            var fy3 = focalLength * n2[1] / n2[2];
            var fx4 = focalLength * n3[0] / n3[2];
            var fy4 = focalLength * n3[1] / n3[2];
            quad(fx1, fy1, fx2, fy2, fx3, fy3, fx4, fy4);
        }
    }
    
    // draw edges of each object
    stroke(edgeColour);
    strokeWeight(1);
    for (obj=0; obj<objects.length; obj++) {
        nodes = objects[obj].nodes;
        edges = objects[obj].edges;

        for (var e=0; e<edges.length; e++) {
            var n0 = edges[e][0];
            var n1 = edges[e][1];
            var node0 = nodes[n0];
            var node1 = nodes[n1];
            if(node0[2] < focalLimiter || node1[2] < focalLimiter) {
                continue;
            }
            var fx1 = focalLength * node0[0] / node0[2];
            var fy1 = focalLength * node0[1] / node0[2];
            var fx2 = focalLength * node1[0] / node1[2];
            var fy2 = focalLength * node1[1] / node1[2];
            line(fx1, fy1, fx2, fy2);
        }   
    }
    
    // draw nodes of each object
    fill(nodeColour);
    noStroke();
    for (obj=0; obj<objects.length; obj++) {
        nodes = objects[obj].nodes;
    
        for (var n=0; n<nodes.length; n++) {
            var node = nodes[n];
            if(node[2] < focalLimiter) { continue; }
            var fx = focalLength * node[0] / node[2];
            var fy = focalLength * node[1] / node[2];
            
            ellipse(fx, fy, nodeSize, nodeSize);
            //fill(0, 0, 0); // code to put text near nodes
            //text(n, node[0], node[1]);
            //fill(nodeColour);
        }
    }
    popMatrix();
    
    // autorotate
    for (obj=0; obj<objects.length; obj++) {
        nodes = objects[obj].nodes;
        
        if(autoRotateX) { rotateX3D(1, nodes); }
        if(autoRotateY) { rotateY3D(1, nodes); }
        if(autoRotateZ) { rotateZ3D(1, nodes); }
    }
    
    // draw autorotate boxes
    fill(255, 99, 99);
    if(mouseX>=330 && mouseX<=340 && mouseY>=385 && mouseY<=395) { fill(255, 0, 0); }
    rect(330, 385, 10, 10);
    fill(0, 0, 0);
    text("x", 333, 393);
    
    fill(140, 255, 140);
    if(mouseX>=350 && mouseX<=360 && mouseY>=385 && mouseY<=395) { fill(0, 255, 0); }
    rect(350, 385, 10, 10);
    fill(0, 0, 0);
    text("y", 352, 393);
    
    fill(135, 135, 255);
    if(mouseX>=370 && mouseX<=380 && mouseY>=385 && mouseY<=395) { fill(80, 80, 250); }
    rect(369, 385, 10, 10);
    fill(0, 0, 0);
    text("z", 372, 393);
    
    // for testing
    //text("first x: " + objects[0].nodes[0][0], 5, 353);
    //text("first y: " + objects[0].nodes[0][1], 5, 373);
    text("first z: " + objects[0].nodes[0][2], 5, 393);
    //text("fx: "+focalLength*objects[0].nodes[0][0]/objects[0].nodes[0][2], 170, 353);
    //text("fy: "+focalLength*objects[0].nodes[0][1]/objects[0].nodes[0][2], 170, 373);
};

var mouseDragged = function() {
    var dx = mouseX - pmouseX;
    var dy = mouseY - pmouseY;
    
    // rotate each object
    for (var obj=0; obj<objects.length; obj++) {
        var nodes = objects[obj].nodes;
        rotateY3D(dx, nodes);
        rotateX3D(dy, nodes);
    }
};

var keyPressed = function() {
    if(keyCode === UP) {
        for(var n = 0; n < objects.length; n++) {
            var o = objects[n];
            transform3D(0, 0, -10, o.nodes);
        }
    }
    if(keyCode === DOWN) {
        for(var n = 0; n < objects.length; n++) {
            var o = objects[n];
            transform3D(0, 0, 10, o.nodes);
        }
    }
    if(keyCode === LEFT) {
        for(var n = 0; n < objects.length; n++) {
            var o = objects[n];
            // rotateY3D(2, o.nodes);
            transform3D(10, 0, 0, o.nodes);
        }
    }
    if(keyCode === RIGHT) {
        for(var n = 0; n < objects.length; n++) {
            var o = objects[n];
            // rotateY3D(-2, o.nodes);
            transform3D(-10, 0, 0, o.nodes);
        }
    }
};

var mouseClicked = function() {
    if(mouseX>=330 && mouseX<=340 && mouseY>=385 && mouseY<=395) {
        autoRotateX = !autoRotateX;
    }
    if(mouseX>=350 && mouseX<=360 && mouseY>=385 && mouseY<=395) {
        autoRotateY = !autoRotateY;
    }
    if(mouseX>=370 && mouseX<=380 && mouseY>=385 && mouseY<=395) {
        autoRotateZ = !autoRotateZ;
    }
};
