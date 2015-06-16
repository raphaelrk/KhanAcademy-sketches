// https://www.khanacademy.org/computer-programming/tree-drawer/4864743989575680

var startX = 200;
var startY = 20;
var startNodeSize = 10;

var startXChange = 100;
var startYChange = 100;
var xChangeMultiplier = 0.5;
var yChangeMultiplier = 0.81;
var nodeSizeMultiplier = 0.9;

var totalDepth = 7;

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
strokeWeight(1); // line weight
drawNodes(startX, startY, startXChange, startYChange, startNodeSize, totalDepth);
