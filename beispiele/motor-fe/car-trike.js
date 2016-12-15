var Motor = require("./motor").Motor;
var motor1 = new Motor({forward: 14, backward: 15 });
var motor2 = new Motor({forward: 20, backward: 21 });

function drive (conf) {
    //conf.direction;
    //conf.speed;

    if (conf.speed != 0) {
        let speeds = getMotorSpeeds(conf.speed, conf.direction);

        console.log('is driving', speeds.motor1, speeds.motor2);
        if (speeds.motor1) {
            motor2.drive(-speeds.motor1);
        }
        if (speeds.motor2) {
            motor1.drive(-speeds.motor2);
        }
    } else {
        console.log('break');
        motor1.drive(0);
        motor2.drive(0);
    }

}

function getMotorSpeeds (speed, direction) {
    let motor1 = 0;
    let motor2 = 0;

    // Dämpfung
    let directionDaempfung = 0.1;
    if (Math.abs(direction) < directionDaempfung) { direction = 0; }
    if (direction > directionDaempfung) { direction = direction - directionDaempfung;}
    if (direction < -directionDaempfung) { direction = direction + directionDaempfung;}


    if (direction > 0) {
        motor1 = speed;
        motor2 = speed - direction;
        if (motor1 < -speed) motor1 = -speed;
        if (motor1 > speed) motor1 = speed;

        if (motor2 < -speed) motor2 = -speed;
        if (motor2 > speed) motor2 = speed;
    }
    if (direction < 0) {
        motor1 = speed + direction;
        motor2 = speed;
        if (motor2 < -speed) motor2 = -speed;
        if (motor2 > speed) motor2 = speed;

        if (motor1 < -speed) motor1 = -speed;
        if (motor1 > speed) motor1 = speed;
    }

    if (direction == 0) {
        motor1 = speed;
        motor2 = speed;
    }

    // Stromkorrektur weil unter 40% nichts fährt

    if (motor1 != 0) {
        if (motor1 > 0) {
            motor1 = (motor1 * 0.6) + 0.4;
        } else {
            motor1 = (motor1 * 0.6) - 0.4;
        }
    }
    if (motor2 != 0) {
        if (motor2 > 0) {
            motor2 = (motor2 * 0.6) + 0.4;
        } else {
            motor2 = (motor2 * 0.6) - 0.4;
        }
    }


    return {motor1: motor1, motor2: motor2}
}

module.exports.drive = drive;
