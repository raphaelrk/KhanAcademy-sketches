// https://www.khanacademy.org/computer-programming/alphabet-game/4717986648162304

/**
 * ALPHABET GAME
 * By Raphael Rouvinov-Kats
 * 
 * How fast can you type out the alphabet? GO!
 * **/
 
var abcs = 'abcdefghijklmnopqrstuvwxyz';
var currIndex = 0;
var startTime = -1;
var endTime = -1;

// update your abc's index when the right key is pressed
// update your startFrame when you first press A
// update your endFrame when you finally get past Z
var keyReleased = function() {
    var k = key.toString();
    if(k === abcs[currIndex]) {
        currIndex++;
        if(currIndex === 1) {
            startTime = millis();
        }
        if(currIndex === 26) {
            endTime = millis();
        }
    }
};

frameRate(60);
colorMode(HSB);
var draw = function() {
    // draw background that changes based on current letter
    background(currIndex/26*255, 100, 255);
    
    // Draw letter
    if(currIndex < 26) {
        fill(255, 178, 255);
        textFont(createFont("Consolas"), 440);
        text(abcs[currIndex], 78, 312);
    }
    
    // draw 'type to start'
    if(currIndex === 0) {
        fill(255, 0, 255);
        textFont(createFont("Tahoma"), 24);
        text("Type to start", 130, 39);
    }
    
    // draw current time
    if(currIndex > 0 && currIndex < 26) {
        fill(255, 0, 255);
        textFont(createFont("Tahoma"), 24);
        text((millis() - startTime)/1000, 7, 394);
    }
    
    // draw win screen
    if(currIndex >= 26) {
        fill(255, 0, 255);
        textFont(createFont("Tahoma"), 72);
        text("YOU WIN", 50, 100);
        
        textFont(createFont("Tahoma"), 48);
        text("COMPLETED IN", 32, 160);
        
        textFont(createFont("Tahoma"), 144);
        text((endTime-startTime)/1000, 22, 274);
        textFont(createFont("Tahoma"), 48);
        text("SECONDS", 85, 336);
    }
};
