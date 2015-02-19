var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var port = process.argv[2].replace( /^port=/g, '' );
var address = process.argv[3].replace( /^address=/g, '' );

// this type works for all platform
//socket.bind(10000, function(){
//	console.log( socket );
//});

// this type works on windows but not on ubuntu(linux)
//socket.bind({ port: port, address: '127.0.0.1' }, function(){
//	console.log( socket );
//});

// this type works on ubuntu(linux), not yet tested on windows
socket.bind(10000, '127.0.0.1', function(){
	console.log( socket );
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


/* success
{
	domain: null,
	_events: {
		message: [Function],
		close: [Function],
		error: [Function]
	},
	_maxListeners: 10,
	_handle: {
		fd: 9,
		lookup: [Function: lookup4],
		owner: [Circular],
		onmessage: [Function: onMessage]
	},
	_receiving: true,
	_bindState: 2,
	type: 'udp4',
	fd: -42
}

*/