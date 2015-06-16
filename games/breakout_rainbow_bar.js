// https://www.khanacademy.org/computer-programming/rainbow-bar-breakout/4588340630257664

/**
 * Rainbow bar breakout!
 * By Raphael Rouvinov-Kats
 * Based on http://wonderfl.net/c/tNGi
 * */

colorMode(HSB, 400);
var pixS = 4;
var rainbawrHeight = 100;
var paddleW = 50;
var paddleH = 5;
var paddleY = 380;
var paddleX;
var startscreen = true;

var rainbawr = [];

for(var j = 0; j < rainbawrHeight; j += pixS) {
    for(var i = 0; i < 400; i += pixS) {
        rainbawr.push([i, j]);
    }
}

var pixels = [];
pixels.push([375, 199, random(-10, 10), random(3, 5), 200]); // x, y, dx, dy, starting x

background(0, 0, 0);

var draw = function() {
    // update paddle
    paddleX = max(0, min(400 - paddleW, mouseX - paddleW / 2));
    
  if(startscreen) {
      if(mouseIsPressed) {
          startscreen = false;
      }
  } else {
    // update pixels
    var i = 0;
    while(i < pixels.length) {
        pixels[i][0] += pixels[i][2]; // x += dx
        pixels[i][1] += pixels[i][3]; // y += dy
        
        // if at paddleY
        if(pixels[i][1] + pixS > paddleY && pixels[i][1] < paddleY + paddleH) { 
            // and if in paddle X
            if(pixels[i][0] + pixS > paddleX && pixels[i][0] < paddleX + paddleW) { 
                pixels[i][3] = -pixels[i][3]; // then flip dy - Bounce
            }
        } else if(pixels[i][1] >= 400) { // if y offscreen
            pixels.splice(i, 1); // remove
            continue;
        }
        
        if(pixels[i][1] <= 0) { // if y <= 0
            pixels[i][3] = -pixels[i][3];
        }
        
        if(pixels[i][0] < 0 || pixels[i][0] >= 400) { // if x offscreen
            pixels[i][2] = -pixels[i][2]; // flip dx - bounce
        }
        
        // if close to rainbawr
        if(pixels[i][1] + pixS <= rainbawrHeight) {
            var j = rainbawr.length - 1;
            while(j >= 0) { // check if you're hitting any blocks
                var d = dist(pixels[i][0], pixels[i][1], rainbawr[j][0], rainbawr[j][1]);
                // if close together, remove block from rainbawr and add one to pixels and break
                if(d < pixS * 2) { 
                    pixels[i][3] = - pixels[i][3];
                    rainbawr.splice(j, 1);
                    pixels.push([pixels[i][0], pixels[i][1], random(-10, 10), random(3, 5), pixels[i][0]]);
                    break;
                }
                
                // if rainbawr[j] is too high for pixel, break
                if(rainbawr[j][1] < pixels[i][1]) {
                    debug(0);
                    break;
                }
                
                j--;
            }
        }
        i++;
    }
  }
    
    noStroke();
    
    // draw fadey bg in play area
    fill(0, 0, 0, 20);
    rect(0, 0, 400, 400);
    
    // draw less fadey bg near paddle
    fill(0, 0, 0);
    rect(0, paddleY, 400, 400 - paddleY);
    
    strokeWeight(pixS);
    // draw rainbawr
    for(var i = 0; i < rainbawr.length; i++) {
        var x = rainbawr[i][0];
        var y = rainbawr[i][1];
        stroke(x, 400, 400);
        point(x, y);
    }
    
    // draw pixels
    for(var i = 0; i < pixels.length; i++) {
        var x = pixels[i][0];
        var y = pixels[i][1];
        var original_x = pixels[i][4];
        stroke(max(0, original_x), 400, 400);
        point(x, y);
    }
    
    // draw paddle
    noStroke();
    fill(frameCount % 400, 400, 400);
    rect(paddleX, paddleY, paddleW, paddleH);
    fill(frameCount % 400, 300, 400);
    rect(paddleX, paddleY, paddleW, paddleH/2);
    
    // text
    fill(0, 0, 400);
    textFont(loadFont("Tahoma", 14), 14);
    text("pixes: " + pixels.length + "      bawrs: " + rainbawr.length, 10, 400);
    
    if(rainbawr.length === 0) {
        textFont(loadFont("Tahoma", 70), 70);
        text("CLEAR!", 90, 200);
    }
    
    if(startscreen) {
        textFont(loadFont("tahoma", 70), 70);
        text("BREAKOUT", 30, 200);
        textFont(loadFont("Garamond", 30), 30);
        text("Click to start", 120, 250);
    }
};
