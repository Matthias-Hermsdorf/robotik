$(function () {

    let keyCodes = {
        down: 40,
        up: 38
    };

    let position = {
        vertical: 0.5
    };

    let stepWidth = 0.02;

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

        socket.emit("camera", {vertical: position.vertical});
        console.log("movingUp",position.vertical);
    }

    function moveDown() {

        position.vertical = Math.max(position.vertical - stepWidth, 0);

        socket.emit("camera", {vertical: position.vertical});
        console.log("moveDown vertical", position.vertical);
    }


});
