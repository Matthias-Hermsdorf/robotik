$(function () {
    let socket = io(location.host);

    $("[data-toggle-config]").on("click", function () {
       $(".area-config, .area-control, .area-buttons .icon-arrows, .area-buttons .icon-gear").toggle();
    });


    var lightsAreOn = false;

    $("[data-toggle-light]").on("click", function () {
        if (lightsAreOn) {
            socket.emit("light-front", 0);
            $(this).removeClass("on");
            lightsAreOn = false;
        } else {
            socket.emit("light-front", 0.6);
            $(this).addClass("on");
            lightsAreOn = true;
        }

    });

    soc = socket;
});

let soc;
