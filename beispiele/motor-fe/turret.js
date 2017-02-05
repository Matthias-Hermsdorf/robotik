'use strict';

let Servo = require("./servo").Servo;

//Pi 2
// tdb
let pin = 4;
if ((process.argv.indexOf("oldpi") > -1)) {
    //Pi 1B
    pin = 4;
}

// Der Servo reagiert zwischen 600 und 1700. Aber wenn ich zu weit nach hinten gehe, schleift die Kamerahalterung über die H-Brücke
let verticalServo = new Servo({pin:pin, minPulse:600, maxPulse: 1460, reverse: true});

function vertical(conf) {
    verticalServo.move({direction: conf.vertical, speed: conf.speed});
}

function rotate(data){

    data = data || {};
    if (typeof data.speed != "number") { data.speed = 0.01; }
    if (typeof data.vertical != "number") { data.vertical = 0.5; }

    vertical(data);
}

module.exports.vertical = vertical;
module.exports.rotate = rotate;
