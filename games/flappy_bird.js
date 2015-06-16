// https://www.khanacademy.org/computer-programming/flappy-bird/4701950463442944

/**
 * Flappy birds for KhanAcademy
 * by Raphael Rouvinov-Kats based off the popular app
 * 
 * UPDATED 11-14-2014
 * Last update before it was 9 months ago
 * Added frameRate(30) in because the program apparently started going 60fps when it was configured to run at 30
 * */
 
frameRate(30);

// variables for the width and space in the middle of pipes
var pipeW = 40;
var space = 100;
var endW = pipeW + 10;
var endH = 20;

// space between pipes
var pipeSpace = width / (4 - 1);

// max and min height of pipes
var pipeMaxY = 250;
var pipeMinY = 100;

// speed the pipe's move left
var pipeSpeed = 4;

// variables for bird's location and movement
var birdX = 100; // x is constant
var birdY = 200;
var birdR = 10;
var birdDY = 0;
// var birdDX = 0;

// PHYSICS
var grav = 1.5;
var jump = 0.15;

var groundY = 350;

var pipeStartLocation = 500;
var pipes = [[pipeStartLocation,               random(pipeMinY, pipeMaxY)], 
             [pipeStartLocation + pipeSpace,   random(pipeMinY, pipeMaxY)], 
             [pipeStartLocation + pipeSpace*2, random(pipeMinY, pipeMaxY)], 
             [pipeStartLocation + pipeSpace*3, random(pipeMinY, pipeMaxY)]]; 


noStroke();

var inGame = false;
var inStart = true;
var inGameOver = false;

var score = 0;
var gotFirstPoint = false;

var drawBird = function() {
    pushMatrix();
        translate(birdX, birdY);
        
        // angle the bird
        rotate(-40);
        rotate(max(-0, min(120, 20*birdDY)));
        
        // body
        stroke(0, 0, 0);
        strokeWeight(1);
        fill(255, 221, 0);
        ellipse(0, 0, birdR*2 - 2, birdR*1.6 - 2);
        
        // belly
        fill(255, 170, 0);
        arc(0, 0, birdR*2 - 2, birdR*1.6 - 2, 30, 150);
        
        // wing
        fill(254, 255, 178);
        pushMatrix();
            rotate(sin(frameCount * 80) * 15); // flap rotation
            ellipse(-birdR*4/5, 0, birdR * 0.9, birdR * 0.6);
        popMatrix();
        
        // eye
        fill(255, 255, 255);
        pushMatrix();
            rotate(22);
            ellipse(birdR/2, -birdR/3, birdR, birdR * 0.8);
        popMatrix();
        fill(0, 0, 0);
        ellipse(birdR*0.9, -birdR/20, birdR/5, birdR / 3);
        
        // lips
        fill(255, 0, 72);
        ellipse(birdR/2, birdR*3/5, birdR*0.8, birdR / 4);
        ellipse(birdR*0.6, birdR*2/5, birdR, birdR / 4);
        
        noStroke();
    popMatrix();
};

var drawGround = function() {
    // dirt
    fill(214, 189, 145);
    rect(0, groundY, 400, 400 - groundY);
    
    // dark green grass
    fill(68, 143, 62);
    rect(0, groundY, 400, 5);
    stroke(82, 179, 85);
    
    // diagonal grass
    strokeWeight(3.0);
    for(var x = 0; x < 440; x += 10) {
        pushMatrix();
            translate(x, groundY + 5);
            if(!inGameOver) {
                translate(-(pipeSpeed*frameCount % 10), 0);
            }
            rotate(225);
            line(0, 2, 0, 5);
        popMatrix();
    }
    noStroke();
};

var drawPipe = function(x, y) {
    strokeWeight(4.0);
    
    // pipe body
    fill(65, 186, 79);
    stroke(0, 0, 0, 180);
    rect(x - pipeW / 2, 0, pipeW, y - space / 2); // top
    rect(x - pipeW / 2, y + space / 2, pipeW, 400 - y - space / 2 + 10); // bottom
    noStroke();
    
    // pipe stripes
    colorMode(HSB);
    var bodyColW = 5;
    for(var c = x - pipeW / 2; c < x + pipeW / 2; c += bodyColW) {
        fill(68, 230, 170 + (x - c) / bodyColW * 20);
        rect(c, 0, bodyColW, y - space / 2);
        rect(c, y + space / 2, bodyColW, 400 - y - space / 2 + 10); // bottom
    }
    
    // pipe end
    fill(65, 186, 79);
    stroke(0, 0, 0, 180);
    rect(x - endW / 2, y - space / 2 - endH, endW, endH, 3); // top
    rect(x - endW / 2, y + space / 2, endW, endH, 3); // bottom
    noStroke();
    
    // end stripes
    colorMode(HSB);
    var endColW = 5;
    for(var c = x - endW / 2; c < x + endW / 2; c += endColW) {
        fill(68, 230, 170 + (x - c) / endColW * 20);
        rect(c, y - space / 2 - endH, endColW, endH);
        rect(c, y + space / 2, endColW, endH); // bottom
    }
    
    colorMode(RGB);
};

var drawBackground = function() {
    
    // clouds
    fill(244, 245, 235);
    for(var x = 0; x <= 400; x += 40) {
        var noiseScale = 0.02;
        var noiseVal = noise(-x*noiseScale);
        ellipse(x, groundY, noise(noiseVal) * 120, noiseVal * 220);
    }
    
    
    // hills/trees
    fill(98, 209, 102, 240);
    stroke(66, 128, 42);
    for(var x = 0; x <= 400; x += 20) {
        var noiseScale = 0.02;
        var noiseVal = noise(x*noiseScale);
        ellipse(x, groundY, noise(noiseVal)*50, noiseVal * 100);
    }
    
    noStroke();
};

var draw = function() {
  if(inGame) {
    background(139, 205, 214);
    drawBackground();
    for(var i = 0; i < pipes.length; i++) {
        drawPipe(pipes[i][0], pipes[i][1]);
    }
    drawGround();
    drawBird();
    
    fill(76, 73, 153, 200);
    stroke(0, 0, 0, 130);
    rect(18, 358, 200, 40, 10);
    fill(255, 255, 255);
    text("Score: " + score, 20, 390);
    noStroke();
    
    // making the bird fall
    birdDY += grav;
    birdY += birdDY;
    
    if(birdY < birdR) {
        birdY = birdR;
    }
    if(birdDY < 0 && birdDY > -space / 10) {
        birdDY += 1;
    }
    
    // move pipes
    for(var i = 0; i < pipes.length; i++) {
        pipes[i][0] -= pipeSpeed;
    }
    
    // make new pipe when farthest right one is pipeSpace away from right
    if(pipes[pipes.length - 1][0] <= width - pipeSpace) {
        pipes.push([400 + endW, random(pipeMinY, pipeMaxY)]);
    }
    
    // delete offscreen left pipes
    if(pipes[0][0] < -endW) {
        pipes.shift();
        score++;
    }
    
    
    // check for collision
    var collision = false;
    
    var birdTop = birdY - birdR;
    var birdBottom = birdY + birdR;
    var birdLeft = birdX - birdR;
    var birdRight = birdX + birdR;
    
    if(!gotFirstPoint && birdX > pipes[0][0]) {
        gotFirstPoint = true;
        score++;
    }
    
    if(birdBottom >= groundY) {
        collision = true;
    } else {
        for(var i = 0; i < pipes.length; i++) {
            // if not too for left or right
            var tooLeft = birdRight < pipes[i][0]-endW/2;
            var tooRight = birdLeft > pipes[i][0]+endW/2;
            if(!tooLeft && !tooRight) {
                var tooHigh = birdBottom < pipes[i][1] + space/2;
                var tooLow = birdTop > pipes[i][1] - space/2;
                if(!tooHigh || !tooLow) {
                    // using end pipe left/rights this means collision
                    collision = true;
                    break;
                }
            } else {
                //inColX = false;
            }
        }
    }
    
    if(collision) {
        inGame = false;
        inGameOver = true;
    }
  } else if(inStart) {
      background(139, 205, 214);
      drawBackground();
      drawGround();
      
      fill(255, 255, 255, 127);
      stroke(0, 0, 0, 127);
      rect(65, 62, 187, 50, 10);
      noStroke();
      
      textFont(loadFont("Tahoma", 36), 36);
      fill(68, 143, 62);
      text("Flappy Bird", 70, 100);
      
      stroke(0, 0, 0);
      if(mouseX >= 70 && mouseX <= 70 + 100 && mouseY >= 250 && mouseY <= 250 + 50) {
          fill(73, 173, 64);
          if(mouseIsPressed) {
              inGame = true;
              inStart = false;
          }
      }
      rect(70, 250, 100, 50, 5);
      fill(0, 0, 0);
      text("Start", 80, 290);
      noStroke();
      
      drawBird();
  } else if(inGameOver) {
      background(139, 205, 214);
      drawBackground();
      for(var i = 0; i < pipes.length; i++) {
        drawPipe(pipes[i][0], pipes[i][1]);
      }
      drawGround();
      drawBird();
      
      fill(255, 255, 255, 127);
      stroke(0, 0, 0, 127);
      rect(80, 110, 280, 150, 15);
      noStroke();
      
      
      fill(0, 0, 0);
      textFont(loadFont("Tahoma", 36), 36);
      text("Game Over\n Try again!", 100, 150);
      
      text("Final Score: " + score, 85, 250);
      
      if(birdY + birdR < groundY) {
          birdDY++;
          birdY += birdDY;
      } else if(birdY + birdR > groundY) {
          birdY = groundY - birdR*0.8;
      }
  }
};

var lastMousePress = millis();
var mousePressed = function() {
    lastMousePress = millis();
    if(inGame) {
        birdDY = -space*jump;
    }
};
