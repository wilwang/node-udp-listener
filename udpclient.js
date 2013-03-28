var async = require('async');
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

function sendPacket(udpClient) {
    var now = new Date();
    var msg = new Buffer(Math.random().toString());
   
    udpClient.send(msg, 0, msg.length, 54000, 'localhost', function(err, bytes) {
        if (err) throw err;
        console.log('udp message sent');
    });
}

async.series([
    function(callback) {
        for (var i=0; i<3; i++) {
            sendPacket(client);
        }
        callback(null, 'one');
    },
    function(callback) { 
        client.close(); 
        callback(null, 'two');
    }
]);

