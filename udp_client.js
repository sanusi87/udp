var dgram = require('dgram');

var socket = dgram.createSocket('udp4');

var i = 0;
setInterval(function(){
	if( i == 3 ){
		var message = new Buffer("STOP");
	}else{
		var message = new Buffer("SND");
	}
	
	socket.send(message, 0, message.length, 10000, 'localhost', function(err){
		console.log('client send err');
		console.log(err);
	});
	i++;
}, 4000);

socket.on('message', function(msg, info){
	console.log(msg.toString());
	console.log(info);
});

socket.on('close', function(){
	console.log('socket closed.');
});

socket.on('error', function(err){
	console.log('socket err');
	console.log(err);
});