var http = require('http')
var mysql = require('mysql')
var socketio = require('socket.io')
var rando = require('random-number-in-range')
var DbAccess = require('./db-access')
var shouldRun = require('./should-run')
var config = require('./config')

function noop() {}

var MS_IN_A_MINUTE = 1000 * 60

function getWork() {
	var workTypeIndex = rando(0, config.work.length)
	var work = config.work[workTypeIndex]
	return {
		workTypeName: work.type,
		repName: work.repName || 'reps',
		reps: rando(work.min, work.max + 1)
	}
}

function getNextInterval() {
	return rando(config.intervalMinutes.min, config.intervalMinutes.max + 1)
}

module.exports = function makeServer() {
	var pool = mysql.createPool(config.db)

	var dbAccess = DbAccess(pool)

	var server = http.createServer()

	var io = socketio(server)

	io.on('connection', function(socket) {
		socketHandler(dbAccess, socket)
	})

	function broadcastWork() {
		io.emit('work', getWork())
	}

	function worker() {
		if (shouldRun(new Date(), config.runTime.startHour, config.runTime.endHour)) {
			broadcastWork()
		}
		scheduleNextWork()
	}

	function scheduleNextWork() {
		var minutes = getNextInterval()
		setTimeout(worker, minutes * MS_IN_A_MINUTE)
	}

	scheduleNextWork()

	return server
}

function socketHandler(dbAccess, socket) {
	socket.join('work people did')

	socket.on('work done', function(workReport, cb) {
		if (typeof cb !== 'function') {
			cb = noop
		}
		if (isValidWorkReport(workReport)) {
			socket.to('work people did').emit('somebody did work', workReport)
			dbAccess.saveWorkDone(workReport).then(function() {
				cb()
			}).catch(function(err) {
				cb(err && err.message)
				console.error(err && err.message)
			})
		} else {
			cb('That input is invalid')
		}
	})
}

function isValidWorkReport(workReport) {
	return typeof workReport.workTypeName === 'string' && typeof workReport.personName === 'string' && typeof workReport.reps === 'number'
}
