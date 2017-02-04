$(function () {
    var gn = new GyroNorm();

    let lastDirection = 0;

    gn.init({frequency: 50, screenAdjusted: true, decimalCount: 1}).then(function () {
        gn.start(function (data) {
            y = (Math.floor(data.dm.gy * 10))/10;
            if (y != lastDirection) {
                lastDirection = y;
                let yNormalized = Math.floor((y + 10) * 5)/100;

                //socket.emit("camera", {vertical: yNormalized});
                $(window).trigger({type:"camera", vertical: yNormalized, speed: 0.5});
            }

        });
    }).catch(function (e) {
        log("no gyro");
    });

    $(window).on("camera", function (e) {
        lastDirection = e.vertical;
    });

});

function log(msg) {
    $("#log").prepend(msg+"<br>");
}