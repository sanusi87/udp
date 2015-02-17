var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var port = process.argv[2].replace( /^port=/g, '' );
// var userSocket = process.argv[3].replace( /^socket=/g, '' );
var address = process.argv[3].replace( /^address=/g, '' );

// socket.bind(10000, function(){
	//socket.address().address | port
// });

socket.bind({
	port: port,
	address: address
});

/**
	message == buffer
	remoteInfo == object, sender address info
*/
socket.on('message', function(message, remoteInfo){
	var msg = message.toString();
	console.log(msg);
	console.log(remoteInfo);
	
	if( msg == 'STOP' ){
		console.log('closing socket...');
		socket.close();
	}else{
		var newMessage = new Buffer("RCV");
		socket.send(newMessage, 0, newMessage.length, remoteInfo.port, remoteInfo.address, function(err){
			console.log('server send err');
			console.log(err);
		});
	}
});

socket.on('close', function(){
	console.log('socket closed.');
});

socket.on('error', function(err){
	console.log('socket err');
	console.log(err);
});

//socket.close();