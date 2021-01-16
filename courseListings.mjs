//Copy paste this code into Inspect Element --> Console on Infinite Campus once logged in
//Downloads data.json file containing courses, teachers, semesters, and periods
async function main() {
	minSectionID = 58197
	maxSectionID = 59116

	function exportToJsonFile(jsonData) {
		let dataStr = JSON.stringify(jsonData);
		let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

		let exportFileDefaultName = 'data.json';

		let linkElement = document.createElement('a');
		linkElement.setAttribute('href', dataUri);
		linkElement.setAttribute('download', exportFileDefaultName);
		linkElement.click();
	}
	let classes = new Map()

	for(var sectionID = minSectionID; sectionID <= maxSectionID; sectionID++) { 
		await fetch(
	     `/campus/resources/portal/section/${sectionID}?_expand=course-school&_expand=terms&_expand=periods-periodSchedule&_expand=teacherPreference&_expand=room&_expand=teachers`,       
		{
	        headers: 
			{
	          'Accept': 'application/json, text/plain, */*',
	          'Cache-Control': 'no-cache'
	        }
	    })
		.then(r => r.json())
		.then(data => {
			course = data.courseName
			period = data.periods[0].name

			if(data.terms.length == 2)
			{
				sem = 'S1S2'
			}
			else
			{
				sem = data.terms[0].termName
			}

			teacher = ","
			if(data.teachers.length > 0)
			{
				teacher = data.teachers[0].lastName + ', ' + data.teachers[0].firstName
			}

			mapKey = course + ' / ' + sem + ' / ' + teacher
			
			if(classes.has(mapKey)) 
			{
				currentPeriods = classes.get(mapKey).periods
				currentPeriods.push(period)
				classes.set(mapKey, {periods: currentPeriods})
			}
			else {
				classes.set(mapKey, {periods: [period]})
			}
		})
	}

	classesArray = []
	for(let [key, value] of classes) {
		classesArray.push({name: key, periods: value.periods})
	}

	exportToJsonFile(classesArray)
	console.log(classes)
}