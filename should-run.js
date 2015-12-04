module.exports = function(date, startHour, endHour) {
	var hour = date.getUTCHours()
	var endIsBeforeStart = endHour < startHour

	if (endIsBeforeStart) {
		return hour < endHour || hour >= startHour
	} else {
		return hour >= startHour && hour < endHour
	}
}
