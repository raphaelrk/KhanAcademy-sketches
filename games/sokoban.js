// https://www.khanacademy.org/computer-programming/sokoban/5927092506066944

/**
 * Sokoban
 * by Raphael Rouvinov-Kats
 * 
 * The aim of the game is to fill every wooden stand with a gem
 * 
 * Feel free to make spin-offs with your own levels! Show they're playable by
 * saving them when "Clear!"
 * */

var grid = [ // 0 grass, 8 wall, 1 wood
    [0, 0, 8, 8, 8, 8, 8, 0],
    [8, 8, 8, 0, 0, 0, 8, 0],
    [8, 1, 0, 0, 0, 0, 8, 0],
    [8, 8, 8, 0, 0, 1, 8, 0],
    [8, 1, 8, 8, 0, 0, 8, 0],
    [8, 0, 8, 0, 1, 0, 8, 8],
    [8, 0, 0, 1, 0, 0, 1, 8],
    [8, 0, 0, 0, 1, 0, 0, 8],
    [8, 8, 8, 8, 8, 8, 8, 8]
    ];
    
var boxes = [[3, 2], [4, 3],[4, 4], [4, 6], [5, 6], [3, 6], [1, 6]];

var player = [2, 2];
var won = false;
    
var xScale = 400/grid[0].length;
var yScale = 400/grid.length;
    
var draw = function() {
    background(116, 196, 63);
    
    // draw
    for(var r = 0; r < grid.length; r++) {
        // draw grid
        for(var c = 0; c < grid[r].length; c++) {
            var block = grid[r][c];
            var img;
            switch(block){
                case 0: img = getImage("cute/GrassBlock"); break;
                case 1: img = getImage("cute/WallBlock"); break;
                case 8: img = getImage("cute/StoneBlockTall"); break;
                default: img = getImage("avatars/questionmark"); break;
            }
            image(img, c*xScale, r*yScale*0.9, xScale, yScale*0.9*2);
        }
        
        // draw boxes
        for(var j = 0; j < boxes.length; j++) {
            if(boxes[j][1] === r) { // if on this row
                var img = getImage("cute/GemBlue");
                image(img, boxes[j][0]*xScale+10, r*yScale*0.9, xScale*0.7, yScale*0.7*2);
            }
        }
        
        // draw player
        if(player[1] === r) {
            var img = getImage("creatures/Hopper-Cool");
            image(img, player[0]*xScale, r*yScale*0.9 + 10, xScale, yScale);
        }
    }
    
    if(won) {
        fill(255, 255, 255);
        textFont(loadFont("Tahoma", 96), 96);
        text("Clear!", 90, 170);
    }
};

var keyPressed = function() {
    if(keyCode === UP) {
        if(grid[player[1]-1][player[0]] !== 8) { // if not going into a wall
            var hitABox = false;
            var boxIndex = -1;
            for(var i = 0; i < boxes.length; i++) {
                // if hitting a box
                if(boxes[i][0] === player[0] && boxes[i][1] === player[1] - 1) {
                    hitABox = true;
                    boxIndex = i;
                    break;
                }
            }
            if(hitABox) {
                // check if you can move the box
                if(grid[player[1]-2][player[0]] !== 8) { // if not going into a wall
                    var hitABox2 = false;
                    var boxIndex2 = -1;
                    for(var i = 0; i < boxes.length; i++) {
                        // if hitting a box
                        if(boxes[i][0] === player[0] && boxes[i][1] === player[1] - 2) {
                            hitABox2 = true;
                            boxIndex2 = i;
                            break;
                        }
                    }
                    if(!hitABox2) {
                        player[1]--;
                        boxes[boxIndex][1]--;
                    }
                }
            } else {
                player[1]--;
            }
        }
    }
    if(keyCode === DOWN) {
        if(grid[player[1]+1][player[0]] !== 8) { // if not going into a wall
            var hitABox = false;
            var boxIndex = -1;
            for(var i = 0; i < boxes.length; i++) {
                // if hitting a box
                if(boxes[i][0] === player[0] && boxes[i][1] === player[1] + 1) {
                    hitABox = true;
                    boxIndex = i;
                    break;
                }
            }
            if(hitABox) {
                // check if you can move the box
                if(grid[player[1]+2][player[0]] !== 8) { // if not going into a wall
                    var hitABox2 = false;
                    var boxIndex2 = -1;
                    for(var i = 0; i < boxes.length; i++) {
                        // if hitting a box
                        if(boxes[i][0] === player[0] && boxes[i][1] === player[1] + 2) {
                            hitABox2 = true;
                            boxIndex2 = i;
                            break;
                        }
                    }
                    if(!hitABox2) {
                        player[1]++;
                        boxes[boxIndex][1]++;
                    }
                }
            } else {
                player[1]++;
            }
        }
    }
    if(keyCode === LEFT) {
        if(grid[player[1]][player[0]-1] !== 8) { // if not going into a wall
            var hitABox = false;
            var boxIndex = -1;
            for(var i = 0; i < boxes.length; i++) {
                // if hitting a box
                if(boxes[i][1] === player[1] && boxes[i][0] === player[0] - 1) {
                    hitABox = true;
                    boxIndex = i;
                    break;
                }
            }
            if(hitABox) {
                // check if you can move the box
                if(grid[player[1]][player[0]-2] !== 8) { // if not going into a wall
                    var hitABox2 = false;
                    var boxIndex2 = -1;
                    for(var i = 0; i < boxes.length; i++) {
                        // if hitting a box
                        if(boxes[i][1] === player[1] && boxes[i][0] === player[0] - 2) {
                            hitABox2 = true;
                            boxIndex2 = i;
                            break;
                        }
                    }
                    if(!hitABox2) {
                        player[0]--;
                        boxes[boxIndex][0]--;
                    }
                }
            } else {
                player[0]--;
            }
        }
    }
    if(keyCode === RIGHT) {
        if(grid[player[1]][player[0]+1] !== 8) { // if not going into a wall
            var hitABox = false;
            var boxIndex = -1;
            for(var i = 0; i < boxes.length; i++) {
                // if hitting a box
                if(boxes[i][1] === player[1] && boxes[i][0] === player[0] + 1) {
                    hitABox = true;
                    boxIndex = i;
                    break;
                }
            }
            if(hitABox) {
                // check if you can move the box
                if(grid[player[1]][player[0]+2] !== 8) { // if not going into a wall
                    var hitABox2 = false;
                    var boxIndex2 = -1;
                    for(var i = 0; i < boxes.length; i++) {
                        // if hitting a box
                        if(boxes[i][1] === player[1] && boxes[i][0] === player[0] + 2) {
                            hitABox2 = true;
                            boxIndex2 = i;
                            break;
                        }
                    }
                    if(!hitABox2) {
                        player[0]++;
                        boxes[boxIndex][0]++;
                    }
                }
            } else {
                player[0]++;
            }
        }
    }
    
    // check if you won
    won = true;
    for(var i = 0; i < boxes.length; i++) {
        if(grid[boxes[i][1]][boxes[i][0]] !== 1) {
            won = false;
            break;
        }
    }
};
