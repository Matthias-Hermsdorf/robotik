$(function () {

    let socket = io(location.host);
    console.log("socket", socket);
    socket.emit("drive", "msg");
    let isDriving = false;
    let lastDistance = 0;
    let lastDirection = 0;
    // maximale Touchentfernung vom Startpunkt, für die volle Geschwindigkeit
    let maxDistance = 200;

    let ScreenMin = Math.min($(window).width(),$(window).height());
    maxDistance = Math.min(200, ScreenMin/3);

    let startPoint = {
        x: 0,
        y: 0
    };


    var $indikator = $(".pointer-indikator");

    $("[data-control-input]")
        .on("pointerdown", function (e) {
            console.log(e);
            e.preventDefault();
            e = e.originalEvent;
            console.log("start");
            isDriving = true;
            $indikator.fadeIn().css({top:e.pageY, left: e.pageX});
            startPoint.x = e.screenX;
            startPoint.y = e.screenY;

        })
        .on("pointermove", function (e) {
            e.preventDefault();
            e=e.originalEvent;
            if (!isDriving) return;

            let distance = startPoint.y - e.screenY;
            let direction = e.screenX - startPoint.x;
            if (distance > maxDistance) distance = maxDistance;
            if (distance <  -maxDistance) distance = -maxDistance;

            if (direction > maxDistance) direction = maxDistance;
            if (direction <  -maxDistance) direction = -maxDistance;

            let distanceDelta = (distance - lastDistance);
            let directionDelta = (direction - lastDirection);

            if (Math.abs(distanceDelta) > 15 || Math.abs(directionDelta) ) {

                console.log("move direction",direction/maxDistance,"speed",distance/maxDistance);
                socket.emit("drive", {direction: direction/maxDistance, speed: distance/maxDistance});
                lastDistance = distance;
                lastDirection = direction;
            }
        })
        .on("pointerup", function (e) {
            e.preventDefault();
            stop();

        });

    $(window).on("blur", function () {
        stop();
    });

    function stop(){
        isDriving = false;
        lastDirection = 0;
        lastSpeed = 0;
        $indikator.fadeOut();
        socket.emit("drive", {direction: 0, speed: 0});
    }
});