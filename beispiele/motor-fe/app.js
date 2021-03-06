var staticCache = require('koa-static-cache');
var koa = require('koa.io');
var path = require('path');
var fs = require('fs');
var app = koa();
var car = require('./car-trike-drive');
if ((process.argv.indexOf("servo") > -1)) {
    car = require('./car-servo-drive');
} else {
    car = require('./car-trike-drive');
}

var carTrikeLight = require('./car-trike-light');
var turret = require('./turret');
var powerOff = require('power-off');

app.use(staticCache(path.join(__dirname, 'public')));

app.use(function*() {
    this.body = fs.createReadStream(path.join(__dirname, 'public/index.html'));
    this.type = 'html';
});

// middleware for koa
app.use(function*() {
});


// middleware for socket.io's connect and disconnect
app.io.use(function* (next) {
    // on connect
    console.log("connect socket");
    yield* next;
    console.log("close socket");
    // on disconnect
    car.drive({speed:0, direction: 0});
    carTrikeLight.lightFront(0)
});

// when the client emits 'typing', we broadcast it to others
app.io.route('drive', function* () {
    car.drive(this.data[0])
});

// Der Client bewegt die Kamera. Momentan ist sie am Turm fest. Da sie aber auch woanders fest sein kann
// finde ich die Namensgebung sinnvoll
app.io.route('camera', function* () {
    turret.rotate(this.data[0])
});

app.io.route('light-front', function* () {
    console.log("light-front:",this.data[0]);
    carTrikeLight.lightFront(this.data[0])
});

app.io.route('quit-server', function* () {
    process.exit()
});

app.io.route('shutdown', function* () {
    powerOff( function (err, stderr, stdout) {
        if(!err && !stderr) {
            console.log(stdout);
        }
    });
});

app.io.route('reboot', function* () {

});


console.log("listening on :80");
app.listen(80);

