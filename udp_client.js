var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var port = process.argv[2].replace( /^port=/g, '' );
var address = process.argv[3].replace( /^address=/g, '' );

var i = 0,
intv = setInterval(function(){
	if( i == 3 ){
		var message = new Buffer("STOP");
		clearInterval( intv );
		socket.close();
	}else{
		var message = new Buffer("SND");
	}
	
	console.log( 'sending msg to '+address+':'+port );
	socket.send(message, 0, message.length, port, address, function(err){
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