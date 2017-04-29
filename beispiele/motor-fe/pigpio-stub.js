class Gpio {
    constructor(pin,options) {
        this.pin = pin;
        this.options = options;
    }

    servoWrite(...args) {
        console.log("Gpio Stub servoWrite pin:"+this.pin,args)
    }
    digitalWrite(...args) {
        console.log("Gpio Stub digitalWrite pin:"+this.pin,args)
    }
    pwmWrite(...args) {
        console.log("Gpio Stub pwmWrite pin:"+this.pin,args)
    }
}

module.exports.Gpio = Gpio;