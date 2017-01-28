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


        let pulseWidth = Math.floor(direction*1000 + 1000);
        console.log("set servo ",this.pin," to pulseWidth:",pulseWidth );

        this.gpioServo.servoWrite(pulseWidth);
    }
}

module.exports.Servo = Servo;