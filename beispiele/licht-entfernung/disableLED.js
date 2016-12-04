var Tinkerforge = require('tinkerforge');

var HOST = 'localhost';
var PORT = 4223;
var uids = {
    servo: "6dJibr",
    analogOut: "ipE",
    distance: "w3s"
}

console.log("starting licht");
var ipcon = new Tinkerforge.IPConnection(); // Create IP connection
var servo = new Tinkerforge.BrickServo(uids.servo, ipcon);

ipcon.connect(HOST, PORT,
    function (error) {
        console.log('Error: ' + error);
    }
);

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
    function (connectReason) {
        servo.disableStatusLED();
    }
);
