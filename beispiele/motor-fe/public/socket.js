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
        console.log("on disconnect");
        $(".area-reload").addClass("visible");
    });

    socket.on('connect', function () {
        console.log("on connect");
        $(".area-reload").removeClass("visible");
    });


});

let socket;
