'use strict';
var Motor = require("./motor").Motor;

// Pins siehe http://www.raspberrypi-spy.co.uk/2012/06/simple-guide-to-the-rpi-gpio-header-and-pins/

// Es gelten die Pinzahlen außen
//http://www.raspberrypi-spy.co.uk/wp-content/uploads/2012/06/Raspberry-Pi-GPIO-Layout-Model-B-Plus-rotated-2700x900.png
// Es funktionieren auch die mit UART gekennzeichneten Pins. Aber beim Ausschalten fließt auf RTX Strom und das Auto
var pins = {
    // Pi 2
    motorLeft: {forward: 23, backward: 24 },
    motorRight: {forward: 20, backward: 21 }
};

if ((process.argv.indexOf("oldpi") > -1)) {
    // http://www.raspberrypi-spy.co.uk/wp-content/uploads/2012/09/Raspberry-Pi-GPIO-Layout-Revision-1.png
    pins = {
        //Pi 1B
        motorLeft: {forward: 23, backward: 24 },
        motorRight: {forward: 25, backward: 11 }
        // GPIO8 wäre von der Position her besser. Aber nach dem Ausschalten fließt dort Strom  und das Auto fährt.

    }
}

var motorLeft = new Motor(pins.motorLeft);
var motorRight = new Motor(pins.motorRight);

function drive (conf) {
    //conf.direction;
    //conf.speed;

    if (conf.speed != 0) {
        let speeds = getMotorSpeeds(conf.speed, conf.direction);

        console.log('is driving', speeds.motorLeft, speeds.motorRight);
        motorLeft.drive(speeds.motorLeft);
        motorRight.drive(speeds.motorRight);
    
    } else {
        console.log('break');
        motorLeft.drive(0);
        motorRight.drive(0);
    }

}

function getMotorSpeeds (speed, direction) {
    let motorLeft = 0;
    let motorRight = 0;
    let pi = Math.PI;

    if ((direction >= 0) && (direction <= (pi/2))) {
        console.log("1. Quadrant speed", speed, " direction", direction);
        motorLeft = speed;
        motorRight = Math.cos(2*(direction+pi))*speed;
    }

    if (direction > (pi/2) && direction <= pi) {
        motorLeft = Math.cos(2*(direction+(pi/2)))*speed;
        motorRight = speed;
        console.log("2. Quadrant speed", speed, " direction", direction);
    }

    if (direction > pi && direction <= (pi*3/2)) {
        motorLeft = -speed;
        motorRight = Math.cos(2*direction)*speed;
        console.log("3. Quadrant speed", speed, " direction", direction);
    }

    if (direction > (pi*3/2) && direction <= (2*pi)) {
        //motorLeft = Math.cos(2*(direction+(pi/2)))*speed;
        motorLeft = Math.cos(2*(direction-(pi/2)))*speed;
        motorRight = -speed;
        console.log("4. Quadrant speed", speed, " direction", direction);
    }

    //return {motorLeft: voltageFix(motorLeft), motorRight: voltageFix(motorRight)}
    return {motorLeft: motorLeft, motorRight: motorRight};
}

function voltageFix (val) {
    // Stromkorrektur weil unter 40% nichts fährt
    let ret;
    if (val > 0) {
        ret = (val * 0.6) + 0.4;
    } else {
        ret = (val * 0.6) - 0.4;
    }

    // debug
    ret = val;

    return ret;
}

module.exports.drive = drive;
