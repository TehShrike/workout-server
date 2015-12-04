var test = require('tape')
var shouldRun = require('./should-run')

test('shouldRun function early in the UTC day', function(t) {
	var date = new Date('Thu Dec 03 2015 04:00:50 GMT-0000 (UTC)')

	t.ok(shouldRun(date, 4, 20), '1-20')
	t.ok(shouldRun(date, 0, 6), '10-21')
	t.ok(shouldRun(date, 3, 2), '3-2')
	t.notOk(shouldRun(date, 5, 3), '5-3')
	t.notOk(shouldRun(date, 5, 13), '5-13')
	t.notOk(shouldRun(date, 1, 3), '1-3')

	t.end()
})
