$(function () {
    let socket = io(location.host);
    console.log("socket", socket);
    //socket.emit("drive", "msg");
    $("[data-reboot]").on("click", function () {
        socket.emit("reboot","");
    })

    $("[data-shutdown]").on("click", function () {
        socket.emit("shutdown","");
    })

    $("[data-quit-server]").on("click", function () {
        socket.emit("quit-server","");
    })

});