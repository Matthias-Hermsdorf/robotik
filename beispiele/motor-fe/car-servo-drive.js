'use strict';
let Servo = require("./servo").Servo;

// Pins siehe http://www.raspberrypi-spy.co.uk/2012/06/simple-guide-to-the-rpi-gpio-header-and-pins/

// Es gelten die Pinzahlen außen
//http://www.raspberrypi-spy.co.uk/wp-content/uploads/2012/06/Raspberry-Pi-GPIO-Layout-Model-B-Plus-rotated-2700x900.png
// Es funktionieren auch die mit UART gekennzeichneten Pins. Aber beim Ausschalten fließt auf RTX Strom und das Auto
var pins = {
    // Pi 2
    motorLeft: 4,
    motorRight: 3
};

if ((process.argv.indexOf("oldpi") > -1)) {
    // http://www.raspberrypi-spy.co.uk/wp-content/uploads/2012/09/Raspberry-Pi-GPIO-Layout-Revision-1.png
    pins = {
        //Pi 1B
    //    motorLeft: {forward: 23, backward: 24 },
    //    motorRight: {forward: 25, backward: 11 }
        // GPIO8 wäre von der Position her besser. Aber nach dem Ausschalten fließt dort Strom  und das Auto fährt.

    }
}

var servoLeft = new Servo({pin:pins.motorLeft,minPulse:1000,maxPulse:2000});
var servoRight = new Servo({pin:pins.motorRight,minPulse:1000,maxPulse:2000});


function drive (conf) {

    if (conf.speed != 0) {
        let speeds = getMotorSpeeds(conf.speed, conf.direction);

        console.log('is driving', speeds.motorLeft, speeds.motorRight);
        servoLeft.set(speeds.motorLeft);
        servoRight.set(speeds.motorRight);
    
    } else {
        console.log('break');
        servoLeft.set(0.5);
        servoRight.set(0.5);
    }

}

function getMotorSpeeds (speed, direction) {

    // weil bei unter 40% Spannung die Motoren nicht anlaufen. 20% Korrektur damit
    // man bei angelaufenen Motoren langsam fahren kann.
    //if (speed != 0) {
     //   speed = (speed * 0.8) + 0.2;
    //}
    let motorLeft = 0;
    let motorRight = 0;
    let pi = Math.PI;

    // N bis O Vorwärts rechts
    if ((direction >= 0) && (direction <= (pi/2))) {
        //console.log("N bis O speed", speed, " direction", direction);
        motorLeft = speed;
        motorRight = Math.sin(direction)*speed;
    }

    // N bis W Vorwärts links - jetzt neu, wechsel erst hinten links
    if (direction > (pi/2) && direction <= (pi)) {
        motorLeft = Math.sin(direction)*speed;
        motorRight = speed;
        //console.log("N bis SSW speed", speed, " direction", direction);
    }
    // W bis SSW starke Drehung links
    if (direction > (pi) && direction <= (pi*5/4)) {
        motorLeft = Math.sin(direction)*speed;
        motorRight = speed;
        //console.log("N bis SSW speed", speed, " direction", direction);
    }

    // Richtung S bis SSW Rückwärts links
    if (direction > (pi*5/4) && direction <= (pi*3/2)) {
        motorLeft = Math.sin(2*direction-pi*3/2)*speed
        motorRight= -speed;
        //console.log("S bis SSW speed", speed, " direction", direction);
    }

    // Richtung S bis SSO Rückwärts rechts
    if (direction > (pi*3/2) && direction <= (7/4*pi)) {

        motorLeft= -speed;
        motorRight = Math.sin(2*direction-pi*3/2)*speed
        //console.log("S bis SSO speed", speed, " direction", direction);
    }
    
    // SSO bis O Rechts 
    if (direction > (7/4*pi) && (direction <= (2*pi))) {
        //console.log("SSO bis O speed", speed, " direction", direction);
        motorLeft = speed;
        motorRight = Math.sin(direction)*speed;
    }

//    console.log("speed:",speed,"direction:",direction,"motorLeft:",motorLeft,"motorRight",motorRight)



    return {motorLeft: (motorLeft+1)/2, motorRight: (motorRight+1)/2};
}


module.exports.drive = drive;
