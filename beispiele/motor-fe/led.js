let Gpio;
if ((process.argv.indexOf("stub") > -1)) {
    Gpio = require('./pigpio-stub').Gpio;
} else {
    Gpio = require('pigpio').Gpio;
}

class Led {
    constructor(pin) {
        this.gpioPin = new Gpio(pin , {mode: Gpio.OUTPUT});
        this.gpioPin.digitalWrite(false);

    }

    setLight(val) {
        if (val == "undefinded") { val = 0;}
        if (val > 1) { val = 1;}
        val = Math.floor(val*255);

        if (val == 0) {
            this.gpioPin.digitalWrite(false);
        } else {
            this.gpioPin.pwmWrite(val);
        }
    }
}

module.exports.Led = Led;