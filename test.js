var mysql = require('mysql')
var DbAccess = require('./db-access')

var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'workout_server',
	typeCast: function(field, next) {
		if (field.type === 'BIT' && field.length === 1) {
			return !!field.buffer()[0]
		}
		return next()
	}
})

var dbAccess = DbAccess(pool)

dbAccess.saveWorkDone({
	personName: 'Somebody',
	workTypeName: 'flutter kicks',
	reps: 12
}).catch(function(err) {
	console.error(err.message)
})

dbAccess.saveWorkDone({
	personName: 'Josh',
	workTypeName: 'flutter kicks',
	reps: 12
}).catch(function(err) {
	console.error(err.message)
})
