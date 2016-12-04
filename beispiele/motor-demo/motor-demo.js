let Gpio = require('pigpio').Gpio;

// https://www.raspberrypi.org/documentation/usage/gpio-plus-and-raspi2/
let pins = {
    motor1: {
        forward: 14,
        backward: 15

    },
    motor2: {
        forward: 20,
        backward: 21
    }
};


class Motor {
    constructor(conf) {
        this.pins = {};
        this.gpioForward = new Gpio(conf.forward, {mode: Gpio.OUTPUT});
        this.gpioBackward = new Gpio(conf.backward, {mode: Gpio.OUTPUT});

        this.gpioForward.digitalWrite(false);
        this.gpioBackward.digitalWrite(false);
    }

    drive(speed) {

        if (speed == 0) {
            this.gpioForward.digitalWrite(false);
            this.gpioBackward.digitalWrite(false);
        }
        if (speed > 0) {
            this.gpioForward.pwmWrite(speed);
            this.gpioBackward.digitalWrite(false);
        }
        if (speed < 0) {
            this.gpioForward.digitalWrite(false);
            this.gpioBackward.pwmWrite(-speed);
        }


    }
}

var motor1 = new Motor(pins.motor1);
var motor2 = new Motor(pins.motor2);

setInterval(function () {

    motor1.drive(255);
    motor2.drive(255);

    setTimeout(function () {
        motor1.drive(-255);
        motor2.drive(-255);

    }, 2000)

}, 4000);

