let Gpio = require('pigpio').Gpio;

class Servo {
    constructor(conf) {
        if (typeof conf == "undefined") {
            console.log("Servo ohne conf initialisiert. {pin:pin} ist notwendig");
            return false;
        }
        this.pin = conf.pin;
        this.gpioServo = new Gpio(conf.pin, {mode: Gpio.OUTPUT});

        this.position = conf.position || 0.5;
        this.destination = 0.5;
        this.intervalTimer = false;
        this.delta = 0.1;
        this.speed = 0;


        // Der HiTec HS53geht von 600 bis 2350
        // Das heißt er fährt über 1700 und schafft dabei 180°
        this.minPulse = conf.minPulse || 600;
        this.maxPulse = conf.maxPulse || 2350;
        this.reverse = conf.reverse;
        this.pulseRange = this.maxPulse - this.minPulse;
    }

    set(direction) {
        // direction ist zwischen 0 und 1,
        // Wie weit das ausschlägt ist vom Servo abhängig.
        // Max Geschwindigkeit
    //    console.log("servo set Direction:", direction, "this.position",this.position, "this.destination",this.destination, "this.speed",this.speed )

        direction = Math.max(direction, 0);
        direction = Math.min(direction, 1);

        this.position = direction;

        let pulseWidth = Math.floor((direction * this.pulseRange) + this.minPulse);
        if (this.reverse) {
            // ich kann die direction nicht reversen, weil dann bei move jedes mal die direction reversed
            // werden würde
            pulseWidth = Math.floor(this.maxPulse - (direction * this.pulseRange));
        }

        this.gpioServo.servoWrite(pulseWidth);
    }

    // anders als Set kann man mit move die Geschwindigkeit angeben
    // Der Speed ist die Anzahl der Schritte für eine volle Bewegung.
    // Es wird in 10ms Zeitinterval die Position justiert. Für eine langsame Bewegung ist speed = 0.002 ok
    // langsamer wird es hakelig

    move({direction, speed}) {

        if (speed == 0) {
            this.stop();
            return;
        } else {
            this.speed = speed;
        }

        if (direction == this.destination) {
            this.stop();
            return;
        }

        this.destination = direction;

        var that = this;
        this.intervalTimer = setInterval(that.repeat.bind(this), 10);
    }

    repeat() {
        if (this.speed == 0) {
         //   console.log("repeat speed 0");
            this.stop();
            return;
        }

        if (this.position < this.destination) {
            this.set(this.position + this.speed);
        }
        if (this.position > this.destination) {
            this.set(this.position - this.speed);
        }


        // Endlose Oszilation verhindern
        if (Math.abs(this.position - this.destination) < this.speed) {
         this.stop();
        }
    }

    stop() {
        clearInterval(this.intervalTimer);
        this.intervalTimer = false;
        this.destination = this.position;
        this.speed = 0;
    }
}

module.exports.Servo = Servo;