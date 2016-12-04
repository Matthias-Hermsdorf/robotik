let Gpio = require('pigpio').Gpio;

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

module.exports.Motor = Motor