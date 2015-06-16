// https://www.khanacademy.org/computer-programming/one-minute/4833095146668032

/**
 * One Minute
 * By Raphael Rouvinov-Kats
 * 
 * An attempt at http://dvdp.tumblr.com/post/76566850010/1-minute-follow-one-row-from-the-beginning-to-the
 * By dvdp
 * 
   "1 minute
  
    Follow one row from the beginning to the end.
    This is 1 minute of your life (ca. 40 million minutes).
    
    1 minute can pass fast. 1 minute can pass slowly. It depends on your actual situation/conditions (even your body temperature).
    Feel the time for a minute."
 
 * */

var MIN = 60;

var draw = function() {
    background(0, 0, 0);
    
    // lines
    stroke(255, 255, 255);
    for(var r = 0; r <= MIN; r++) {
        var y = r/MIN*height;
        line(0, y, width, y);
    }
    
    // red boxes
    var sec = floor(millis()/1000);
    var h = height/MIN - 2;
    var w = h;
    noStroke();
    fill(255, 0, 0);
    for(var r = 0; r < MIN; r++) {
        var c = (r + sec) % MIN;
        var x = c/MIN*width;
        var y = r/MIN*height + 1;
        
        rect(x, y, w, h);
    }
};
