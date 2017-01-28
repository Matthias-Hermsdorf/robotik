$(function () {

    $("[data-toggle-config]").on("click", function () {
        $(".area-config, .area-control, .area-buttons .icon-arrows, .area-buttons .icon-gear").toggle();
        $(this).blur()
    });


    var lightsAreOn = false;

    $("[data-toggle-light=dim]").on("click", function () {
        switch (lightsAreOn) {
            case "dim":
                turnOff();
                break;
            case "far":
                turnDim();
                break;
            case false:
                turnDim();
                break;
        }

        $(this).blur()
    });

    $("[data-toggle-light=far]").on("click", function () {
        switch (lightsAreOn) {
            case "dim":
                turnFar();
                break;
            case "far":
                turnOff();
                break;
            case false:
                turnFar();
                break;
        }

        $(this).blur();
    });

    function turnOff() {
        lightsAreOn = false;
        socket.emit("light-front", 0);
        console.log("light-front", 0);
        $("[data-toggle-light]").removeClass("on");
    }

    function turnDim() {
        lightsAreOn = "dim";
        socket.emit("light-front", 0.2);
        $("[data-toggle-light=dim]").addClass("on");
        $("[data-toggle-light=far]").removeClass("on");
    }

    function turnFar() {
        lightsAreOn = "far";
        //socket.emit("light-front", 0.8);
        socket.emit("light-front", 1);
        $("[data-toggle-light=far]").addClass("on");
        $("[data-toggle-light=dim]").removeClass("on");
    }


});

