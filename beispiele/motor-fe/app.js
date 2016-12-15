var staticCache = require('koa-static-cache');
var koa = require('koa.io');
var path = require('path');
var fs = require('fs');
var app = koa();
var carTrike = require('./car-trike');
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
    yield* next;
    // on disconnect
});

// when the client emits 'typing', we broadcast it to others
app.io.route('drive', function* () {
    carTrike.drive(this.data[0])
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
app.io.route('quit-server', function* () {
    process.exit()
});

console.log("listening on :80")
app.listen(80);

