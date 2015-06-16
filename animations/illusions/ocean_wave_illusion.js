// https://www.khanacademy.org/computer-programming/ocean-wave-illusion/6082407211991040

var bgColor = color(40, 0, 255);
var leaf = getImage("cute/TreeUgly");
var s = 18;

background(bgColor);

for(var y = -s*2; y <= 400 + s*2; y += s) {
    for(var x = -s*2; x <= 400 + s*2; x += s) {
        pushMatrix();
            translate(x, y);
            rotate((x-y));
            var o = 1.5;
            image(leaf, -s/2*o, -s/2*o, s, s);
        popMatrix();
    }
}
