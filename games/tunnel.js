// https://www.khanacademy.org/computer-programming/tunnel/4839992845139968

/**
 * Tunnel
 * by Raphael Rouvinov-Kats
 * 
 * Controls are all with the mouse
 * Click to start, pause, and restart
 * Move your mouse to dodge the walls
 * */

frameRate(60); // speed of the game, 0 = max, 60 = regular
var score = 0;

// stores in-game draw loop number
// could be used for array optimization
// var count = 0;

// player variables
var px = 200; // player's x
var py = 350; // player's x
var pd = 10; // player's diameter

// tunnel variables
var tc = []; // center/center history
var tw = []; // width in both directions/width history

// the gamemode
// 0 is startscreen
// 1 is in-game
// 2 is paused
// 3 is game-over/restart
var gamemode = 0;

// fonts
var lucida = createFont("Lucida Sans", 18);
var tahoma = createFont("Tahoma", 18);
var impact = createFont("Impact", 18);

var readyTunnel = function() {
    tc = [];
    tw = [];
    for(var i = 0; i < 80; i++) {
        tc.push(random(195, 205));
        tw.push(100);
    }
};

var pushTunnel = function() {
    // unshift is probably slow.. alternative includes
    // an array with a shifting start index/constant size
    
    var newWidth = tw[0];
    
    tw.unshift(100);
    tw.pop();
    
    var newCenter = tc[0] + random(-30, 30);
    
    tc.unshift(max(tw[0] + 5, 
            min(newCenter, 400 - tw[0] - 5)));
    tc.pop();
};

var drawTunnel = function() {
    for(var i = 0; i < tc.length; i++) {
        strokeWeight(1.5);
        line(0, i / tc.length * 400, // left side
                tc[i] - tw[i], i / tc.length * 400);
        line(tc[i] + tw[i], i / tc.length * 400, //right side
                400, i / tc.length * 400);
    }
};

var checkForCollision = function() {
    // player ends
    var topy = py - pd/2;
    var boty = py + pd/2;
    var leftx = px - pd/2;
    var rightx = px + pd/2;
    
    // indexes to check in the tunnel
    var ttop = floor(topy / 400 * tc.length);
    var tbot = ceil (boty / 400 * tc.length);
    
    for(var i = ttop; i < tbot; i++) {
        if(tc[i] - tw[i] > leftx) {
            return true;
        }
        if(tc[i] + tw[i] < rightx) {
            return true;
        }
        //if(dist(px, py, tc[i] - tw[i], py) < pd/2) {
        //    return true;
        //}
        //if(dist(px, py, tc[i] + tw[i], py) < pd/2) {
        //    return true;
        //}
    }
    return false;
};

readyTunnel();

var draw = function() {
    //draw tunnel
    background(28, 11, 54);
    strokeWeight(1);
    stroke(58, 144, 150);
    drawTunnel();
    
    //draw player
    noStroke();
    fill(255, 255, 255);
    ellipse(px, py, pd, pd);
    
    // draw score and its box
    fill(200, 11, 54, 150);
    rect(5, 365, 102, 26, 10);
    textFont(lucida, 18);
    fill(255, 255, 255);
    text("Score: " + score, 8, 385);
    
    if(gamemode === 0) { // start
        textFont(tahoma, 18);
        text("Click to start!", 150, 150);
    } else if(gamemode === 1) { //in-game
        pushTunnel();
        score++;
        if (checkForCollision()) {
            gamemode = 3;
        }
    } else if(gamemode === 2) { // paused
        textFont(tahoma, 18);
        text("Paused", 175, 150);
    } else if(gamemode === 3) { // game over
        textFont(impact, 28);
        text("Game Over", 135, 150);
        textFont(tahoma, 18);
        text("Click to restart", 135, 200);
    }
};

var mouseReleased = function() {
    if(gamemode === 0 || gamemode === 1) {
        gamemode++;
    } else if(gamemode === 2) {
        gamemode--;
    } else if(gamemode === 3) {
        readyTunnel();
        px = 200;
        py = 350;
        gamemode = 1;
        score = 0;
    }
};

var mouseMoved = function() {
    if(gamemode === 0) {
        px = max(tc[0] - tw[0] + pd, 
                min(tc[0] + tw[0] - pd, mouseX));
        py = max(pd, min(400 - pd, mouseY));
    } else if(gamemode === 1) {
        px = max(pd, min(400 - pd, mouseX));
        py = max(pd, min(400 - pd, mouseY));
    }
};
