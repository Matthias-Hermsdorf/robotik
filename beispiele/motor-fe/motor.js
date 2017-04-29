let Gpio;
if ((process.argv.indexOf("stub") > -1)) {
    Gpio = require('./pigpio-stub').Gpio;
} else {
    Gpio = require('pigpio').Gpio;
}

class Motor {
    constructor(conf) {
        this.pins = {};
        this.gpioForward = new Gpio(conf.forward, {mode: Gpio.OUTPUT});
        this.gpioBackward = new Gpio(conf.backward, {mode: Gpio.OUTPUT});

        this.gpioForward.digitalWrite(false);
        this.gpioBackward.digitalWrite(false);
    }

    drive(speed) {
        speed = Math.floor(speed*255);

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

module.exports.Motor = Motor;