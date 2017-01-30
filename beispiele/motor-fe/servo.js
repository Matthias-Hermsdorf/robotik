let Gpio = require('pigpio').Gpio;

class Servo {
    constructor(pin) {
        this.pin = pin;
        this.gpioServo = new Gpio(pin, {mode: Gpio.OUTPUT});
    }

    set(direction) {
        // direction ist zwischen 0 und 1,
        // Wie weit das ausschlägt ist vom Servo abhängig.
        console.log("servo get Direction:",direction)

        direction = Math.max(direction, 0);
        direction = Math.min(direction, 1);

        // Der HiTec HS53geht von 600 bis 2350
        // Das heißt er fährt über 1700 und schafft dabei 180°

        let pulseWidth = Math.floor(direction*1700 + 600);
        //let pulseWidth = Math.floor(direction*1000 + 1000);
        console.log("set servo ",this.pin," to pulseWidth:",pulseWidth );

        this.gpioServo.servoWrite(pulseWidth);
    }
}

module.exports.Servo = Servo;