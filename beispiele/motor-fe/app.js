var staticCache = require('koa-static-cache');
var koa = require('koa.io');
var path = require('path');
var fs = require('fs');
var app = koa();
var Motor = require("./motor").Motor;

var motor1 = new Motor({forward: 14, backward: 15 });
var motor2 = new Motor({forward: 20, backward: 21 });

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
    //var data = JSON.parse(this.data[0]);
    console.log('is driving', this.data[0].motor1, this.data[0].motor2);
    if (this.data[0].motor1) {
        motor2.drive(-this.data[0].motor1);
    }
    if (this.data[0].motor2) {
        motor1.drive(-this.data[0].motor2);
    }


});

console.log("listening on :80")
app.listen(80);

