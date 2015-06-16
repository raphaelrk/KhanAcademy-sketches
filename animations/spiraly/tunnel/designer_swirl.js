// https://www.khanacademy.org/computer-programming/designer-swirl/5561706315513856

var rotateZ3D = function(theta, nodes) {
    var sin_t = sin(theta);
    var cos_t = cos(theta);
    
    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var y = node[1];
        node[0] = x * cos_t - y * sin_t;
        node[1] = y * cos_t + x * sin_t;
    }
};

frameRate(0);
translate(200, 200);
var draw = function() {
    var rotation = frameCount % 90;
    var d = frameCount % 270;
    
    var nodes = [[d, d], [-d, d], [-d, -d], [d, -d]];
    rotateZ3D(rotation*floor(random(1, 3)), nodes);
    
    stroke(0, 0, 0, 10);
    for(var n = 0; n < nodes.length; n++) {
        var n1 = nodes[n];
        var n2;
        if(n+1 >= nodes.length) {
            n2 = nodes[0];
        } else {
            n2 = nodes[n+1];
        }
        
        line(n1[0], n1[1], n2[0], n2[1]);
    }
};
