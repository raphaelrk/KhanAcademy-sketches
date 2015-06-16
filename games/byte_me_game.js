// https://www.khanacademy.org/computer-programming/byte-me-submissions/6114950898778112

/**
 * Submit your program by writing it here and saving it as a spin-off
 * If you already wrote your program elsewhere, comment a link to it under 'tips and thanks'
 * 
 * © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © © 
 * MHS BYTE CLUB
 * 
 * impossible quiz: http://www.theimpossiblequiz.net/impossiblequiz.html
 * tinyurl to here: http://tinyurl.com/bytemegame is this
 * 
 * example program: https://www.khanacademy.org/cs/byte/5147960346411008
 * 
 * image to program maker: http://petercollingridge.appspot.com/pixelator
 *      ^ blocked on school network
 * */

var currentLevel = 0;
var lastFrameLevel = 0;
var games = [];

var Opener = function() {
    this.draw = function() {
        background(0, 0, 0);
        
        fill(255, 255, 255);
        textFont(createFont("Tahoma"), 38);
        text("Save your scene\nas a spinoff", 47, 100);
        
        text("© MHS BYTE CLUB", 37, 377);
        
        ellipse(mouseX, mouseY, 32, 32);
        if(dist(mouseX, mouseY, 55, 364) < 4) {
            fill(51, 255, 0);
            ellipse(55, 364, 36, 36);
            
            if(mouseIsPressed) {
                currentLevel++;
            }
        }
    };
};

/**
 * https://www.khanacademy.org/cs/spin-off-of-byte-me-submissions/5728671417761792
 * By Chris Shannon
 * */
var ShannonDontTouchWhite = function() {
    var pageNumber = 1;
    var GREEN = color(13, 255, 0);
    var WHITE = color(255, 255, 255);
    this.draw = function() {
        if(pageNumber === 1) {
            background(255, 255, 255);
            fill(30, 0, 255);
            textAlign(CENTER, CENTER);
            textSize(35);
            noStroke();
            text("To Start place mouse here", 200, 200);
            rect(200, 230, 10, 110);
            triangle(190, 330, 220, 330, 205, 350);
            fill(255, 0, 0);
            rect(100, 350, 200, 50);
        }
        if(mouseY > 350 && mouseX > 100 && mouseX < 300 && mouseY < 400) {
            pageNumber = 2;
        }
        if(pageNumber === 2) {
                background(255, 255, 255);
                fill(255, 0, 0);
                rect(100, 350, 200, 50);
                fill(30, 0, 255);
                textAlign(CENTER, CENTER);
                textSize(35);
                noStroke();
                text("Don't touch the white!", 200, 300);
                text("Drag mouse Here!", 200, 200);
                rect(195, 112, 10, 68);
                triangle(200, 102, 215, 118, 185, 118);
                fill(13, 255, 0);
                rect(100, 50, 200, 50);
        }
        if(pageNumber === 2 && get(mouseX, mouseY) === GREEN) {
            pageNumber = 3;
        }
        if(pageNumber === 3) {
            background(247, 255, 0);
            fill(255, 0, 0);
            textSize(35);
            text("You Win!", 200, 200);
            currentLevel++;
        }
        if(pageNumber === 2 && get(mouseX, mouseY) === WHITE) {
            background(247, 255, 0);
            fill(255, 0, 0);
            textSize(35);
            text("You Lose!", 200, 200);
            currentLevel = games.length - 1;
        }
    };
};

/**
 * https://www.khanacademy.org/cs/spin-off-of-byte-me-submissions/5032665856344064
 * By Daniel Balogh
 * */
var Balogh = function() {
    var x = 80;
    var y = 0;
    var i = 1;
    var r = 1;
    var Green = color(0, 255, 0);
    
    
      
    frameRate(0);
    this.draw = function() {
        
         pushMatrix();
         r =floor(random(1, 16)); //random square
    
         background(247, 231, 5);
         textSize(35);
         fill(0, 0, 0);
         text("Solve Puzzle to Continue", 10, 365);
         strokeWeight(1);
         stroke(247, 231, 5);
         
         translate(200, 125);
         
         rotate(i); //roation
         
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 1
             if(r===1){
            fill(0, 255, 0);
         }
         rect(x,0, 80, 80); 
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 2
           if(r===2){
            fill(0, 255, 0);
         }
         rect(0, 0, 80, 80);
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 3
              if(r===3){
            fill(0, 255, 0);
         }
         rect(x, 80, 80, 80);
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 4
              if(r===4){
            fill(0, 255, 0);
         }
         rect(0, 80, 80, 80);
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 5
             if(r===5){
           fill(0, 255, 0); 
         }
         rect(-x, 0, 80, 80);
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 6
              if(r===6){
            fill(0, 255, 0);
         }
         rect(-x, 160, 80, 80);
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 7
              if(r===7){
            fill(0, 255, 0);
         }
         rect(-x-80, 0, 80, 80);
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 8
              if(r===8){
            fill(0, 255, 0);
         }
         rect(-x, -x, 80, 80);
    
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 9
              if(r===9){
            fill(0, 255, 0);
         }
         rect(x, -x, 80, 80);
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 10
              if(r===10){
           fill(0, 255, 0);
         }
         rect(0, -x, 80, 80);
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 11
              if(r===11){
          fill(0, 255, 0); 
         }
         rect(-160, -x, 80, 80);
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 12
              if(r===12){
            fill(0, 255, 0);
         }
         rect(-x, x, 80, 80);
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 13
              if(r===13){
            fill(0, 255, 0);
         }
         rect(x, 160, 80, 80);
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 14
              if(r===14){
           fill(0, 255, 0); 
         }
         rect(-160, 160, 80, 80);
    
         
         fill(random(0, 255), random(0, 55), random(0, 55)); //square 15
              if(r===15){
            fill(0, 255, 0);
         }
         rect(-160, x, 80, 80);
         
         
        fill(random(0, 255), random(0, 55), random(0, 55));  //square 16
              if(r===16){
            fill(0, 255, 0);
         }
         rect(0, 160, 80, 80);
         
         
         i +=1; //more rotation
    
         var mouseColor = get(mouseX, mouseY); 
         if(mouseIsPressed && get(mouseX, mouseY) === Green) {
         popMatrix();
         pushMatrix();
         background(0, 0, 0);
         translate(0, 0);
         fill(255, 0, 0);
         rotate(0);
         textAlign(CENTER);
         textSize(44);
         text("Congragulations!", 200, 200);
         currentLevel++;
        }
         popMatrix();
    };
};

/**
 * https://www.khanacademy.org/cs/spin-off-of-byte-me-submissions/5198126795456512
 * https://www.khanacademy.org/cs/dont-touch-anything-white/4858147959472128
 * By Kenny Stepney 
 * */
var Kenny = function() {
    ///Don't Touch ANYTHING White Version: v1.4
    //304900 is my best!
    //can you beat me?
    
    //v0.1
    //-added a menu screen
    //-added one level
    //-lose screen changes color
    //-win screen changes color
    //-touching anything white sends player to lose screen
    //-made the "Don't go to fast" flashy
    
    //v0.2 
    //- made it harder
    
    //v0.3
    //-added a difficult select option(current doesn't work)
    
    //v0.4
    //-cleaned up messy code
    //-got the easy button working
    //-cleaner transitions
    //-made easymode harder
    
    //v0.4.5
    //-fixed a bug that broke the game(thanks to Nick S.)
    //-got hardmode and medium mode working
    
    //v0.5
    //-*****MEDIUM MODE FINISHED!!!!!!!!
    //-setup for hardmode started
    //-updated message
    
    //v0.6 
    //-added scoreboard feature(broken)
    //-cleaned up code
    //-user friendly win/lose screen
    
    //v0.7
    //-***HARDMODE FINISHED!
    
    //v0.8
    //-Multiple bug fixes
    //-huge game breaking bug fixed
    
    //v0.8.5
    //-Fixed a huge cheat for hardmode 
    
    
    //v0.9
    //- white board around win box
    
    //v1.0 THe Offical game is out!!!!!!!!
    //-fixed score system
    
    //v1.1.1
    //-score system fixed
    
    //v1.2
    //-added random words on the start screen and game select
    
    //v1.3
    //-Cleaned the entire game up
    //-began easy mode 2
    //-more random text
    
    //v1.3.5 
    //-fixed Magor bugs cause by the score system.
    
    //v1.3.8
    //-fixed more problems caused by the score system
    
    //v1.4
    //-A huge game break bug.
    
    /** Official Game is OUT!!!! **/
    //By Kenny Stepney
    //Please leave comments, suggestions, and anything else below
    //NEVER CHANGE TEXT SIZE!
    //Is a bit spazzy it times.
    //share high scores!
    
    //Future Updates 
    //-new better levels
    
    //gets rid of the outlines of the rectangles
    noStroke();
    var currentScene = 1;
    var s = 20;
    var i = 1;
    var o = 0;
    var d = 0;
    
    //declares colors, game won't work without these
    var WHITE = color(255, 255, 255);
    var BLACK1 = color(10, 8, 8);
    var BLACK2 = color(8, 8, 8);
    var BLACK3 = color(8, 4, 4);
    var BLACK4 = color(15, 9, 8);
    var BLACK5 = color(10, 8, 9);
    var YELLOW = color(225, 255, 0);
    var RED = color(255, 0, 0);
    var GREEN = color(13, 255, 0);
    var GREEN1 = color(13, 255, 1);
    var GREEN2 = color(13, 255, 2);
    var GREEN3 = color(13, 255, 3);
    var BLUE = color(0, 21, 255);
    var BLUE1 = color(0, 21, 254);
    var BLUE2 = color(0, 21, 253);
    var BLUE3 = color(0, 21, 252);
    var BLUE4 = color(0, 21, 251);
    var BLUE5 = color(0, 21, 249);
    var GOLD = color(255, 204, 0);
    var GOLD1 = color(255, 204, 1);
    var GOLD2 = color(255, 204, 2);
    var DARKBLUE = color(0, 166, 255);
    var DARKBLUE1 = color(1, 166, 255);
    
    //makes life much easy by declaring the size of the rectangles
    var easyRectWidth = 93;
    var easyRectHeight = 54;
    var easyRecty = 246;
    var easyRectx = 26;
    var mediumRectWidth = 123;
    var mediumRectHeight = 54;
    var mediumRecty = 100;
    var mediumRectx = 146;
    var hardRectWidth = 93;
    var hardRectHeight = 54;
    var hardRecty = 246;
    var hardRectx = 298;
    
    //declares the base variable for your score
    var score = 0;
    var hiScore = 1000;
    
    //This doesn't work yet.
    var funText = ["Hello!!!", "The sunrise troop coasts!", "Thanks for playing!", "The spokesman invites the educational need!", "When can the piece frustrate a peanut forum?", "Each economy floats the fuss!", "The voice peers opposite the impressed sauce!", "Next to the caring skin grows a terminal challenge!" , "The vocabulary jams in the degenerate!", "The ice emphasizes the war!","The nostalgic profit records the sound...", "The front gathers the stone", "The periodic argument authorizes the mountain", "The night drafts the draconian fold"];
    
    //the function for the random text displayer
    var randomText = function() {
        s++;
            
        fill(random(0, 255), random(0, 255), random(0, 255));
        if(s > 40) {
            s -= 1;
        }
        if(s < 0) {
            s++;
        }
        
        textSize(s);
        text(funText[floor(random(0, 10))], 299, 35, 100, 100);
        fill(random(0, 255), random(0, 255), random(0, 255));
        if(s > 40) {
            s -= 1;
        }
    };
    
    //displays the screen when the user wins
    var winScene = function() {
        if(score > hiScore){
            hiScore = score;
            hiScore = hiScore.toFixed(d);
        }
        
        score = score.toFixed(d);
        
        background(random(0, 255), random(0,255), random(0,255));
        fill(255, 255, 255);
        textSize(30);
        text("YOU WON!!!!", 125, 109, 156, 100);
        text("Score: " + score , 130, 183, 400, 100);
        text("High Score: " + hiScore , 130, 243, 400, 100);
        fill(0, 166, 255);
        text("Play Again", 16, 305, 171, 100);
        fill(255, 204, 0);
        text("Return to title screen", 250, 305, 144, 100);
        fill(random(0, 255), random(0, 255), random(0, 255));
        textSize(10);
        text("Click to go back to difficult selection(resets score when you hit title screen)", 124, 41, 250, 100);
        
        if(currentScene === 3){
            textSize(30);
            fill(255, 204, 2);
            text("Continue", 250, 75, 300, 100);
        }
        
        textSize(20);
        fill(255, 204, 1);
        text("Reset High Score", 1, 75, 171, 100);
        
        currentLevel++;
    };
    
    //Gives the user a little instruction on how to play
    var startScene1 = function() {
        score = 0;
        
        background(5, 5, 5);
        fill(255, 255, 255);
        textSize(30);
        text("Don't Touch ANYTHING White!", 43, 200, 404, 100);
        text("Click to Start!", 120, 121, 200, 150);
        fill(random(0, 255), random(0, 255), random(0, 255));
        textSize(10);
        textSize(s);
        text(funText[floor(random(0, funText.length + 1))], 255, 35, 150, 100);
        text(funText[floor(random(0, funText.length + 1))], 20, 35, 150, 100);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("The Game thats touch sensitive!", 152, 320, 200, 100);
        textSize(5);
        fill(255, 255, 255);
        text("v8.5 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100);
        textSize(20);
    //    text("If it freezes or the your score doesn't show up restart, until I get this fixed", 133, 277, 199, 100);
    };
    
    //variable for the difficulty selection
    var gamemodeSelect = function() {
        background(5, 4, 4);
        fill(255, 0, 0);
        textSize(30);
        rect(easyRectx, easyRecty, easyRectWidth, easyRectHeight);
        fill(254, 255, 255);
        text("Easy", easyRectx + 13, easyRecty + 13, 100, 100);
        fill(13, 255, 0);
        rect(mediumRectx, mediumRecty, mediumRectWidth, mediumRectHeight);
        fill(254, 255, 255);
        text("Medium", mediumRectx + 8, mediumRecty + 15, 100, 100);
        fill(0, 21, 255);
        rect(hardRectx, hardRecty, hardRectWidth, hardRectHeight);
        fill(254, 255, 255);
        text("Hard", hardRectx + 15, hardRecty + 15, 100, 100);
        fill(227, 0, 38);
        textSize(20);
        text("Touch, don't Click, VERY SENSITIVE!", 50, 320, 347, 100);
        textSize(s);
        text(funText[floor(random(0, 10))], 255, 35, 150, 100);
        text(funText[floor(random(0, 10))], 20, 35, 150, 100);
    
    };
    
    //displays the "losing scene"
    var loseScene = function() {
        score *=  0.50;
        score = score;
        
        if(score > hiScore){
            hiScore = score;
           hiScore = hiScore;
        }
        
        background(random(0, 255), random(0,255), random(0,255));
        fill(8, 4, 4);
        textSize(30);
        text("YOU LOSE!!!!", 125, 139, 196, 100);
        text("Score: " + score , 130, 183, 400, 100);
        text("High Score: " + hiScore , 130, 233, 400, 100);
        fill(0, 166, 255);
        text("Play Again", 16, 305, 171, 100);
        fill(255, 204, 0);
        text("Return to title screen", 250, 305, 144, 100);
        fill(random(0, 255), random(0, 255), random(0, 255));
        textSize(10);
        text("Click to go back to difficult selection(resets score when you hit title screen)", 124, 41, 250, 100);
        textSize(20);
        fill(255, 204, 1);
        text("Reset High Score", 1, 75, 171, 100);
    
        hiScore = 1000; 
    
    };
    
    //setup for the easy mode difficulty
    var easyModeScene = function() {
        background(237, 5, 51);
        fill(255, 255, 255);
        rect(0, 40, 400, 45);
        fill(10, 8, 8);
        rect(200, 250, 50, 150);
        fill(8, 8, 8);
        rect(200, 200, 125, 50);
        fill(15, 9, 9);
        rect(275, 0, 50, 250);
        fill(225, 255, 0);
        rect(0, 0, 400, 45);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        fill(0, 85, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        text("Start here --->", 103, 353, 100, 100);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100);
    };
    
    //Displays the first "Scene" of the easy level
    var easyScene = function() {
        background(255, 255, 255);
        fill(255, 255, 255);
        rect(0, 40, 400, 45);
        fill(10, 8, 8);
        rect(200, 250, 50, 150);
        fill(8, 8, 8);
        rect(200, 200, 125, 50);
        fill(15, 9, 9);
        rect(275, 0, 50, 250);
        fill(225, 255, 0);
        rect(0, 0, 400, 45);
        fill(0, 85, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        text("Start here --->", 103, 353, 100, 100);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100);
    };
    
    //changes the easy scene
    var easyScene2 = function() {
        background(255, 255, 255);
        fill(10, 8, 8);
        rect(200, 250, 50, 150);
        fill(8, 8, 8);
        rect(125, 200, 125, 50);
        fill(8, 4, 4);
        rect(125, 0, 50, 250);
        fill(225, 255, 0);
        rect(0, 0, 400, 45);
        fill(255, 255, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        fill(random(0, 255), random(0, 255), random(0, 255));
        textSize(30);
        text("Don't Go To Fast!!!", 300, 200, 100, 100);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100);
    };
    
    //The final easy "scene"
    var easyScene3 = function() {
        background(255, 255, 255);
        fill(10, 8, 8);
        rect(200, 250, 50, 150);
        fill(8, 8, 8);
        rect(125, 200, 125, 50);
        fill(8, 4, 4);
        rect(125, 0, 50, 100);
        rect(125, 75, 100, 50);
        rect(175, 125, 50, 125);
        fill(225, 255, 0);
        rect(0, 0, 400, 45);
        fill(255, 255, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        fill(random(0, 255), random(0, 255), random(0, 255));
        textSize(30);
        text("Don't Go To Fast!!!", 300, 200, 100, 100); 
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.1 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100);
    };
    
    var easy2Scene = function() {
        background(237, 5, 51);
        fill(255, 255, 255);
        rect(0, 40, 400, 45);
        fill(10, 8, 9);
        rect(200, 1, 50, 224);
        rect(1, 348, 255, 50);
        fill(15, 9, 8);
        rect(196, 200, 100, 50);
        fill(15, 9, 9);
        rect(151, 200, 50, 250);
        fill(225, 255, 0);
        rect(0, 0, 400, 45);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        fill(0, 85, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        text("Start here <---", 291, 353, 100, 100);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100);
    };
    
    var easy2Scene1 = function() {
            background(255, 255, 255);
        fill(255, 255, 255);
        rect(0, 40, 400, 45);
        fill(10, 8, 9);
        rect(200, 250, 50, 150);
        fill(15, 9, 8);
        rect(75, 200, 289, 50);
        fill(15, 9, 9);
        rect(124, 200, 100, 50);
        rect(43, 150, 50, 250);
        fill(225, 255, 0);
        rect(0, 0, 400, 45);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        fill(0, 85, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100);
    };
    
    var easy2Scene2 = function() {
        pushMatrix();
        translate(425, -1);
        rotate(90);
        background(255, 255, 255);
        fill(255, 255, 255);
        rect(0, 40, 400, 45);
        fill(10, 8, 9);
        rect(200, 205, 50, 166);
        rect(75, 156, 255, 50);
        fill(15, 9, 9);
        rect(283, 156, 100, 50);
        fill(15, 9, 8);
        rect(43, 114, 50, 262);
        fill(225, 255, 0);
        rect(0, 0, 400, 45);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        fill(0, 85, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 306, 100);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 415, 200, 100);
        popMatrix();
    };
     
    var easy2Scene3 = function() {
        
    }; 
    
    //basically what i said for easy except for medium and hard
    var mediumModeScene = function() {
        background(237, 5, 51);
        fill(255, 255, 255);
        rect(0, 40, 430, 45);
        fill(13, 255, 0);
        rect(200, 250, 35, 150);
        fill(13, 255, 1);
        rect(200, 229, 125, 32);
        fill(13, 255, 2);
        rect(290, 0, 35, 261);
        fill(13, 255, 3);
        rect(200, 320, -153, 35);
        fill(225, 255, 0);
        rect(0, 0, 439, 45);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        fill(20, 15, 15);
        text("Start here --->", 103, 360, 100, 100);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100); 
    };
    
    var mediumScene2 = function() {
        background(255, 255, 255);
        fill(255, 255, 255);
        rect(0, 43, 430, 45);
        fill(13, 255, 0);
        rect(200, 262, 35, 150);
        fill(13, 255, 1);
        rect(200, 230, 125, 32);
        fill(13, 255, 2);
        rect(290, 1, 35, 250);
        fill(13, 255, 3);
        rect(200, 320, -153, 35);
        fill(225, 255, 0);
        rect(0, 0, 439, 45);
        fill(255, 255, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        text("Start here --->", 103, 360, 100, 100);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100);
    }; 
    
    var mediumScene3 = function() {
        background(255, 255, 255);
        fill(255, 255, 255);
        rect(0, 43, 430, 45);
        fill(13, 255, 0);
        rect(200, 262, 35, 150);
        fill(13, 255, 1);
        rect(200, 230, 125, 32);
        fill(13, 255, 2);
        rect(92, 1, 42, 350);
        fill(13, 255, 3);
        rect(200, 230, -153, 35);
        fill(225, 255, 0);
        rect(0, 0, 497, 45);
        fill(255, 255, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        text("Start here --->", 103, 360, 100, 100);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("TIP: Go down!", 10, 286, 100, 100);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100);
    };
    
    var mediumScene4 = function() {
        background(255, 255, 255);
        fill(255, 255, 255);
        rect(0, 43, 430, 45);
        fill(13, 255, 0);
        rect(200, 262, 35, 150);
        fill(13, 255, 1);
        rect(200, 230, 125, 32);
        fill(0, 255, 17);
        rect(86, 199, 102, 42);
        rect(146, 150, 42, 90);
        rect(86, 109, 102, 42);
        rect(86, 45, 42, 90);
        rect(86, 233, 42, 90);
        fill(13, 255, 3);
        rect(200, 323, -153, 35);
        fill(225, 255, 0);
        rect(0, 0, 497, 45);
        fill(255, 255, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        text("Start here --->", 103, 360, 100, 100);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100); 
    };
    
    var hardModeScene = function() {
        background(237, 5, 51);
        fill(255, 255, 255);
        rect(0, 44, 430, 225);
        fill(0, 21, 254);
        rect(200, 251, 20, 150);
        fill(0, 21, 252);
        rect(188, 213, 120, 20);
        fill(0, 21, 253);
        rect(86, 213, 102, 20);
        rect(240, 123, 20, 90);
        rect(179, 115, 81, 20);
        rect(179, 45,20, 90);
        rect(86, 233, 20, 102);
        fill(0, 21, 254);
        rect(200, 323, -153, 20);
        fill(0, 21, 249);
        rect(260, 115, -40, 20);
        fill(225, 255, 0);
        rect(0, 0, 497, 45);
        fill(255, 255, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        fill(22, 102, 222);
        text("Start here --->", 103, 360, 100, 100);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100); 
    };
    
    var hardMode1 = function() {
        background(255, 255, 255);
        fill(255, 255, 255);
        rect(0, 44, 430, 45);
        fill(0, 21, 254);
        rect(200, 251, 20, 150);
        fill(0, 21, 252);
        rect(188, 213, 120, 20);
        fill(0, 21, 250);
        rect(86, 213, 102, 20);
        rect(240, 123, 20, 90);
        rect(179, 115, 81, 20);
        rect(179, 45,20, 90);
        rect(200, 335, -153, 20);
        fill(0, 21, 253);
        rect(86, 233, 20, 122);
        fill(0, 21, 249);
        rect(260, 115, -40, 20);
        fill(225, 255, 0);
        rect(0, 0, 497, 45);
        fill(255, 255, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        fill(22, 102, 222);
        text("Start here --->", 103, 360, 100, 100);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 100); 
    };
    
    var hardMode2 = function() {
        background(255, 255, 255);
        fill(255, 255, 255);
        rect(0, 44, 430, 45);
        fill(0, 21, 250);
        rect(200, 352, 20, 150);
        fill(0, 21, 252);
        rect(188, 213, 120, 20);
        rect(288, 213, 20, 20);
        fill(0, 21, 250);
        rect(86, 213, 102, 20);
        rect(240, 123, 20, 90);
        rect(179, 115, 81, 20);
        rect(179, 45,20, 90);
        rect(200, 335, -154, 20);
        rect(200, 335, 103, 20);
        fill(0, 21, 253);
        rect(288, 233, 20, 122);
        fill(0, 21, 249);
        rect(260, 115, -40, 20);
        fill(0, 21, 251);
        rect(200, 258, 20, 78);
        fill(225, 255, 0);
        rect(0, 0, 497, 45);
        fill(255, 255, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        fill(22, 102, 222);
        text("Start here --->", 103, 360, 100, 100);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("Things just got MUCH harder!", 53, 118, 100, 311);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 210); 
    };
    
    var hardMode3 = function() {
        background(255, 255, 255);
        fill(255, 255, 255);
        rect(0, 44, 430, 45);
        fill(0, 21, 254);
        rect(200, 251, 20, 150);
        fill(0, 21, 252);
        rect(188, 213, 73, 20);
        rect(288, 213, 20, 20);
        fill(0, 21, 250);
        rect(86, 213, 102, 20);
        rect(240, 123, 20, 90);
        rect(179, 115, 81, 20);
        rect(179, 45,20, 90);
        rect(200, 335, -154, 20);
        rect(200, 335, 103, 20);
        fill(0, 21, 253);
        rect(288, 233, 20, 122);
        fill(0, 21, 249);
        rect(260, 115, -40, 20);
        fill(0, 21, 251);
        rect(200, 255, 20, 100);
        fill(225, 255, 0);
        rect(0, 0, 497, 45);
        fill(255, 255, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        fill(22, 102, 222);
        text("Start here --->", 103, 360, 100, 100);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("NOPE!", 53, 118, 100, 311);
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 210); 
    };
    
    var hardMode4 = function() {
        background(255, 255, 255);
        fill(255, 255, 255);
        rect(0, 44, 430, 45);
        fill(0, 21, 254);
        rect(200, 342, 20, 218);
        fill(0, 21, 252);
        rect(188, 213, 73, 20);
        rect(288, 213, 20, 20);
        fill(0, 21, 250);
        rect(86, 213, 102, 20);
        rect(240, 123, 20, 90);
        rect(179, 115, 81, 20);
        rect(179, 45,20, 90);
        rect(200, 335, -154, 20);
        rect(200, 335, 103, 20);
        fill(0, 21, 253);
        rect(288, 233, 20, 122);
        fill(0, 21, 249);
        rect(260, 115, -40, 20);
        fill(0, 21, 251);
        rect(200, 223, 20, 133);
        fill(225, 255, 0);
        rect(0, 0, 497, 45);
        fill(255, 255, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        fill(22, 102, 222);
        text("Start here --->", 103, 360, 100, 100);
        fill(random(0, 255), random(0, 255), random(0, 255));
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 210); 
    };
    
    var hardMode5 = function() {
        background(255, 255, 255);
        fill(255, 255, 255);
        rect(0, 44, 430, 45);
        fill(0, 21, 254);
        rect(200, 342, 20, 218);
        fill(0, 21, 252);
        rect(188, 213, 73, 20);
        rect(288, 213, 20, 20);
        fill(0, 21, 249);
        rect(240, 117, 20, 20);
        fill(0, 21, 250);
        rect(86, 213, 102, 20);
        rect(114, 123, 20, 90);
        rect(240, 123, 20, 90);
        rect(114, 115, 81, 20);
        rect(179, 45,20, 90);
        rect(200, 335, -154, 20);
        rect(200, 335, 103, 20);
        fill(0, 21, 253);
        rect(288, 233, 20, 122);
        fill(0, 21, 249);
        rect(260, 115, -40, 20);
        fill(0, 21, 251);
        rect(200, 223, 20, 133);
        fill(225, 255, 0);
        rect(0, 0, 497, 45);
        fill(255, 255, 255);
        textSize(20);
        text("Drag Your Mouse Here to Win", 80, 20, 300, 100);
        fill(22, 102, 222);
        text("Start here --->", 103, 360, 100, 100);
        fill(random(0, 255), random(0, 255), random(0, 255));
        fill(255, 255, 255);
        rect(-57, -45, 100, 100);
        rect(366, -46, 100, 100);
        rect(0, -34, 400, 45);
        textSize(5);
        text("v0.4 Don't Touch Anything White Copyright Kenny Stepney", 152, 390, 200, 210);
    
    };
    
    //displays first scene
    if(currentScene === 1) {
        startScene1();
    }
    
    //Changes Scenes
    this.mouseClicked = function() {
        currentScene = 2;
         if(currentScene === 2) {
                gamemodeSelect();
            }
    };
    
    //gets the game working like it should
    this.draw = function() {
        
        if(get(mouseX, mouseY) === RED) {
            easyModeScene();
            currentScene = 3;
            fill(255, 255, 254);
            text("Easy", 50, 45, 100, 100);
                
        }
        if(get(mouseX, mouseY) === GREEN) {
            mediumModeScene();
            currentScene = 4;
            fill(255, 255, 254);
            }
        if(get(mouseX, mouseY) === BLUE) {
            hardModeScene();
            currentScene = 5;            
            fill(255, 255, 254);            
        }
       
        
        if(get(mouseX, mouseY) === WHITE) {
            score /= 2;
            loseScene();
        }
        if(get(mouseX, mouseY) === YELLOW) {
            winScene();
            score *= 2;
        }
        if(get(mouseX, mouseY) === BLACK1) {
            easyScene();
            score += 20;
        }
        if(get(mouseX, mouseY) === BLACK2){
            easyScene2();
            score += 35;
        }
        if(get(mouseX, mouseY) === BLACK3) {
            easyScene3();
            score += 50;
        }
        if(get(mouseX, mouseY) === BLACK4) {
            easy2Scene2();
            score += 50;
        }
        if(get(mouseX, mouseY) === BLACK5) {
            easy2Scene1();
            score += 75;
        }
        if(get(mouseX, mouseY) === GREEN) {
            mediumScene2();
            score += 50;
        }
        if(get(mouseX, mouseY) === GREEN1) {
            mediumScene3();
            score += 75;
        }
        if(get(mouseX, mouseY) === GREEN2) {
            mediumScene4();
            score += 100;
        }
        if(get(mouseX, mouseY) === GOLD) {
            startScene1();
            score = 0;
        }
        if(get(mouseX, mouseY) === BLUE) {
            hardModeScene();
            score += 80;
        }
        if(get(mouseX, mouseY) === BLUE1) {
            hardMode1();
            score += 100;
        }
        if(get(mouseX, mouseY) === BLUE2) {
            hardMode2();
            score += 150;
        }
        if(get(mouseX, mouseY) === BLUE3) {
            hardMode3();
            score += 200;
        }
        if(get(mouseX, mouseY) === BLUE4) {
            hardMode4();
            score += 300;
        }
        if(get(mouseX, mouseY) === BLUE5) {
            hardMode5();
            score += 600;
        }
        if(get(mouseX, mouseY) === GOLD1) {
            startScene1();
            hiScore = 1000;
        }
        if(get(mouseX, mouseY) === GOLD2) {
            easy2Scene();
            currentScene = 6;
        }
        
        if(get(mouseX, mouseY) === DARKBLUE) {
            if(currentScene === 3) {
                easyModeScene();
            }
            if(currentScene === 4) {
                mediumModeScene();
            }
            if(currentScene === 5) {
                hardModeScene();
            }
            if(currentScene === 6) {
                easy2Scene();
            }
        }
        
        
        frameRate(60);
    };
    
    currentScene = 1;
};

/**
 * https://www.khanacademy.org/cs/spin-off-of-byte-me-submissions/6630628462428160
 * By Chris Shannon
 * */
var ShannonMovingButton = function() {
    var GREEN = color(50, 255, 0);
    
    var greenButtonRow = floor(random(1, 8));
    var greenButtonCol = floor(random(1, 8));
    
    var greenButtonY = 50 * greenButtonRow;
    var greenButtonX = 50 * greenButtonCol;
    
    this.draw = function() {
        background(255, 0, 0);
        fill(0, 0, 0);
        textSize(20);
        text("Click the green button!", 89, 25);
        for(var x = 50; x < 400; x += 50) {
            fill(38, 0, 255);
            noStroke();
            for(var y = 50; y < 400; y += 50){
                noStroke();
                ellipse(x, y, 25, 25);
            }
        }
        
        if(frameCount % 32 === 0) {
            greenButtonRow = floor(random(1, 8));
            greenButtonCol = floor(random(1, 8));
            
            greenButtonY = 50 * greenButtonRow;
            greenButtonX = 50 * greenButtonCol;
        }
        
        fill(50, 255, 0);
        ellipse(greenButtonX, greenButtonY, 25, 25);
        
        if(mouseIsPressed && get(mouseX, mouseY) === GREEN) {
            currentLevel++;
        }
    };
};

/**
 * https://www.khanacademy.org/cs/click-the-circle/4691148637732864
 * By Douglas Alberts
 * */
var Alberts = function() {
    var a = 113;
    
    this.draw = function() {
        background(255, 255, 255);
        ellipse(mouseX, mouseY, 20, 20);
        textSize(37);
        fill(0, 0, 0);
        text("Click the Circle", 74,200);
        ellipse(a,174,3,3);
    };
    
    this.mouseClicked = function() {
        
        if(dist(mouseX, mouseY, 113, 174) < 5) {
            // go on
            // println("woo");
            background(255, 255, 255);
            text("WOO", 150, 200);
            currentLevel++;
        }
    };
};

/**
 * https://www.khanacademy.org/cs/trial-panel/5984925857873920
 * By Mr. Matt Farmer
 * */
var Farmer = function() {
    var clock = 1000;
    this.draw = function() {
        background(255, 255, 255);
        clock--;
        if(clock < 1) {
            background(3, 255, 11);
            textAlign(CENTER,CENTER);
            textSize(16);
            fill(255,255,255);
            text("Congratulations all puppies have been given hugs in your honor", 97, 300,200,100);
            currentLevel++;
                
        
        }
        //periodic messages
        if(clock < 800 && 600 < clock){
            textSize(16);
            text("Seriously, like, don't even joke, man.", 200, 350);
            
        }
        if(clock < 500 && 250 < clock){
            textSize(16);
            text("Whew, that was close!", 200, 350);
            text("Really thought you were gonna push it...",200,375);
            
        }
        if(clock === 182){
            textSize(16);
            text("PUSH IT!", 200, 350);
        }
        if(clock === 102){
            textSize(16);
            text("WAIT, DON'T!", 200, 350);
        }
        
        textSize(24);
        fill(0, 0, 0);
        text(clock,200,300);
        
        //red button
        fill(222, 0, 0);
        ellipse(200,200,80,80);
        fill(255, 255, 255);
        textSize(12);
        text("PUSH ME",200,200);
        //blue botton
        fill(0, 255, 255);
        ellipse(120,200,30,30);
        //yellowbutton
        fill(255, 255, 0);
        ellipse(280,200,30,30);
        
        fill(0,0,0);
        textSize(16);
        textAlign(CENTER,CENTER);
        text("Whatever you do, don't touch",200,20);
        textSize(55);
        fill(222, 0, 0);
        text("the red button!",200, 70);
        
        var mouseColor = get(mouseX,mouseY);
        var dude = getImage("avatars/old-spice-man");
        
        //pushing the blue button
        if(mouseColor === color(0,255,255)&& mouseIsPressed) {
           image(dude,100,400*cos(clock));
           fill(6, 179, 6);
           textAlign(CENTER,CENTER);
           text("Whoa!",200,400*cos(clock)+50);
        }
        //pushing the yellow button
        var i = 0;
        var noiseScale = 0.02;
        if(mouseColor === color(255, 255, 0)&& mouseIsPressed){
            translate(mouseX,mouseY);
            rotate(8*clock);
            fill(random(0,255),random(0,255),random(255));
            text("Party!",50,50);
            text("Party!",-50,-50);
            resetMatrix();
            
            if(noise(frameCount)>0.09){
                text("dance!!",random(0,350),random(0,350));
                text("daNCE!",random(0,350),random(0,350));
                text("DANCE!",random(0,350),random(0,350));
                text("dAnCe!",random(0,350),random(0,350));
                i++;
            }
        
            
            
        }
        //pusing the red button!
        if (mouseColor === color(222,0,0)){
            background(201, 4, 4);
            textSize(20);
            fill(252, 252, 252);
            text("OH NO!!! You've touched the button!", 200,325);
            fill(0, 0, 0);
            textSize(12);
            text("A puppy has been kicked in your honor.",200,350);
            currentLevel = games.length - 1;
        }
    };
};

/**
 * https://www.khanacademy.org/cs/spin-off-of-byte-me-submissions/6371603346882560
 * By Chris Shannon
 * */
var ShannonRedButton = function() {
    var GREEN = color(50, 255, 0);
    var RED = color(255, 0, 0);
    noStroke();
    fill(RED);
    ellipse(200, 200, 75, 75);//middle button
    fill(GREEN);
    ellipse(90, 200, 75, 75);//left button
    fill(GREEN);
    ellipse(310, 200, 75, 75);//right button
        
    this.draw = function() {
        var buttonX1 = 112;
        var buttonY1 = 2;
        //background(255, 255, 255);
        fill(255, 0, 0);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(25);
        text("Click the Red Button", 200, 10);
        text("BUT NOT THE GREEN ONE", 200, 30);
        ellipse(buttonX1, buttonY1, 2.5, 2.5);
    
        if(mouseY > 100 && mouseX > 100 && mouseX < 300 && get(mouseX, mouseY) === RED) {
            fill(GREEN);
            ellipse(200, 200, 75, 75);//middle button
            fill(RED);
            ellipse(90, 200, 75, 75);//left button
            fill(RED);
            ellipse(310, 200, 75, 75);//right button
        }
        if(mouseY > 100 && get(mouseX, mouseY) === RED) {
            fill(RED);
            ellipse(200, 200, 75, 75);//middle button
            fill(GREEN);
            ellipse(90, 200, 75, 75);//left button
            fill(GREEN);
            ellipse(310, 200, 75, 75);//right button
        }
        if(mouseIsPressed && get(mouseX, mouseY) === GREEN) {
            background(107, 6, 122);
            textAlign(CENTER, CENTER);
            textSize(50);
            text("You Lose!", 200, 200);
            currentLevel = games.length - 1;
        }
        if(mouseIsPressed && mouseX > buttonX1-3 && mouseX < buttonX1+3.5 && mouseY > buttonY1-3      && mouseY < buttonY1+3.5) {
            background(107, 6, 122);
            textAlign(CENTER, CENTER);
            textSize(50);
            text("You Win!", 200, 200);
            currentLevel++;
        }
    };

};

/**
 * https://www.khanacademy.org/cs/byte/5147960346411008
 * By Raphael Rouvinov-Kats
 * */
var Rouvinov = function() {
    /**
     * MHS impossible quiz level
     * 
     * By Raphael Rouvinv-Kats
     * */
    
    var signum = function(num) {
        return abs(num)/num;
    };
    
    var Button = function(x, y, w, h, text,
                          buttonColor, textColor) {
        this.x = x;
        this.y = y;
        this.w = w; // width
        this.h = h; // height
        this.text = text;
        this.buttonColor = buttonColor;
        this.textColor = textColor;
    };
    
    Button.prototype.draw = function() {
        // set rect settings
        stroke(0, 0, 0, 50);
        strokeWeight(4);
        var r = red(this.buttonColor);
        var g = green(this.buttonColor);
        var b = blue(this.buttonColor);
        var dC = 0; // change in color
        if(this.hoveredOver()) {
            dC = 10;
            if(mouseIsPressed) { dC = 20; }
        }
        
        // draw rect
        fill(r-dC - 30, g-dC - 30, b-dC - 30);
        rect(this.x, this.y, this.w, this.h, 8); // shadowy rect
        noStroke();
        fill(r-dC, g-dC, b-dC);
        var pad = 2;
        rect(this.x + pad, this.y + pad, this.w - pad*2, this.h - pad*2, 8); // foreground rect
        
        // set text settings
        fill(this.textColor);
        var text_size = this.w / this.text.length;
        textFont(createFont("sans-serif"), 24);
        textSize(text_size);
        
        // draw text
        text(this.text, 
             this.x + this.w/2 - this.text.length*text_size/3,
             this.y + this.h/2 + text_size / 3);
    };
    
    Button.prototype.hoveredOver = function() {
        if(mouseX > this.x && mouseX < this.x + this.w &&
           mouseY > this.y && mouseY < this.y + this.h) {
               return true;
           }
           
       return false;
    };
    
    Button.prototype.moveAwayFromMouse = function() {
        var dx= 0, dy = 0;
        var x = this.x + this.w / 2;
        var y = this.y + this.h / 2;
        
        var xDiff = x - mouseX;
        var yDiff = y - mouseY;
        if(xDiff === 0) {
            xDiff = 0.1;
        }
        var ang = atan2(xDiff, yDiff);
        
        dx = 30*cos(ang);
        dy = 30*sin(ang);
        
        dx = abs(dx) * signum(xDiff);
        dy = abs(dy) * signum(yDiff);
        
        // if in clicking distance, move fast towards mouse
        if(dist(x, y, mouseX, mouseY) < dist(0, 0, this.w/2, this.h/2)) {
            dx = -signum(dx)*this.w;
            dy = -signum(dy)*this.h;
        }
        
        this.x += dx;
        this.y += dy;
        
        this.x = constrain(this.x, 5, width - this.w -5);
        this.y = constrain(this.y, 5, height - this.h - 5);
    };
    
    var unfollowButton = new Button(266, 353, 134, 47, "UNFOLLOW", 
                                     color(179, 93, 179), color(255, 255, 255));
    mouseX = 0;
    mouseY = 0;
    
    this.draw = function() {
        fill(250, 250, 250, 100);
        noStroke();
        rect(0, 0, width, height);
        
        stroke(0, 0, 0);
        fill(0, 0, 0);
        
        for(var i = 0; i < 5; i++) {
            fill(255, 0, 0, 100);
            var txt = "#mundypride";
            if(random(0, 1) < 0.1) {
                txt = "1:1";
            }
            
            text(txt, random(-400, 400), random(0, 500));
        }
        
        // move and draw unfollow button
        unfollowButton.moveAwayFromMouse();
        unfollowButton.draw();
        
        // principal bg
        fill(0, 48, 191, 50);
        rect(0, 0, width, 63);
        
        // @MHS_Principal
        fill(204, 0, 0);
        textFont(createFont("Tahoma"), 54);
        text("@MHS_Principal", 8, 50);
    };
    
    this.keyPressed = function() {
        if('#' === key.toString() || '1' === key.toString()) {
            background(0, 0, 0);
            
            fill(255, 255, 255);
            textFont(createFont("Tahoma"), 36);
            text("<Insert next level here>", 10, 100);
            currentLevel++;
        }
    };

};

/**
 * https://www.khanacademy.org/computer-programming/marching-game/4658341294112768
 * By Angel Montero
 */
var Montero = function() {
    var mainMenuScene = 1;
    var rulesScene = 2;
    var commentsScene = 3;
    var playScene = 4;
    var winScene = 5;
    var loseScene = 6;
    var currentScene = mainMenuScene;
    var currentplaysec;
    var currentplaymin;
    var playminutes;
    var playseconds;
    
    var drawbtnReturnToMenu = function() {
        noStroke();
        fill(255, 255, 255);
        rect(200, 200, 115, 45);
        textSize(20);
        fill(60, 0, 255);
        text("Main Menu", 207, 223);
    };
    
    var drawRulesScene = function() {
        background(255, 0, 0);
        textSize(24);
        fill(0, 43, 255);
        text("There will be content saying", 57, 20);
        text("Ready, Set, Go! After this content", 30, 45);
        text("is presented, you have to move", 30, 70);
        text("the mouse to the light green", 30, 95);
        text("spot and click on the spot to win.", 30, 120);
        text("you will be faced with gray spots", 30, 145);
        text("that are marchers. If you touch", 30, 170);
        text("any marcher, you lose.", 30, 195);
        text("There is an easy way to win. See", 30, 300);
        text("if you can find it. Good Luck!", 30, 325);
        
        noStroke();
        fill(255, 255, 255);
        rect(200, 200, 115, 45);
        textSize(20);
        fill(255, 0, 0);
        
    };
    
    var drawwinScene = function(){
        background(34, 255, 0);
        textSize(40);
        fill(0, 0, 0);
        text("You won. 1000 points", 10, 50);
        currentLevel++;
    };
    
    
    var drawPlayScene = function() {
        background(8, 46, 5);
        //Place on the field
        fill(43, 255, 0);
        ellipse(300, 100, 15, 15);
        
        //M on the field
        textSize(134);
        fill(255, 0, 0);
        text("M", 147, 247);
        
        //Yard markers
        textSize(40);
        fill(255, 255, 255);
        text("<30", 0, 380);
        
        textSize(40);
        fill(255, 255, 255);
        text("<40", 80, 380);
        
        textSize(40);
        fill(255, 255, 255);
        text("50", 180, 380);
        
        textSize(40);
        fill(255, 255, 255);
        text("40>", 260, 380);
        
        textSize(40);
        fill(255, 255, 255);
        text("30>", 340, 380);
        
        // lines on the field
        fill(255, 255, 255);
        rect(0, 0, 5, 400);
        fill(255, 255, 255);
        rect(40, 0, 5, 400);
        fill(255, 255, 255);
        rect(80, 0, 5, 400);
        fill(255, 255, 255);
        rect(120, 0, 5, 400);
        fill(255, 255, 255);
        rect(160, 0, 5, 400);
        fill(255, 255, 255);
        rect(197, 0, 10, 400);
        fill(255, 255, 255);
        rect(240, 0, 5, 400);
        fill(255, 255, 255);
        rect(280, 0, 5, 400);
        fill(255, 255, 255);
        rect(320, 0, 5, 400);
        fill(255, 255, 255);
        rect(360, 0, 5, 400);
        fill(255, 255, 255);
        rect(395, 0, 5, 400);
    
        //    text(currentScene + " Current Scene Value", 100, 150);
        //    text(currentplaysec + " seconds initial", 100, 250);
            
        if (currentScene === playScene) {
            playminutes = minute() - currentplaymin;
            playseconds = playminutes * 60 + second() - currentplaysec;
    
            //        text(playseconds + " seconds elapsed", 100, 350);
                
            if (playseconds < 2) {
                textSize(40);
                fill(255, 0, 0);
                text("Ready", 10, 30);
            }
            if (playseconds >= 2 && playseconds < 4) {
                textSize(40);
                fill(255, 0, 0);
                text("Set", 10, 30);
            }
            if (playseconds >= 4 && playseconds < 6) {
                textSize(40);
                fill(255, 0, 0);
                text("Go!", 10, 30);
            }
            
            //Your dot
            if (playseconds >= 6){
                var dot;
                if (true) {
                    fill(255, 0, 0);
                    ellipse(mouseX, mouseY, 15, 15);     
                    var players;
                    fill(168, 168, 168);
                    var m = millis()/4;
                    ellipse(m % width, 200, 15, 15);
                    ellipse(m % width, 100, 15, 15);
                    ellipse(m % width, 325, 15, 15);
                    ellipse(123, m % width, 15, 15);
                    ellipse(m % width, m % width, 15, 15);
                    ellipse(265, m % width, 15, 15);
                    ellipse(m % width, 150, 15, 15);
                    ellipse(m % width, 250, 15, 15);
                    ellipse(m % width, 50, 15, 15);
                    ellipse(200, m% width, 15, 15);
                    ellipse(50, m % width, 15, 15);
                    ellipse(324, m % width, 15, 15);
                    ellipse(m % width, 10, 15, 15);
                    ellipse(390, m % width, 15, 15);
                    ellipse(10, m % width, 15, 15);  
                    ellipse(20, m % width, 15, 15);
                    ellipse(360, m % width, 15, 15);
                    ellipse(m % width, 80, 15, 15);
                    ellipse(m % width, 125, 15, 15);
                    ellipse(m % width, 173, 15, 15);
                    ellipse(m % width, 221, 15, 15);
                    ellipse(m % width, 278, 15, 15);
                    ellipse(m % width, 301, 15, 15);
                    ellipse(m % width, 357, 15, 15);
                    ellipse(m % width, 371, 15, 15);
                    ellipse(73, m % width, 15, 15);
                    ellipse(107, m % width, 15, 15);
                    ellipse(223, m % width, 15, 15);
                    ellipse(285, m % width, 15, 15);
                    ellipse(345, m % width, 15, 15);
                }
            }
        }
    };
    
    var drawloseScene = function() {
        background(255, 0, 0);
        textSize(40);
        fill(31, 5, 5);
        text("You lost. No points", 25, 47); 
    };
            
    
    
    var drawbtnRules = function() {
        noStroke();
        fill(255, 255, 255);
        rect(53, 223, 115, 45);
        textSize(23);
        fill(255, 0, 0);
        text("Rules", 73, 252); 
    };
    
    var drawbtnComments = function() {
        noStroke();
        fill(255, 255, 255);
        rect(269, 223, 115, 45);
        textSize(23);
        fill(255, 0, 0);
        text("Comments", 271, 252);  
    };
    
    var drawbtnPlayGame = function() {
        noStroke();
        fill(255, 255, 255);
        rect(167, 316, 115, 45);
        textSize(23);
        fill(255, 0, 0);
        text("Play Game", 168, 346);
    };
    
    
    
    this.draw = function() {
        if(currentScene === mainMenuScene) {
            // draw main menu
            background(255, 170, 0);
            
            //GameTitle
            textSize(24);
            fill(255, 0, 0);
            text("Marching Game", 52,187);
            
            drawbtnRules();
            drawbtnComments();
            drawbtnPlayGame();
        }
        else if(currentScene === rulesScene) {
            // draw rules
            background(255, 0, 0);
            
            drawRulesScene();
            drawbtnReturnToMenu();
        }
        else if(currentScene === commentsScene) {
            // draw comments
            background(55, 196, 104);
            textSize(25);
            fill(240, 240, 12);
            text("Sorry, there are no comments.", 30, 20);
            drawbtnReturnToMenu();
        }
        else if(currentScene === playScene) {
            // plays game
            drawPlayScene();
            
            if(mouseIsPressed === false) {
                var mouseCol = get(mouseX, mouseY);
                if(mouseCol === color(168, 168, 168)) {
                    currentScene = loseScene;
                }
            }
        } else if(currentScene === loseScene) {
            drawloseScene();
        }
    };
    
    this.mousePressed = function() {
        if(currentScene === mainMenuScene) {
            if(mouseX >= 53 && mouseX < 168 && mouseY >= 223 && mouseY < 268) {
                currentScene = rulesScene;
            }
            if(mouseX >= 269 && mouseX < 384 && mouseY >= 223 && mouseY < 268){
                currentScene = commentsScene;
            }
            if(mouseX >= 167 && mouseX < 282 && mouseY >= 316 && mouseY < 361){
                currentplaysec = second();
                currentplaymin = minute();
                currentScene = playScene; 
            }
            
        } 
        else if(currentScene === rulesScene) {
            if(mouseX >= 200 && mouseX < 315 && mouseY >= 200 && mouseY < 245) {
                currentScene = mainMenuScene;
            }
        } 
        else if(currentScene === commentsScene) {
            if(mouseX >= 200 && mouseX < 315 && mouseY >= 200 && mouseY < 245) {
                currentScene = mainMenuScene;
            }
        }
        else if(currentScene === playScene) {
            if(mouseX >= 295 && mouseX < 305 && mouseY >= 95 && mouseY < 105) {
                currentScene = drawwinScene();
            }
            
        }
    };
};

/**
 * https://www.khanacademy.org/computer-programming/spin-off-of-byte-me-submissions/4562186463870976
 * By Alex Nickl 
 * */
var Nickl = function() {
    var GREEN = color(0, 250, 0); 
    var RED = color(255, 0, 0);
    
    var buttonRound = 1;
    
    var drawButtons = function() {
        if(buttonRound === 1 || buttonRound === 3 ){
            noStroke();
            fill(255, 0, 0);
            ellipse(100, 200, 130,130);
            fill(0, 250, 0);
            ellipse(250,200,130,130);
        }
        
        if(buttonRound === 2 || buttonRound === 4  ){
            noStroke();
            fill(255, 0, 0);
            ellipse(250,200,130,130);
            fill(0, 250, 0);
            ellipse(100,200,130,130);
        }
    };
    
    this.draw = function() {
        background(0, 0, 0);
        
        fill(255, 255, 255);
        textFont(createFont("Tahoma"), 18);
        text("click the buttons in this order\ngreen red red green", 47, 100);
        
        text("© MHS BYTE CLUB", 37, 377);
        
        drawButtons();
        
        if(buttonRound === 5) {
            currentLevel++;
        }
    };
    
    this.mousePressed = function() {
        var mouseColor = get(mouseX,mouseY);
        
        if(buttonRound === 1 || buttonRound === 4) {
            if(mouseColor === RED){
                background(255, 0, 0);
                text("fail",100,100);
                noLoop();
            }
            
            if(mouseColor === GREEN){
                buttonRound++;
            }
        } else if(buttonRound === 2 || buttonRound === 3) {
            if(mouseColor === RED){
                buttonRound++;
            }
            if(mouseColor === GREEN){
                background(255, 0, 0);
                text("fail",100,100);
                noLoop();
            }
        }
    };
};

var Congragulations = function() {
    this.draw = function() {
        background(0, 0, 0);
        
        fill(255, 255, 255);
        textFont(createFont("Tahoma"), 38);
        text("Congragulations!\nYou won!!!!!!!!!!!!!!!!!!!!!!!!", 47, 100);
        
        text("© Play Again?", 37, 377);
        
        ellipse(mouseX, mouseY, 32, 32);
        if(dist(mouseX, mouseY, 55, 363) < 4) {
            fill(51, 255, 0);
            ellipse(55, 363, 36, 36);
            
            if(mouseIsPressed) {
                currentLevel = 1;
            }
        }
    };
};

var Lost = function() {
    this.draw = function() {
        background(0, 0, 0);
        
        fill(255, 255, 255);
        textFont(createFont("Tahoma"), 38);
        text("Oh noes!\nYou lost!!!!!!!!!!!!!!!!!!!!!!!!", 47, 100);
        text("© Play Again?", 37, 377);
        ellipse(mouseX, mouseY, 32, 32);
        
        if(dist(mouseX, mouseY, 55, 358) < 4) {
            fill(51, 255, 0);
            ellipse(55, 358, 36, 36);
            
            if(mouseIsPressed) {
                currentLevel = 1;
            }
        }
    };
};

games = [Opener, ShannonDontTouchWhite, Balogh, Kenny, ShannonMovingButton, Alberts, Farmer, ShannonRedButton, Rouvinov, Montero, Nickl, Congragulations, Lost];
var game = new games[currentLevel]();

var draw = function() {
    game.draw();
    
    if(currentLevel !== lastFrameLevel) {
        colorMode(RGB, 255);
        background(255, 255, 255);
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        
        textFont(createFont("sans-serif"), 12);
        textAlign(LEFT, BOTTOM);
        
        angleMode = "degrees";
        
        frameRate(30);
        resetMatrix();
        
        loop();
        
        game = new games[currentLevel]();
        
        /*
        mouseClicked = game.mouseClicked;
        mousePressed = game.mousePressed;
        mouseReleased = game.mouseReleased;
        mouseMoved = game.mouseMoved;
        mouseDragged = game.mouseDragged;
        mouseOver = game.mouseOver;
        mouseOut = game.mouseOut;
        keyPressed = game.keyPressed;
        keyReleased = game.keyReleased;
        keyTyped = game.keyTyped;
        keyPressed = game.keyPressed;
        */
    }
    
    lastFrameLevel = currentLevel;
};

var mouseClicked = function(){ game.mouseClicked(); };
var mousePressed = function(){ game.mousePressed(); };
var mouseReleased = function(){ game.mouseReleased(); };
var mouseMoved = function(){ game.mouseMoved(); };
var mouseDragged = function(){ game.mouseDragged(); };
var mouseOver = function(){ game.mouseOver(); };
var mouseOut = function(){ game.mouseOut(); };
var keyPressed = function(){ game.keyPressed(); };
var keyReleased = function(){ game.keyReleased(); };
var keyTyped = function(){ game.keyTyped(); };
var keyPressed = function(){ game.keyPressed(); };
