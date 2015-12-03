var denodeify = require('then-denodeify')

module.exports = function(db) {
	var query = denodeify(db.query.bind(db))
	var personNamesToIds = {}
	var workTypeNamesToIds = {}

	function getPersonId(name) {
		if (!personNamesToIds[name]) {
			personNamesToIds[name] = getIdOrInsertName(query, 'person', name)
		}

		return personNamesToIds[name]
	}

	function getWorkTypeId(name) {
		if (!workTypeNamesToIds[name]) {
			workTypeNamesToIds[name] = getIdOrInsertName(query, 'work_type', name)
		}

		return workTypeNamesToIds[name]
	}

	function saveWorkDone(workReport) {
		return Promise.all([
			getWorkTypeId(workReport.workTypeName),
			getPersonId(workReport.personName)
		]).then(function(ids) {
			var workTypeId = ids[0]
			var personId = ids[1]

			return query('INSERT INTO work_done SET ?, date_reported = UTC_TIMESTAMP()', {
				person_id: personId,
				work_type_id: workTypeId,
				reps: workReport.reps
			})
		})
	}

	return {
		saveWorkDone: saveWorkDone
	}
}

function getIdOrInsertName(runQuery, table, name) {
	function insert() {
		return runQuery('INSERT INTO ' + table + ' SET ?', { name: name }).then(function(result) {
			return result.insertId
		})
	}

	var sql = 'SELECT ' + table + '_id FROM ' + table + ' WHERE name = ?'

	return runQuery(sql, [name]).then(function(rows) {
		if (rows.length === 0) {
			return insert()
		} else {
			return rows[0][table + '_id']
		}
	})
}
