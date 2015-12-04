var UTC_OFFSET = 6

module.exports = {
	work: [{
		type: 'pushups',
		min: 5,
		max: 15
	}, {
		type: 'burpees',
		min: 4,
		max: 12
	}, {
		type: 'crunches',
		min: 7,
		max: 30
	}, {
		type: 'flutter kicks',
		repName: 'seconds',
		min: 20,
		max: 50
	}, {
		type: 'planks',
		repName: 'seconds',
		min: 15,
		max: 45
	}, {
		type: 'wall sit',
		repName: 'seconds',
		min: 20,
		max: 50
	}, {
		type: 'calf raises',
		min: 10,
		max: 35
	}],
	intervalMinutes: {
		min: 45,
		max: 100
	},
	runTime: {
		startHour: (9 + UTC_OFFSET) % 24,
		endHour: (17 + UTC_OFFSET) % 24
	},
	db: {
		host: process.env.DB_HOST || '127.0.0.1',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASS || '',
		database: 'workout_server',
		typeCast: function(field, next) {
			if (field.type === 'BIT' && field.length === 1) {
				return !!field.buffer()[0]
			}
			return next()
		}
	}
}
