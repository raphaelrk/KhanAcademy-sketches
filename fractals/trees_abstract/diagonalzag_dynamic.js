// https://www.khanacademy.org/computer-programming/dynamic-diagonalzag/4515516037988352

translate(200, 200);
rotate(45);
translate(0, -141);

var startX = 0;
var startY = 0;
var startNodeSize = 10;

var startXChange = 142;
var startYChange = 200;
var xChangeMultiplier = 0.618;
var yChangeMultiplier = -0.618;
var nodeSizeMultiplier = 0.75;

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

var draw = function() {
    background(255, 255, 255);
    xChangeMultiplier = map(mouseX, 0, width, 0, 2);
    yChangeMultiplier = map(mouseY, 0, height, -2, 2);
    
    drawNodes(startX, startY, startXChange, startYChange, startNodeSize, totalDepth);
};
