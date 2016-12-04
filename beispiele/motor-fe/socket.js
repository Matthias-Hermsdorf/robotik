module.exports = function(io) {
    let thatSocket;

    io.on('connection', function(socket) {
        console.log("on connection");
        thatSocket = socket;


        socket.on('drive', function (data) {
            console.log("drive", data);
        });
    });



    var emit = function (type, msg) {
        //console.log("emmiting type:"+type+" msg:"+msg);
        io.sockets.emit(type,msg);
    };
};