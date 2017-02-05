$(function () {
    socket = io(location.host);

    $(document).on("visibilitychange", function () {
        console.log("visibilitychange", document.hidden);
        if (document.visibilityState != "visible") {
            socket.close();
        } else {
            socket = io(location.host);
        }
    });

    socket.on('disconnect close', function () {
       $(window).trigger({type:"connection-lost"})
    });

    socket.on('connect', function () {
        $(window).trigger({type:"connection-found"})
    });


    let $infoField = $("[data-info-camera-vertical]");

    $(window).on("camera", function (e) {

        let vertical = Math.min(e.vertical, 1);
        vertical = Math.max(vertical, 0);
        vertical = (Math.round(vertical * 100)) / 100;

        socket.emit("camera",{vertical:vertical,speed:e.speed});
        console.log("moving vertical", vertical, "speed:",e.speed);
        if (e.speed != 0) {
            $infoField.text("y:" + vertical);
        } else {
            $infoField.text("y: stop");
        }
    });


    $(window).on("connection-lost", function () {
        console.log("on disconnect");
        $(".area-reload").addClass("visible");
    });
    $(window).on("connection-found", function () {
        console.log("on connect");
        $(".area-reload").removeClass("visible");
    });


});

let socket;
