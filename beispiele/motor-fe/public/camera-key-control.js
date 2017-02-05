$(function () {

    let keyCodes = {
        down: 40,
        up: 38
    };

    let stepWidth = 0.01;
    let direction = false;

    $(document)
        .on("keydown", function (e) {

            if (e.keyCode == keyCodes.down) {
                if (direction != "down") {
                    $(window).trigger({type: "camera", vertical: 0, speed: 0.005});
                    direction = "down";
                    e.preventDefault()
                }
            }

            if (e.keyCode == keyCodes.up) {
                if (direction != "up") {
                    $(window).trigger({type: "camera", vertical: 1, speed: 0.005});
                    direction = "up";
                    e.preventDefault()
                }
            }
        })
        .on("keyup", function (e) {
            if (direction && (e.keyCode == keyCodes.down || e.keyCode == keyCodes.up)) {
                $(window).trigger({type: "camera", vertical: 0.5, speed: 0});
                direction = false;
                e.preventDefault()
            }
        });
});
