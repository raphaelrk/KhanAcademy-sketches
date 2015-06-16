// https://www.khanacademy.org/computer-programming/golden-tree/5657046471671808

var startX = 200;
var startY = 0;
var startNodeSize = 3;

var startXChange = 1.618;
var startYChange = 43;
var xChangeMultiplier = 1.618;
var yChangeMultiplier = 1.007;
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

fill(0, 0, 0); // node color
strokeWeight(0.2); // line weight
drawNodes(startX, startY, startXChange, startYChange, startNodeSize, totalDepth);
