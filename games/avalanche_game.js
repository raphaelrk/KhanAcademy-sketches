// https://www.khanacademy.org/computer-programming/avalanche-game/5134149276139520

/**
 * Avalanche Game
 * By Raphael Rouvinov-Kats
 * 
 * Based on the popular game, "avalanche!"
 * 
 * Poor chiclet man
 * */

frameRate(60);

/** Player variables **/
var player_width = width/20;
var player_height = player_width * 2;

var player_ft = player_height * 3; // 1 foot = 1 pixel
var player_max_ft = player_ft;
var player_dft = 0;
var last_player_dft = 0;

var player_x = 200 - player_width/2;
var player_y = 260;
var player_dx = 0;
var player_max_dx = 10;
var player_min_dft = -10;
var player_jump = 15;

var gravity = -1;
var x_drag = 0.5;

/** keyCode variables **/
var realKeyCode = 0; // camelCase to match keyCode
var keyLeft = false;
var keyRight = false;
var keyUp = false;

/** Misc variables **/
var lava_color = color(255, 0, 0, 100);
var bg_color = color(134, 146, 153);

var ground_ft = 0;

var lava_ft = ground_ft - height;
var lava_dft = 0.5;

var ftToPixel = function(ft) {
    return player_y + player_ft - ft;
};

/** Block variables **/
var small_block_length = width/10;
var large_block_length = small_block_length * 2;
var framesBetweenSpawns = 60;
var blocks = [];

var Block = function() {
    this.len = random(0, 1) < 0.25 ? large_block_length : small_block_length;
    this.x = random(this.len, width - this.len); // x of top-left
    this.ft = player_ft + height/2 + this.len * 2; // y ft of top-left
    this.dft = random(8.5, 0.7);
};

Block.prototype.draw = function() {
    var y_pixel = ftToPixel(this.ft);
    
    fill(179, 25, 25);
    stroke(0, 0, 0);
    rect(this.x, y_pixel - this.len, this.len, this.len, 4);
    
    fill(bg_color);
    ellipse(this.x+this.len/2, y_pixel-this.len/2, this.len/2, this.len/2);
    
    var theta = map(lava_ft, this.ft, this.ft + this.len, 0, 360);
    if(theta > 0) {
        if(theta > 360) { theta = 360; }
        fill(lava_color);
        arc(this.x+this.len/2, y_pixel-this.len/2, this.len/2, this.len/2, 0, theta);
    }
};

// bottom-left corner = (x1, ft1)
var colliding = function(x1, ft1, w1, h1, x2, ft2, w2, h2) {
    var leftEnough =  x1 < x2 + w2;
    var rightEnough = x1 + w1 > x2;
    var highEnough = ft1 + h1 > ft2;
    var lowEnough = ft1 < ft2 + h2;
    
    //fill(86, 227, 86);
    //rect(x1, ftToPixel(ft1), w1, -h1);
    ///rect(x2, ftToPixel(ft2), w2, -h2);
    //fill(255, 255, 255);
    //println("highEnough: " + highEnough);
    //println("lowEnough: " + lowEnough);
    //println("rightEnough: " + rightEnough);
    //println("leftEnough: " + leftEnough);
    //println("ft1: " + ft1 + "\tft2: " + ft2 + "\th1: " + h1 + "\th2: " + h2);
    
    return (highEnough && lowEnough && leftEnough && rightEnough);
};

var drawChicletMan = function() {
    fill(255, 255, 255);
    stroke(0, 0, 0);
    
    var dh = 0,
        x = player_x, 
        w = player_width;
    
    if(player_dft < player_jump && player_dft > player_jump*3/4) {
        dh = map(player_dft, player_jump/2, player_jump, player_height, 0);
    } else if(player_dft < player_jump && player_dft > player_jump/2) {
        dh = map(player_dft, player_jump/2, player_jump, 0, player_height);
    }
    
    var y = player_y - player_height + dh,
        h = player_height - dh;
    
    translate(x+w/2, y+h/2);
    rotate(player_dx);
    rect(-w/2, -h/2, w, h, 3);
    
    resetMatrix();
};

var drawLava = function() {
    var y_pixel = ftToPixel(lava_ft + 1);
    
    fill(255, 0, 0, 100);
    noStroke();
    
    // left ground
    rect(0, y_pixel, width, 400 - y_pixel);
};

var drawGround = function() {
    var y_pixel = ftToPixel(ground_ft);
    
    fill(0, 0, 0);
    noStroke();
    
    // left ground
    rect(0, y_pixel, width*7/8, height);
    
    // right ground
    rect(width*7/8+2, y_pixel, width/8, height);
};

var render = function() {
    // draw background, lava, ground and player
    background(bg_color);
    drawLava();
    drawGround();
    drawChicletMan();
    
    // draw blocks
    for(var i = 0; i < blocks.length; i++) { blocks[i].draw(); }
    
    // draw player max ft
    fill(255, 255, 255);
    textSize(18);
    var text_h = textDescent()+textAscent();
    text(player_max_ft, width-textWidth(player_max_ft), text_h);
    
    // draw player current ft
    textSize(14);
    var text_h_2 = textDescent()+textAscent();
    text(player_ft, width-textWidth(player_ft), text_h + text_h_2);
};

var drawGameOver = function() {
    render();
    
    textAlign(CENTER);
    
    textSize(41);
    text("You Climbed", 134, 56);
    
    textSize(144);
    text(player_max_ft + "ft", 200, 170);
    
    textSize(64);
    text("Replay?", 216, 235);
};

/** DRAW FUNCTION **/
var draw = function() {
    // do the drawing
    render();
    
    // see if touching lava
    if(colliding(player_x, player_ft, player_width, player_height, 0, 0, width, lava_ft)) {
        noLoop();
        drawGameOver();
    }
    
    // move blocks, do block-to-block collision testing
    for(var i = 0; i < blocks.length; i++) {
        // move down
        var b = blocks[i];
        b.ft -= b.dft;
        
        // collision detection
        if(b.ft < 0) {
            b.ft = 0;
            continue;
        }
        
        for(var j = 0; j < blocks.length; j++) {
            if(i === j) {
                continue;
            }
            var b2 = blocks[j];
            if(colliding(b.x, b.ft, b.len, b.len, b2.x, b2.ft, b2.len, b2.len)) {
                b.ft += b.dft;
                break;
            }
        }
    }
    
    // add blocks
    if(blocks.length < 50 && frameCount % framesBetweenSpawns === 0) {
        var b = new Block();
        
        var collision = false;
        for(var i = 0; i < blocks.length; i++) {
            var b2 = blocks[i];
            if(colliding(b.x, b.ft, b.len, b.len, b2.x, b2.ft, b2.len, b2.len)) {
                collision = true;
                break;
            }
        }
        
        if(!collision) {
            blocks.push(new Block());
        }
    }
    
    lava_ft += lava_dft;
    
    // dx/dft changes from left/right/up keys
    if(keyIsPressed) {
        if(keyLeft) {
            player_dx = min(0, player_dx);
            player_dx -= x_drag*2;
        }
        if(keyRight) {
            player_dx = max(0, player_dx);
            player_dx += x_drag*2;
        }
        player_dx = min(player_max_dx, max(-player_max_dx, player_dx));
        
        if(keyUp && last_player_dft === 0 && player_dft === 0) {
            last_player_dft = player_dft;
            player_dft = player_jump; // jump if on ground
        }
    }
    
    // stopping left/right movement with drag or fall landing
    if(!keyLeft && !keyRight) {
        if(!keyUp) {
            player_dx *= x_drag; // slow down left/right if no keys are pressed
        } else {
            if(last_player_dft === 0 && player_dft === 0) {
                player_dx = 0; // stop moving left/right on jump landing
            }
        }
    }
    
    // store previous player position
    var start_p_x = player_x;
    var start_p_ft = player_ft;
    
    // move left/right
    player_x += player_dx;
    player_x = (player_x + 800) % 400; // move to other side of canvas if offscreen
    
    // undo left/right movement if colliding with a block after it
    for(var i = 0; i < blocks.length; i++) {
        var b = blocks[i];
        
        if(colliding(b.x, b.ft, b.len, b.len, player_x, player_ft, player_width, player_height)) {
            player_x = start_p_x;
            player_dx = 0;
            break;
        }
    }
    
    // move up/down
    player_ft += player_dft;
    player_ft = max(0, player_ft); // don't go below ground
    
    // if you haven't jumped this frame, record last dft and apply gravity
    if (player_dft !== last_player_dft || player_dft === 0) {
        last_player_dft = player_dft;
        player_dft += gravity;
    }
    
    // limit falling speed
    player_dft = max(player_dft, player_min_dft);
    
    // remove dft if touching ground and moving down
    if(player_ft <= 0 && player_dft < 0) { player_dft = 0; }
    
    // undo up/down movement if colliding with a block after it
    for(var i = 0; i < blocks.length; i++) {
        var b = blocks[i];
        if(colliding(b.x, b.ft, b.len, b.len, player_x, player_ft, player_width, player_height)) {
            player_ft = start_p_ft;
            player_dft = 0;
            if(keyUp) {
                player_dft = player_jump;
            }
            break;
        }
    }
    
    // update highest ft
    player_max_ft = max(player_ft, player_max_ft);
    
    // check for squeeze death
    var upperCollision = false, lowerCollision = false,
        rightCollision = false, leftCollision = false;
    for(var i = 0; i < blocks.length; i++) {
        var b = blocks[i];
        var p = 2; // padding
        if(colliding(b.x-p, b.ft-p, b.len+p*2, b.len+p*2,
                     player_x-p, player_ft-p, player_width+p*2, player_height+p*2)) {
            // max dx for left/right collision, dft for up/down collisions
            var max_dx = b.len/2 + player_width/2 + 1;
            var max_dft = b.len + 1;
            
            // max dx for up/down collision, dft for left/right collisions
            var max_dx2 = b.len/2 + player_width/2 - 2;
            var max_dft2 = b.len - 2;
            
            var dx = player_x - b.x;
            var dft = player_ft - b.ft;
            
            if(dft > 0 && abs(dft) < max_dft && abs(dx) < max_dx2) {
                lowerCollision = true;
            }
            if(dft < 0 && abs(dft) < max_dft && abs(dx) < max_dx2) {
                upperCollision = true;
            }
            if(dx < 0 && abs(dx) < max_dx && abs(dft) < max_dft2) {
                leftCollision = true;
            }
            if(dx > 0 && abs(dx) < max_dx && abs(dft) < max_dft2) {
                rightCollision = true;
            }
        }
    }
    
    // if squeeze death, lose, if no squeeze death, correct collisions
    if((leftCollision && rightCollision) || (upperCollision && lowerCollision)) {
        noLoop();
        drawGameOver();
    } else {
        if(leftCollision) { player_x++; }
        if(rightCollision) { player_x--; }
        if(lowerCollision) { player_ft++; }
        if(upperCollision) { player_ft--; }
    }
};

var keyPressed = function() {
    if(keyCode === LEFT) { keyLeft = true; }
    if(keyCode === RIGHT) { keyRight = true; }
    if(keyCode === UP) {
        // jump if not moving up/down and up arrow was down
        if(keyUp === false && last_player_dft === 0 && player_dft === 0) {
            player_dft = player_jump;
        }
        
        keyUp = true;
    }
};

var keyReleased = function() {
    if(keyCode === LEFT) { keyLeft = false; }
    if(keyCode === RIGHT) { keyRight = false; }
    if(keyCode === UP) { keyUp = false;}
};
