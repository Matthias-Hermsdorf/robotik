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
        if (speeds.motorLeft) {
            motorLeft.drive(speeds.motorLeft);
        }
        if (speeds.motorRight) {
            motorRight.drive(speeds.motorRight);
        }
    } else {
        console.log('break');
        motorLeft.drive(0);
        motorRight.drive(0);
    }

}

function getMotorSpeeds (speed, direction) {
    let motorLeft = 0;
    let motorRight = 0;

    // Dämpfung
    let directionDaempfung = 0.1;
    if (Math.abs(direction) < directionDaempfung) { direction = 0; }
    if (direction > directionDaempfung) { direction = direction - directionDaempfung;}
    if (direction < -directionDaempfung) { direction = direction + directionDaempfung;}


    if (direction > 0) {
        motorLeft = speed;
        motorRight = speed - direction;
        if (motorLeft < -speed) motorLeft = -speed;
        if (motorLeft > speed) motorLeft = speed;

        if (motorRight < -speed) motorRight = -speed;
        if (motorRight > speed) motorRight = speed;
    }
    if (direction < 0) {
        motorLeft = speed + direction;
        motorRight = speed;
        if (motorRight < -speed) motorRight = -speed;
        if (motorRight > speed) motorRight = speed;

        if (motorLeft < -speed) motorLeft = -speed;
        if (motorLeft > speed) motorLeft = speed;
    }

    if (direction == 0) {
        motorLeft = speed;
        motorRight = speed;
    }

    // Stromkorrektur weil unter 40% nichts fährt

    if (motorLeft != 0) {
        if (motorLeft > 0) {
            motorLeft = (motorLeft * 0.6) + 0.4;
        } else {
            motorLeft = (motorLeft * 0.6) - 0.4;
        }
    }
    if (motorRight != 0) {
        if (motorRight > 0) {
            motorRight = (motorRight * 0.6) + 0.4;
        } else {
            motorRight = (motorRight * 0.6) - 0.4;
        }
    }


    return {motorLeft: motorLeft, motorRight: motorRight}
}

module.exports.drive = drive;
