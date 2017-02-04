$(function () {
    let socket = io(location.host);
    $("[data-reboot]").on("click", function () {
        $(window).trigger("connection-lost");
        socket.emit("reboot","");
    });

    $("[data-shutdown]").on("click", function () {
        $(window).trigger("connection-lost");
        socket.emit("shutdown","");
    });

    $("[data-quit-server]").on("click", function () {
        $(window).trigger("connection-lost");
        socket.emit("quit-server","");
    });



});
