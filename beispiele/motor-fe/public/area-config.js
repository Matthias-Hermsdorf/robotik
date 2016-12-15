$(function () {
    let socket = io(location.host);
    console.log("socket", socket);
    //socket.emit("drive", "msg");
    $("[data-reboot]").on("click", function () {
        socket.emit("reboot","");
        die();
    })

    $("[data-shutdown]").on("click", function () {
        socket.emit("shutdown","");
        die();
    })

    $("[data-quit-server]").on("click", function () {
        socket.emit("quit-server","");
        die();
    })

    function die () {
        $("body").addClass("dead");
        $(".area-buttons, .area-control, .area-config").fadeOut();
    }

});
