var Led = require("./led").Led;

var pins = {
    // Pi 2
    front: 27
};

if ((process.argv.indexOf("oldpi") > -1)) {
    pins = {
        //Pi 1B
        front: 22
    }
}

var frontLight = new Led(pins.front);

function lightFront (val) {
    frontLight.setLight(val);

}

module.exports.lightFront = lightFront;
