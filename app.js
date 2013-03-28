var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , dgram = require('dgram')
    , udpSocket = dgram.createSocket('udp4');

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});
    
server.listen(8080);

udpSocket.on('listening', function() {
    var addr = udpSocket.address();
    console.log('server listening ' + addr.address + ':' + addr.port);
});

udpSocket.bind(54000);

io.sockets.on('connection', function(socket) {
    console.log('socket connection!');
    udpSocket.on('message', function(msg, rinfo) {
        console.log('server got: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);
        socket.emit('message', { message: msg + ' from ' + rinfo.address + ':' + rinfo.port });
    });
});