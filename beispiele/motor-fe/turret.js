'use strict';

var Servo = require("./servo").Servo;

//Pi 2
var pin = 14;
if ((process.argv.indexOf("oldpi") > -1)) {
    //Pi 1B
    pin = 14;
}

let verticalServo = new Servo(pin);

function vertical(direction) {
    verticalServo.set(direction);

}

function rotate(data){
   // {vertical:0.5, horizontal: 0.5}
    if (typeof data.vertical == "number") {
        vertical(data.vertical)
    }
}

module.exports.vertical = vertical;
module.exports.rotate = rotate;
