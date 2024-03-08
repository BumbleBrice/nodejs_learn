const fs = require('fs').promises;

async function readStudentsFile(filePath) {
	try {
		const data = await fs.readFile(filePath, "utf8");
		return data.split(/\r?\n/).filter(data => data !== "")
	} catch (err) {
		console.error(err);
		return []
	}
}

async function parseStudentsData(students) {
	const parsedStudents = []
	for (const line of students) {
		const [note, name, address] = line.split(" ")
		if(name != "Name") {
			parsedStudents.push({name, note, address})
		}
	}
	return parsedStudents
}

async function sortByNoteDescending(students) {
	return students.sort((s1, s2) => s2.note - s1.note)
}

async function findBestNote(students) {
	let bestNote = 0
	for(const line of students) {
		const notes = line.split(" ").filter(note => !isNaN(note))
		for(const note of notes) {
			if(note > bestNote) {
				bestNote = parseInt(note)
			}
		}
	}
	return bestNote
}

async function filterStudentsByNotes(students, bestNote) {
	const filteredStudents = []
	for (const line of students) {
		const notes = line.split(" ").filter(note => !isNaN(note))
		for (const note of notes) {
			if (note > bestNote) {
				filteredStudents.push(note)
			}
		}
	}
	return filteredStudents
}

async function appendStudentsToFile(filePath, students) {
	try {
		for (const student of students) {
			await fs.appendFile(filePath, `\n${student.note} ${student.name} ${student.address}`)
		}

		const data = await fs.readFile(filePath, "utf8")
		const lines = data.split(/\r?\n/).filter(line => line !== "")
		let str = ""
		for (const line of lines) {
			const [note, name, address] = line.split(" ")
			str += `${note} ${ name.toUpperCase()} ${address}\n`
		}
		await fs.writeFile(filePath, str)
	} catch (err) {
		console.error(err)
	}
}

(async ()=> {
	const studentsFilePath = "Data/students.txt";

  const studentsData = await readStudentsFile(studentsFilePath);

  const parsedStudents = await parseStudentsData(studentsData);
	console.log(parsedStudents)

	const sortedStudents = await sortByNoteDescending(parsedStudents)
	console.log(sortedStudents)

	const bestNote = await findBestNote(studentsData)
	console.log("Best note : ", bestNote)

	const mortThan17 = await filterStudentsByNotes(studentsData, 17)
	console.log(mortThan17)

	const additionalStudents = [
		{note: 18, name: "Sonia", address: "Paris"},
		{note: 17, name: "Clasrisse", address: "Marseille"}
		]
	await appendStudentsToFile(studentsFilePath, additionalStudents)

})()