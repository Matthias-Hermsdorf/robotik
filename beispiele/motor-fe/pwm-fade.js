// Fade fadet ein oder aus.
// FadeIn und FadeOut setzen die Ausgangsconfig entsprechend. Es könnte aber auch eine usergesetzte Config verwendet werden.
// Fadein ruft über 200ms in 20ms Abständen eine Callbackfunktion auf und über gibt ihr in currentVal den Wert des Zwischenschritts
// Um doppelte Aufrufe auf den selben Pin muss sich der Aufrufer kümmern.
// Es kann ein "complete" Callback übergeben werden, das am Ende aufgerufen wird.
//
function fade(conf) {
    'use strict';

    conf = conf || {};
    if (!conf.callback) {
        console.error("fade needs a callback function");
        return
    }
    conf.startVal = conf.startVal || 0;

    if (typeof conf.endVal == "undefined") {
        conf.endVal = 1;
    }

    conf.duration = conf.duration || 200;
    conf.stepDuration = conf.stepDuration || 20;
    conf.currentVal = conf.startVal;

    let steps = conf.duration / conf.stepDuration;
    let stepDistance = (conf.endVal - conf.startVal) / steps;
    let stepsToDo = steps;

    let interval = setInterval(function () {
        if (stepsToDo == 1) {
            clearInterval(interval);
            conf.currentVal = conf.endVal;
            if (typeof conf.callback == "function") { conf.callback(conf); }
            if (typeof conf.complete == "function") { conf.complete(conf); }
        } else {
            stepsToDo -= 1;
            conf.currentVal+= stepDistance;
            if (typeof conf.callback == "function") { conf.callback(conf); }
        }
    }, conf.stepDuration);
}

function fadeIn(conf) {
    conf = conf || {};
    conf.startVal = conf.startVal || 0;
    conf.endVal = conf.endVal || 1;
    fade(conf);
}

function fadeOut(conf) {
    conf = conf || {};
    conf.startVal = conf.startVal || 1;
    conf.endVal = conf.endVal || 0;
    fade(conf);
}

module.exports.fadeIn = fadeIn;
module.exports.fadeOut = fadeOut;
module.exports.fade = fade;
