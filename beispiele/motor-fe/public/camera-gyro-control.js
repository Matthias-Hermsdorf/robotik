$(function () {
    var gn = new GyroNorm();

    let lastDirection = 0;
    let $infoField = $("[data-info-camera-vertical]");


    gn.init({frequency: 50, screenAdjusted: true, decimalCount: 1}).then(function () {
        gn.start(function (data) {
            y = (Math.floor(data.dm.gy * 10))/10;
            if (y != lastDirection) {
                lastDirection = y;

                let yNormalized = Math.floor((y + 10) * 5)/100;

                socket.emit("camera", {vertical: yNormalized});
                $infoField.text("y:"+yNormalized);
            }

        });
    }).catch(function (e) {
        log("no gyro");
    });

});

function log(msg) {
    $("#log").prepend(msg+"<br>");
}