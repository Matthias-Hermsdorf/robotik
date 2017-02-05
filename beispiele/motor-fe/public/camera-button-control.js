$(function () {

    let isMoving = false;

    $("[data-camera-vertical=up]").on("pointerdown", function (e) {
        $(window).trigger({type: "camera", vertical: 1, speed: 0.005});
        isMoving = true;
    });

    $("[data-camera-vertical=down]").on("touchstart pointerdown", function (e) {
        $(window).trigger({type:"camera", vertical: 0, speed: 0.005});
        isMoving = true;
    });

    $(window).on("touchend pointerup", function (e) {
        if (isMoving) {
            $(window).trigger({type: "camera", vertical: 0.5, speed: 0});
        }
    });
});
