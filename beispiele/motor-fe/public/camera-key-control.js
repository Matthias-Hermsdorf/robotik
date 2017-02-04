$(function () {

    let keyCodes = {
        down: 40,
        up: 38
    };

    let position = {
        vertical: 0.3
    };

    let stepWidth = 0.01;

    $(document).on("keydown", function (e) {

        if (e.keyCode == keyCodes.down) {
            $(window).trigger({type:"camera", vertical: position.vertical-stepWidth, speed: 0.5});
        }

        if (e.keyCode == keyCodes.up) {
            $(window).trigger({type:"camera", vertical: position.vertical+stepWidth, speed: 0.5});
        }
    });

    $(window).on("camera", function (e) {
        position.vertical = e.vertical;
    });
});
