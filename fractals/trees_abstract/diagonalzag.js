// https://www.khanacademy.org/computer-programming/diagonalzag/5148062178344960

translate(200, 200);
rotate(45);
translate(0, -131);

var startX = 0;
var startY = 0;
var startNodeSize = 3;

var startXChange = 142;
var startYChange = 200;
var xChangeMultiplier = 0.5;
var yChangeMultiplier = -0.50;
var nodeSizeMultiplier = 1.0;

var totalDepth = 8;

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
strokeWeight(0.5); // line weight
drawNodes(startX, startY, startXChange, startYChange, startNodeSize, totalDepth);
