var Tinkerforge = require('tinkerforge');

var HOST = 'localhost';
var PORT = 4223;
var uids = {
    servo: "6CRB6u",
    analogOut: "ipE",
    distance: "w3s"
}

console.log("starting licht");
var ipcon = new Tinkerforge.IPConnection(); // Create IP connection
var ao = new Tinkerforge.BrickletAnalogOut(uids.analogOut, ipcon); // Create device object
var dir = new Tinkerforge.BrickletDistanceIR(uids.distance, ipcon); // Create device object
var servo = new Tinkerforge.BrickServo(uids.servo, ipcon);

ipcon.connect(HOST, PORT,
    function (error) {
        console.log('Error: ' + error);
    }
);

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
    function (connectReason) {

        // Ausschalten der lästigen blauen LED
        servo.disableStatusLED();
        // Mit dem Setzen der Period wird der Eventgenerator aktiviert
        // das wird zwischen Programmläufen vom Bricklet zwischengespeichert, was kan irritierend sein weil das Programm unterschiedlich startet.
        dir.setDistanceCallbackPeriod(100);
    }
);

dir.on(Tinkerforge.BrickletDistanceIR.CALLBACK_DISTANCE, function (distance) {

    // Die Helligkeit soll abhängig von der Entfernung, aber nur im Bereich
    // die der Sensor liefert, gesteuert werden. Der Sensor funktioniert
    // in folgendem Bereich

    var minDistance = 70;
    var maxDistance = 800;
    var distanceRage = maxDistance - minDistance;

    //var distanceLevel = ((distance - minDistance) / distanceRage * 100)

    var distanceLevelInverse = ((maxDistance - distance) / distanceRage * 100);

    setLightLevel(distanceLevelInverse);
});

function setLightLevel(val) {

    // Die Led funktioniert von 2300mV bis 3100mV

    // Mit einem minVoltage von 2100 verhindere ich ein Flackern durch das Rauschen des
    // IR Sesnros
    var minVoltage = 2100;
    // Mit maxVoltage 2800ms wird es nicht so arg hell
    var maxVoltage = 2800;

    var voltageRange = maxVoltage - minVoltage;

    var targetVoltage = 0;
    if (val > 100) {
         val = 100;
    }

    targetVoltage = (((val / 100) * voltageRange) + minVoltage);
    ao.setVoltage(targetVoltage);
}


console.log('Press key to exit');
process.stdin.on('data',
    function (data) {
        ao.setVoltage(0);
        ipcon.disconnect();
        process.exit(0);
    }
);


