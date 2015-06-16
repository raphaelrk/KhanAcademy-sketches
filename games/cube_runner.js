// https://www.khanacademy.org/computer-programming/cube-runner/6345182364565504

/**
 * Cuberunner
 * by Raphael Rouvinov-Kats
 * First edition: March 3rd, 2014
 * Second edition: August 7th, 2014
 *  - changed movement from dragging left/right to hovering l/r
 * Current Edition: May 23rd, 2015 
 *  - limited framerate
 * 
 * Based on the popular flash game by Max Abernethy
 * 
 * 3D learned from Peter Collinridge's tutorial at 
 * http://www.petercollingridge.appspot.com/3D-tutorial
 * 
 * Click to start/restart
 * Move your mouse left/right to move left/right
 * 
 * ** Thank you to Firestar for improving the aiming system
 * ** By removing the click and drag
 * ** Link to spinoff: https://www.khanacademy.org/cs/cube-runner-with-better-aiming-system/6643401681797120
 * ** Link to profile: https://www.khanacademy.org/profile/Thunderclan/programs
 * 
 * Your Goal: Avoid hitting the oncoming cubes for as long as possible!
 * 
 * TODO: 
 * Keeping cubes from overlapping
 * Clouds in pink mode
 * Black Mode
 * Collision that works when you go fast
 * */

var speed = 5;
var cubeFrequency = 1.2;
var focalLength = 300;
var heightAboveGround = 20;
var playerDistanceFromScreen = 40;
var cubeSpawnZ = 300;
var cubeSpawnXBounds = 500;
var cubeSize = 10;
var playerWidth = 3;

var focalLimiter = 0;
var currentZrotation = 0;
var maxRotation = 90;
var rotationSensitivity = 1.25;
var maxDx = 5;
var dxSensitivity = 0.02;
var cubeQueue = cubeFrequency;
var inMainMenu = true;
var gameOver = false;
var score = 0;
var nightMode = false;
var pinkMode = false;

frameRate(30);

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
    var faces = [[1, 5], [2, 6], [0, 2], [6, 4], [3, 7], [4, 0]];
    var colour = color(255, random(0, 255), 0);
    return { 'nodes': nodes, 'edges': edges, 'faces':faces, 'colour':colour };
};

var cubes = [];

var removeCubes = function() {
    var o = 0;
    while(o < cubes.length) {
        var removed = false;
        var obj = cubes[o];
        var nodes = obj.nodes;
        for(var n = 0; n < nodes.length; n++) {
            if(nodes[n][2] < 0) {
                cubes.splice(o, 1);
                removed = true;
                break;
            }
        }
        if(!removed) {
            o++;
        }
    }
};

// turns x/y and z values into x or y values on the focal plane (canvas)
var foc = function(xOrY, z) {
    return focalLength * xOrY / z;
};

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

var doTurning = function(stars) {
    var dx = mouseX - 200;
    
    dx *= dxSensitivity;
    
    // limit dx
    if(abs(dx) > maxDx) {
        var dxSign = dx/abs(dx);
        dx = maxDx * dxSign;
    }
    
    // var dy = mouseY - pmouseY;
    
    // transform each cube
    for (var obj=0; obj<cubes.length; obj++) {
        var nodes = cubes[obj].nodes;
        transform3D(-dx, 0, 0, nodes);
    }
    
    currentZrotation += -dx * rotationSensitivity;
    // limit z rotation
    if(abs(currentZrotation) > maxRotation) { // 30 degree angle max
        var currentZrotationSign = currentZrotation/abs(currentZrotation);
        currentZrotation = maxRotation * currentZrotationSign;
    }
    
    // transform stars
    transform3D(-dx * 5, 0, 0, stars);
    
    // move stars over to other side
    for(var s = 0; s < stars.length; s++) {
        // from fx = focalLength * stars[s][0] / stars[s][2] to stars[s][0] = ...
        var boundX = cubeSpawnXBounds * stars[s][2] / focalLength;
        
        if(stars[s][0] < -boundX) {
            stars[s][0] = boundX;
        }
        else if(stars[s][0] >= boundX) {
            stars[s][0] = -boundX;
        }
    }
};

var addCube = function() {
    var obj = createCuboid(random(-cubeSpawnXBounds, cubeSpawnXBounds), 
                           -cubeSize, cubeSpawnZ, 
                           cubeSize, cubeSize, cubeSize);
    transform3D(0, heightAboveGround, 0, obj.nodes);
    cubes.unshift(obj);
};

var ground = [[-500, 0], [500, 0], [500, 500], [-500, 500]];

// player coordinates
var p = [[-playerWidth/2, heightAboveGround, playerDistanceFromScreen], 
         [0, heightAboveGround, playerDistanceFromScreen+playerWidth*2], 
         [playerWidth/2, heightAboveGround, playerDistanceFromScreen]];

// stars during night mode
var stars = [];
for(var s = 0; s < 10; s++) {
    stars[s] = [random(-800, 800), random(-600, 100), random(500, 3000)];
}

var scoreStartTime = 0;

var draw = function() {
    background(255, 255, 255);
    if(nightMode) {
        background(0, 0, 0);
    }
    
    if(inMainMenu) {
        textFont(loadFont("Tahoma", 36), 36);
        text("Cube Runner", 100, 100);
        textFont(loadFont("Tahoma", 36), 24);
        text("Click to start", 130, 150);
    } else if(gameOver) {
        textFont(loadFont("Tahoma", 36), 36);
        text("Game Over", 110, 100);
        textFont(loadFont("Tahoma", 36), 24);
        text("Click to try again", 110, 150);
    } else {
        score = frameCount - scoreStartTime;
    }
    
    // rotate the screen based on mouse position
    // thanks to Firestar
    // (Used to be click and drag - never considered the idea
    //  until Firestar made it)
    // 'better aiming' spinoff: https://www.khanacademy.org/cs/cube-runner-with-better-aiming-system/6643401681797120
    // profile: https://www.khanacademy.org/profile/Thunderclan/programs
    doTurning(stars);
    
    // add cubes to horizon if speed isn't close to 0
    if(speed > 1) {
        cubeQueue += cubeFrequency;
        for(var i = 0; i < cubeQueue; i++) {
            addCube();
            cubeQueue--;
        }
    }
    
    
    // move towards cubes
    for(var n = 0; n < cubes.length; n++) {
        var o = cubes[n];
        transform3D(0, 0, -speed, o.nodes);
    }
    
    // remove cubes with any point behind you
    removeCubes();
    
    // move z rotation towards zero
    currentZrotation /= 1.2;
    if(abs(currentZrotation) < 1) {
        currentZrotation = 0;
    }
    
    // check for collision
    for(var o = 0; o < cubes.length; o++) {
        var obj = cubes[o];
        var nodes = obj.nodes;
        
        // cube x and z bounds
        var x1 = nodes[0][0]; // left
        var z1 = nodes[0][2]; // back
        var x2 = nodes[7][0]; // right
        var z2 = nodes[7][2]; // forward
        
        // check all of the player's points
        for(var ppoint = 0; ppoint < p.length; ppoint++) {
            // player x and z position
            var px = p[ppoint][0];
            var pz = p[ppoint][2];
            
            if(px >= x1 && px <= x2 && pz >= z1 && pz <= z2) {
                gameOver = true;
            }
        }
    }
    
    // color mode, speed/cube frequency/spawn z adjustments
    if(score % 900 < 300) {
        if(pinkMode === true || nightMode === true) {
            speed++;
            cubeSpawnZ += 7;
            focalLength -= 5;
        }
        nightMode = false;
        pinkMode = false;
    } else if(score % 900 < 600) {
        if(nightMode === false) {
            speed++;
            cubeSpawnZ += 7;
            focalLength -= 5;
        }
        nightMode = true;
        pinkMode = false;
    } else {
        if(pinkMode === false) {
            speed++;
            cubeSpawnZ += 7;
            cubeFrequency = min(2, cubeFrequency + 0.5);
            focalLength -= 5;
        }
        nightMode = false;
        pinkMode = true;
    }
    
    pushMatrix();
    translate(200, 200);
    
    // draw stars in night mode
    if(nightMode) {
        stroke(21, 138, 24);
        strokeWeight(5);
        rotateZ3D(currentZrotation, stars);
        for(var s = 0; s < stars.length; s++) {
            var sfx = foc(stars[s][0], stars[s][2]);
            var sfy = foc(stars[s][1], stars[s][2]);
            point(sfx, sfy);
        }
        rotateZ3D(-currentZrotation, stars);
        strokeWeight(1);
    }
    
    // draw ground
    noStroke();
    fill(166, 166, 166);
    if(nightMode) {
        fill(0, 0, 0);
    }
    if(pinkMode) {
        fill(255, 255, 255);
    }
    rotateZ3D(currentZrotation, ground);
    quad(ground[0][0], ground[0][1], 
         ground[1][0], ground[1][1], 
         ground[2][0], ground[2][1], 
         ground[3][0], ground[3][1]);
    rotateZ3D(-currentZrotation, ground);
    
    // draw player
    if(!inMainMenu) {
        stroke(0, 0, 0);
        fill(89, 89, 89);
        if(gameOver) { // fade player after game over
            var timeSinceGameOver = frameCount - scoreStartTime - score;
            stroke(0, 0, 0, 255 - min(254, 10*timeSinceGameOver));
            fill(89, 89, 89, 255 - min(254, 10*timeSinceGameOver));
            // this code thanks to Firestar
            // it makes the forward movement slow to a stop
            // when the player dies
            if (speed > 0) {
                speed-=0.2;
            }else if(speed < 0) {
                speed = 0;
            }
            text(cubes.length, 10, 10);
        }
        var p1fx = foc(p[0][0], p[0][2]);
        var p1fy = foc(p[0][1], p[0][2]);
        var p2fx = foc(p[1][0], p[1][2]);
        var p2fy = foc(p[1][1], p[1][2]);
        var p3fx = foc(p[2][0], p[2][2]);
        var p3fy = foc(p[2][1], p[2][2]);
        triangle(p1fx, p1fy, p2fx, p2fy, p3fx, p3fy);
    }
    
    // draw each object
    noStroke();
    
    var obj, nodes, edges, faces;
    for (obj=0; obj<cubes.length; obj++) {
        nodes = cubes[obj].nodes;
        edges = cubes[obj].edges;
        faces = cubes[obj].faces;
        
        rotateZ3D(currentZrotation, nodes);
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
            
            var fx1 = foc(n0[0], n0[2]);
            var fy1 = foc(n0[1], n0[2]);
            var fx2 = foc(n1[0], n1[2]);
            var fy2 = foc(n1[1], n1[2]);
            var fx3 = foc(n2[0], n2[2]);
            var fy3 = foc(n2[1], n2[2]);
            var fx4 = foc(n3[0], n3[2]);
            var fy4 = foc(n3[1], n3[2]);
            
            // draw face
            noStroke();
            if(nightMode) {
                fill(1, 0, 0, 0);
            }
            else if(pinkMode) {
                var col1 = color(250, 70, 172);
                var col2 = color(255, 255, 255, 0);
                var amt = 1 - min(1, max(0, (cubeSpawnZ - n0[2])/cubeSpawnZ));
                fill(lerpColor(col1, col2, amt));
            } else {
                var col1 = cubes[obj].colour;
                var col2 = color(255, 255, 255, 0);
                var amt = 1 - min(1, max(0, 3*(cubeSpawnZ - n0[2])/cubeSpawnZ));
                fill(lerpColor(col1, col2, amt));
            }
            quad(fx1, fy1, fx2, fy2, fx3, fy3, fx4, fy4);
            
            // draw edges
            if(nightMode) {
                var col1 = color(0, 156, 18);
                var col2 = color(1, 0, 0, 0);
                var amt = 1 - min(1, max(0, 3*(cubeSpawnZ - n0[2])/cubeSpawnZ));
                stroke(lerpColor(col1, col2, amt));
            }
            else if(pinkMode) {
                var col1 = color(255, 255, 255);
                var col2 = color(255, 255, 255, 0);
                var amt = 1 - min(1, max(0, 3*(cubeSpawnZ - n0[2])/cubeSpawnZ));
                stroke(lerpColor(col1, col2, amt));
            } else {
                var col1 = color(0, 0, 0);
                var col2 = color(1, 0, 0, 0);
                var amt = 1 - min(1, max(0, 3*(cubeSpawnZ - n0[2])/cubeSpawnZ));
                stroke(lerpColor(col1, col2, amt));
            }
            line(fx1, fy1, fx2, fy2);
            line(fx2, fy2, fx3, fy3);
            line(fx3, fy3, fx4, fy4);
            line(fx4, fy4, fx1, fy1);
            
            // say node numbers
            // fill(0, 0, 0);
            // text(e0[0], fx1, fy1);
            // text(e0[1], fx2, fy2);
            // text(e1[0], fx3, fy3);
            // text(e1[1], fx4, fy4);
        }
        rotateZ3D(-currentZrotation, nodes);
    }
    
    popMatrix();
    
    fill(0, 0, 0);
    if(nightMode) {
        fill(28, 199, 74);
    }
    text("score: " + score, 10, 380);
    if(!gameOver && score > 300 && score % 300 < 30) {
        text("SPEED UP", 150, 150);
    }
    
    // for testing
    //text("first x: " + cubes[0].nodes[0][0], 5, 353);
    //text("first y: " + cubes[0].nodes[0][1], 5, 373);
    //text("first z: " + cubes[0].nodes[0][2], 5, 393);
    //text("fx: "+focalLength*cubes[0].nodes[0][0]/cubes[0].nodes[0][2], 170, 353);
    //text("fy: "+focalLength*cubes[0].nodes[0][1]/cubes[0].nodes[0][2], 170, 373);
    //text("cubes: " + cubes.length, 5, 333);
    //text("zrot: " + currentZrotation, 5, 333);
};

var mouseDragged = function() {
    var dx = mouseX - pmouseX;
    
    dx *= dxSensitivity;
    
    // limit dx
    if(abs(dx) > maxDx) {
        var dxSign = dx/abs(dx);
        dx = maxDx * dxSign;
    }
    
    // var dy = mouseY - pmouseY;
    
    // transform each cube
    for (var obj=0; obj<cubes.length; obj++) {
        var nodes = cubes[obj].nodes;
        transform3D(-dx, 0, 0, nodes);
    }
    
    currentZrotation += -dx * rotationSensitivity;
    // limit z rotation
    if(abs(currentZrotation) > maxRotation) { // 30 degree angle max
        var currentZrotationSign = currentZrotation/abs(currentZrotation);
        currentZrotation = maxRotation * currentZrotationSign;
    }
    
    // transform stars
    transform3D(-dx * 5, 0, 0, stars);
    
    // move stars over to other side
    for(var s = 0; s < stars.length; s++) {
        // from fx = focalLength * stars[s][0] / stars[s][2] to stars[s][0] = ...
        var boundX = cubeSpawnXBounds * stars[s][2] / focalLength;
        
        if(stars[s][0] < -boundX) {
            stars[s][0] = boundX;
        }
        else if(stars[s][0] >= boundX) {
            stars[s][0] = -boundX;
        }
    }
};

var mouseClicked = function() {
    if(inMainMenu) {
        inMainMenu = false;
        gameOver = false;
        scoreStartTime = frameCount;
        cubes = [];
    } else if(gameOver) {
        inMainMenu = false;
        gameOver = false;
        cubes = [];
        scoreStartTime = frameCount;
        speed = 5;
        cubeSpawnZ = 300;
        cubeFrequency = 1.2;
        focalLength = 300;
    }
};
