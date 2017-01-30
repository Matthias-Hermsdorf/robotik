$(function () {

    let $infoField = $("[data-info-camera-vertical]");

    let keyCodes = {
        down: 40,
        up: 38
    };

    let position = {
        vertical: 0.5
    };

    let stepWidth = 0.01;

    $(document).on("keydown", function (e) {

        if (e.keyCode == keyCodes.down && position.vertical > 0) {
            moveDown();
        }

        if (e.keyCode == keyCodes.up && position.vertical < 1) {
            moveUp();
        }
    });

    function moveUp() {
        position.vertical = Math.min(position.vertical + stepWidth, 1);
        emit();
    }

    function moveDown() {
        position.vertical = Math.max(position.vertical - stepWidth, 0);
        emit();
    }

    function emit() {
        socket.emit("camera", {vertical: position.vertical});
        console.log("moving vertical", position.vertical);
        $infoField.text("y:" + position.vertical);
    }

});
