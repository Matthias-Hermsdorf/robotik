$(function () {

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
            e.preventDefault();
            e = e.originalEvent;
            isDriving = true;
            $indikator.fadeIn().css({top:e.pageY, left: e.pageX});
            startPoint.x = e.screenX;
            startPoint.y = e.screenY;
        })
        .on("pointermove", function (e) {
            e.preventDefault();
            e=e.originalEvent;
            if (!isDriving) return;

            const distanceY = startPoint.y - e.screenY;
            let distanceX = startPoint.x - e.screenX;
            const drehungsdaempfung= 0.5;
            distanceX = distanceX*drehungsdaempfung;
            const distance = Math.sqrt((distanceX*distanceX)+(distanceY*distanceY));
            const speed = (Math.min(distance, maxDistance))/ maxDistance;
            const direction = Math.PI - Math.atan2(distanceY, distanceX);
            socket.emit("drive", {direction: direction, speed: speed});

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