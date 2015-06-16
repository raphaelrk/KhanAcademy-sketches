// https://www.khanacademy.org/computer-programming/pong/2280727485

/**
 * PONG
 * By Raphael Rouvinov-Kats
 * */
var score = [0, 0]; // [player, enemy]

var PlayerPaddle = function() {
    var x = 10;
    var y = mouseY;
    var height = 60;
    var width = 5;
    
    this.draw = function() {
        fill(0, 0, 0);
        noStroke();
        rect(x, y, width, height);
        
        fill(47, 186, 0);
        rect(x+width/4, y+height/20, width*1/2, height*9/10);
    };
    
    this.update = function() {
        y = mouseY - height / 2;
        if(y >= 400-height) {
            y = 400-height;
        }
        if(y <= 0) {
            y = 0;
        }
    };
    
    this.getX = function() { return x; };
    this.getY = function() { return y; };
    this.getW = function() { return width; };
    this.getH = function() { return height; };
};

var EnemyPaddle = function() {
    var x = 400 - 10;
    var y = mouseY;
    var height = 60;
    var width = 5;
    var speed = 0.2;
    
    this.draw = function() {
        fill(0, 0, 0);
        noStroke();
        rect(x, y, width, height);
        
        fill(179, 0, 0);
        rect(x+width/4, y+height/20, width*1/2, height*9/10);
    };

    this.update = function(bally) {
        y += (bally - y - height / 2)*speed;
        
        if(y >= 400-height) {
            y = 400-height;
        }
        if(y <= 0) {
            y = 0;
        }
    };
    
    this.getX = function() { return x; };
    this.getY = function() { return y; };
    this.getW = function() { return width; };
    this.getH = function() { return height; };
};

var Ball = function() {
    var x = 20;
    var y = 0;
    var dx = 0;
    var dy = 0;
    var radius = 10;
    var attached = -1;  // attached to a paddle.
                        // -1 is player, 0 is no, 1 is enemy
    
    this.draw = function() {
        fill(0, 13, 255);
        noStroke();
        ellipse(x, y, radius, radius);
        
        fill(0, 168, 160);
        ellipse(x, y, radius*2/3, radius*2/3);
    };
    
    this.update = function(p, e) {
        if(attached === -1) {
            x = p.getX() + p.getW() + radius / 2;
            y = p.getY() + p.getH() / 2;
        }
        else if(attached === 1) {
            x = e.getX() - e.getW() + radius / 2;
            y = e.getY() + e.getH() / 2;
        } else {
            x += dx;
            y += dy;
            // bounce off ceil/floor
            if(y >= 400 - radius) {dy = -abs(dy);}
            if(y < radius) {dy = abs(dy);}
            
            var moe = 5; // margin of error
            
            // bounce or escape on player side
            if(x < radius + p.getX() + p.getW()) {
                if(p.getY() - moe < y && 
                   p.getY() + p.getH() + moe > y) { // bounce
                       dx = abs(dx);
                       dy = (y - p.getY() - p.getH()/2)/
                            p.getH()*20;
                } else if (x < radius) { // escape
                    this.newBall(-1);
                    score[1]++;
                }
            }
            // bounce or escape on enemy side
            else if(x >= e.getX() - radius - e.getW()) {
                if(e.getY() - moe< y &&
                   e.getY() + e.getH() + moe> y) { // bounce
                       dx = -abs(dx);
                       dy = (y - e.getY() - e.getH()/2)/
                            e.getH()*20;
                } else if (x >= 400 - radius) { // escape
                    this.newBall(1);
                    score[0]++;
                }
            }
        }
    };
    
    this.mouseClicked = function() {
        if(attached !== 0) {
            dx = -attached * 10;
            dy = random(-10, 10);
            x += -attached * 10;
            attached = 0;
        }
    };
    
    this.newBall = function(side) {
        attached = side;
    };
    
    this.getY = function() { return y; };
};

var ball = new Ball();
var myPad = new PlayerPaddle();
var enPad = new EnemyPaddle();

var draw = function() {
    //fill(0, 0, 0);
    //rect(0, 0, 400, 400);
    var bg = getImage("space/background");
    image(bg, 0, 0);
    
    ball.draw();
    myPad.draw();
    enPad.draw();
    
    myPad.update();
    enPad.update(ball.getY());
    ball.update(myPad, enPad);
    
    textSize(20);
    fill(255, 255, 255);
    text(score[0] + " | " + score[1], 170, 25);
};

var mouseClicked = function() {
    ball.mouseClicked();
};
