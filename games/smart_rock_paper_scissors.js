// https://www.khanacademy.org/computer-programming/smart-rock-paper-scissors/6423744100171776

/**
 * SMART Rock, Paper, Scissors
 * By Raphael Rouvinov-Kats
 * 8/10/14
 * 
 * Play rock, paper, scissors with a computer that can guess
 * your next move :)
 * 
 * How to play:
 * Click r, p, or s to do rock paper or scissors
 * (The computer already decided its move before [I swear!
 *  Look at the code :D])
 * 
 * The result of the round will be printed along with
 * Your cumulative (total) results
 * 
 * Try to beat the computer. I bet you can't! It remembers
 * The probability of you selecting a certain move based on
 * past moves, which puts you at a huge disadvantage since
 * you almost certainly aren't clicking the buttons randomly.
 * 
 * Wanna learn how I did this? Markov chains!
 * http://setosa.io/blog/2014/07/26/markov-chains/
 * */

var changeWeight = 2; // higher means the computer adjusts
                        // sharply to players' moves
                        // lower means it adjusts gradually
                        // keep the number above 1

/** Constants for moves **/
var ROCK = 0;
var PAPER = 1;
var SCISSORS = 2;
var moves = [ROCK, PAPER, SCISSORS];
var movesChars = ['r', 'p', 's'];
var moveWords = ['Rock', 'Paper', 'Scissors'];

/** Variables to store last move **/
var lastPMove = floor(random(0, moves.length)); // player
var lastCMove = floor(random(0, moves.length)); // computer

/** Variables to store computer/player wins **/
var compWins = 0;
var playerWins = 0;
var ties = 0;

var WIN = 1;
var TIE = 0;
var LOSS = -1;

/** MARKOV CHAINS WOO
 * This is the array that holds likelihoods for the next move
 * 
 * it tells you the probability of the player picking a certain
 * move, based on the player's last move and the computer's
 * last move
 * 
 * (It probably makes more sense to instead base it off of the 
 *  player's last two moves, shall test later)
 * 
 * prob =
 * [last player move][last computer move][next player move]
 * 
 * each index goes from 0 to moves.length
 * each move probability is initalized to 1/moves.length
 * */
var prob = [];
for(var i = 0; i < moves.length; i++) {
    prob[i] = [];
    for(var j = 0; j < moves.length; j++) {
        prob[i][j] = [];
        for(var k = 0; k < moves.length; k++) {
            prob[i][j][k] = 1/moves.length;
        }
    }
}

// function to update the probability array after a round
var updateProbability = function(lastPlayerMove, lastCompMove,
                                 playerMove) {
                                     
    // from is the probability array of the player selecting
    // a certain move based on the last one
    var from = prob[lastPlayerMove][lastCompMove];
    var r = from[ROCK], 
        p = from[PAPER],
        s = from[SCISSORS];
    
    // update probabilities
    // r, p, s are probabilities of player selecting
    // rock paper or scissors from last move
    // lets say the player picked r
    // I multiply r by 'b' (var changeWeight) to 
    //   make it more probable
    // Then multiply p and s by 'a' to make them less probable
    // r, p, s, and b are known while a is not
    
    // r + p + s =  1
    // br + a(p + s) = 1
    // a(p + s) = 1 - br
    // a = (1 - br) / (p + s)
    
    for(var i = 0; i < from.length; i++) {
        // adjust weighting
        if(i === playerMove) {
            from[i] *= changeWeight;
        } else {
            from[i] *= (1 - changeWeight*r)/(p + s);
        }
        
        // limit how far the weighting goes
        from[i] = constrain(from[i], 0.025, 0.95);
    }
};

// function to generate the computer's move
var getMove = function(lastPlayerMove, lastCompMove) {
    var from = prob[lastPlayerMove][lastCompMove];
    var r = from[ROCK], 
        p = from[PAPER],
        s = from[SCISSORS];
    
    var rand = random(0, 1);
    if(rand < r) { // guess that player plays rock
        return PAPER; // so you play paper
        
    } else if(rand < r + p) { // guess that player plays paper
        return SCISSORS; // so you play scissors
        
    } else { // guess that player plays scissors
        return ROCK; // so you play rock
    }
};

/** variables for buttons **/
var buttonX = 246;
var buttonW = 20;
var buttonH = 25;
var buttonYDist = 27;
var rY = 264;
var pY = rY + buttonYDist;
var sY = pY + buttonYDist;
var buttonBG = color(143, 143, 143);
var buttonFG = color(255, 255, 255);
var buttonHover = color(255, 217, 217);

var mouseIsOverButton = function(button) {
    var buttonY = -1;
    if(button === ROCK) {
        if(keyIsPressed && key.toString() === 'r') {
            return true;
        }
        buttonY = rY;
    }
    else if(button === PAPER) {
        if(keyIsPressed && key.toString() === 'p') {
            return true;
        }
        buttonY = pY;
    } else if(button === SCISSORS) {
        if(keyIsPressed && key.toString() === 's') {
            return true;
        }
        buttonY = sY;
    }
    var inX = mouseX >= buttonX && mouseX < buttonX + buttonW;
    var inY = mouseY >= buttonY && mouseY < buttonY + buttonH;
    return inX && inY;
};

/* draws r, p, and s so mobile users can play
 * program by Raphael Rouvinov-Kats */
var drawGameButtons = function() {
    var overR = mouseIsOverButton(ROCK);
    var overP = mouseIsOverButton(PAPER);
    var overS = mouseIsOverButton(SCISSORS);
    
    noStroke();
    textFont(createFont("Comic Sans MS"), 32);
    
    // r
    fill(buttonBG);
    rect(buttonX+1, rY+1, buttonW, buttonH);
    fill(buttonFG);
    if(overR) {  fill(buttonHover); }
    rect(buttonX, rY, buttonW, buttonH);
    fill(0, 0, 0);
    text('r', buttonX + 2, rY + 19);
    
    // p
    fill(buttonBG);
    rect(buttonX+1, pY+1, buttonW, buttonH);
    fill(buttonFG);
    if(overP) {  fill(buttonHover); }
    rect(buttonX, pY, buttonW, buttonH);
    fill(0, 0, 0);
    text('p', buttonX + 2, pY + 19);
    
    // s
    fill(buttonBG);
    rect(buttonX+1, sY+1, buttonW, buttonH);
    fill(buttonFG);
    if(overS) {  fill(buttonHover); }
    rect(buttonX, sY, buttonW, buttonH);
    fill(0, 0, 0);
    text('s', buttonX + 2, sY + 19);
};

// function to draw the computer on the result screen
var drawComp = function(compWon) {
    background(4, 62, 64);
    
    noStroke();
    
    // computer silhouette
    fill(0, 0, 0);
    rect(120+1, 10+1, 223, 147, 19);
    rect(235+1, 155+1, 18, 32, 6);
    rect(220+1, 165+1, 50, 23, 6);
    fill(41, 41, 41);
    rect(120, 10, 223, 147, 19);
    rect(235, 155, 18, 32, 6);
    rect(220, 165, 50, 23, 6);
    
    // computer green bg
    fill(0, 0, 0);
    rect(127, 12, 210, 139, 19);
    
    // evil face
    fill(0, 255, 102);
    triangle(180, 31, 210, 45, 177, 40);
    triangle(290, 31, 260, 45, 293, 40);
    ellipse(200, 47, 10, 10);
    ellipse(271, 47, 10, 10);
    if(compWon === WIN) {
        arc(235, 75, 100, 100, 0, 180);
    } else if(compWon === TIE) {
        arc(235, 75, 100, 100, 0, 3);
    } else {
        rect(200, 66, 50, 4);
    }
    
    drawGameButtons();
};

// function to draw result text
var drawText = function(compWon, playerMove, compMove) {
    textFont(createFont("Tahoma"), 18);
    fill(255, 255, 255);
    
    var textLeft = 30;
    
    if(compWon === WIN) {
        text("I WIN", textLeft, 100);
    } else if(compWon === TIE) {
        text("TIE", textLeft, 100);
    } else {
        text("YOU WIN", textLeft, 100);
    }
    
    text("I played " + moveWords[compMove], textLeft, 215);
    text("You played " + moveWords[playerMove], textLeft, 240);
    text("TOTALS", textLeft, 270);
    text("Ties: " + ties, textLeft, 290);
    text("Computer: " + compWins, textLeft, 310);
    text("Player: " + playerWins, textLeft, 330);
};



// draws start screen
var drawStartScreen = function() {
    background(143, 223, 247);
    
    drawGameButtons();
    
    
    fill(0, 0, 0);
    textFont(createFont("Consolas"), 24);
    text("(smart)", 162, 40);
    textFont(createFont("Tahoma"), 60);
    text("ROCK", 130, 100);
    text("PAPER", 122, 160);
    text("SCISSORS", 70, 218);
    textSize(18);
    
    var smart = getImage("avatars/old-spice-man");
    var rock = getImage("cute/Rock");
    var paper = getImage("avatars/leaf-green");
    var scissors = getImage("avatars/purple-pi");
    
    image(smart, 128, 10, 40, 40);
    image(rock, 65, 26, 50, 74);
    image(paper, 308, 111, 50, 50);
    image(scissors, 17, 174, 50, 50);
    
    var leftX = 110;
    var topY = 255;
    textFont(createFont("Consolas"), 18);
    text("Ready to play?", leftX, topY);
    text("Type or click   for rock", leftX, 
                                     topY+buttonYDist);
    text("Type or click   for paper", leftX, 
                                      topY+buttonYDist*2);
    text("Type or click   for scissors", leftX,
                                         topY+buttonYDist*3);
};

// plays game based on what the player played
var playGame = function(playerKey) {
    var compMove = getMove(lastPMove, lastCMove);
        
    var playerMove = ROCK;
    if(playerKey === 'p') { playerMove = PAPER; }
    if(playerKey === 's') { playerMove = SCISSORS; }
    
    if(compMove === playerMove) {
        ties++;
        drawComp(TIE);
        drawText(TIE, playerMove, compMove);
    } 
    else if((compMove + 1) % 3 === playerMove) {
        playerWins++;
        drawComp(LOSS);
        drawText(LOSS, playerMove, compMove);
        
    }
    else {
        compWins++;
        drawComp(WIN);
        drawText(WIN, playerMove, compMove);
    }
    
    updateProbability(lastPMove, lastCMove, playerMove);
    
    lastCMove = compMove;
    lastPMove = playerMove;
};

// game is played when a rock, paper, scissors key is released
var keyReleased = function() {
    var k = key.toString();
    
    var isMove = k === 'r' || k === 'p' || k === 's';
    if(isMove) {
        playGame(k);
    }
    
    drawGameButtons();
    
     
    // probability scoring array
    // program by raphael rouvinov-kats
    // https://www.khanacademy.org/cs/smart-rock-paper-scissors/6423744100171776
    // debug(prob);
};

// game is played when mouse released over r,p, or s button
var mouseReleased = function() {
    if(mouseIsOverButton(ROCK)) { playGame('r'); }
    if(mouseIsOverButton(PAPER)) { playGame('p'); }
    if(mouseIsOverButton(SCISSORS)) { playGame('s'); }
};

// if over r, p, or s button, highlight it
var mouseMoved = function() {
    drawGameButtons();
};

drawStartScreen();
