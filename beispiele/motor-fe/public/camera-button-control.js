$(function () {


    let position = {
        vertical: 0.3
    };

    let stepWidth = 0.1;

    $("[data-camera-vertical=up]").on("click", function (e) {
        $(window).trigger({type:"camera", vertical: (position.vertical+stepWidth), speed: 0.5});
    });

    $("[data-camera-vertical=down]").on("click", function (e) {
        $(window).trigger({type:"camera", vertical: (position.vertical-stepWidth), speed: 0.5});
    });

    $(window).on("camera", function (e) {
        position.vertical = e.vertical;
    });

});
