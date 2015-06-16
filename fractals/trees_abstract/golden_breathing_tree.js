// https://www.khanacademy.org/computer-programming/golden-breathing-tree/5341188000055296

var startX = 200;
var startY = 8;
var startNodeSize = 10;

var startXChange = 19;
var startYChange = 44;
var xChangeMultiplier = 1;
var yChangeMultiplier = 1;
var nodeSizeMultiplier = 0.9;

var totalDepth = 10;

var drawNodes = function(nodeX, nodeY, xChange, yChange, nodeWeight, depth) {
    if(depth <= 0) {
        return;
    }
    
    noStroke();
    ellipse(nodeX, nodeY, nodeWeight, nodeWeight);
    
    // draw lines to next branches
    if(depth > 1) {
        stroke(0, 0, 0);
        
        // left branch line
        line(nodeX, nodeY, nodeX - xChange, nodeY + yChange);
        
        // right branch line
        line(nodeX, nodeY, nodeX + xChange, nodeY + yChange);
    }
    
    // left branch
    drawNodes(nodeX - xChange, nodeY + yChange, 
              xChange*xChangeMultiplier, yChange*yChangeMultiplier,
              nodeWeight*nodeSizeMultiplier, depth - 1);
    
    // right branch
    drawNodes(nodeX + xChange, nodeY + yChange, 
              xChange*xChangeMultiplier, yChange*yChangeMultiplier,
              nodeWeight*nodeSizeMultiplier, depth - 1);
};

fill(0, 0, 0, 150); // node color
strokeWeight(0.2); // line weight

var draw = function() {
    background(255, 255, 255);
    xChangeMultiplier = 1.618 * sin(frameCount/4);
    drawNodes(startX, startY, startXChange, startYChange, startNodeSize, totalDepth);
};
