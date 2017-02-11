$(function () {
    var gn = new GyroNorm();

    let lastDirection = 0;

    gn.init({frequency: 200, screenAdjusted: true, decimalCount: 1}).then(function () {
        gn.start(function (data) {
            // auch wenn ich hier eine Config übergebe, scheint sie nicht zu funktionieren
            // Ich muss selber auf 1 Nachkmmastelle runden.
            // Und das Screen Adjustet funktioniert auch niht
            y = (Math.floor(data.dm.gy * 10))/10;
            if (y != lastDirection) {
                lastDirection = y;
                // Der Wert kommen zwischen -10 bis 10 an. Aber die Kamera bekommt einen Wert zwischen 0 und 1
                let yNormalized = 1- Math.floor((y + 10) * 5)/100;

                $(window).trigger({type:"camera", vertical: yNormalized, speed: 0.01});
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