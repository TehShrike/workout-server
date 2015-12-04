var makeServer = require('./index')
var socketIoClient = require('socket.io-client')

makeServer().listen(9090)

var socket = socketIoClient('http://localhost:9090')

socket.on('work', function(work) {
	console.log('got to do work:', work)

	var name = 'Bob'

	socket.emit('work done', {
		workTypeName: work.workTypeName,
		reps: work.reps,
		personName: name
	}, function(err) {
		console.log('completed report:', err)
	})
})
