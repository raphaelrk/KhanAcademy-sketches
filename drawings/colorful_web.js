// https://www.khanacademy.org/computer-programming/colorful-web-with-for-loop-and-fun/2280129123

background(0, 0, 0);

/** fun things to change **/
// alter the for loop parameters
var fun = 0; // "moves" lines by drawing different ones
var fun2 = 0; // changes amount of lines outside
var fun4 = 1.0; // changes amount of lines inside
// alters the line Xs and Ys
var fun3 = 1.0; // changes what Xs and Ys are multiplied by

for(var i = 0 + fun - fun2; i <= 20 + fun + fun2; i+=fun4) {
    stroke(59, 0, 252);
    line(200, 400 - i * 10 * fun3, 200 - i * 10 * fun3, 200);
    
    stroke(255, 0, 0);
    line(i * 10 * fun3, 200, 200, 200 - i * 10 * fun3);
    
    stroke(255, 255, 0);
    line(200, i * 10 * fun3, 200 + i * 10 * fun3, 200);
    
    stroke(47, 255, 0);
    line(400 - i * 10 * fun3, 200, 200, 200 + i * 10 * fun3);
}
