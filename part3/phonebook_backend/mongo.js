const mongoose = require("mongoose")

if(process.argv.length === 5 || process.argv.length === 3) {
	const password = process.argv[2]
	const url = `mongodb+srv://chadmine:${password}@fsocluster.oe3mfsm.mongodb.net/phonebookApp?retryWrites=true&w=majority`
	const personSchema = new mongoose.Schema({
		name: String,
		number: String,
	})
	const Person = mongoose.model("Person", personSchema)
	mongoose.set("strictQuery", false)
	mongoose.connect(url)
	if (process.argv.length === 5) {
		const newPersonName = process.argv[3]
		const newPersonNumber = process.argv[4]
		const newPerson = new Person({
			name: newPersonName,
			number: newPersonNumber
		})
		newPerson.save().then(() => {
			console.log(`${newPersonName} saved with number ${newPersonNumber}`)
			mongoose.connection.close()
		})
	} else {
		Person.find({}).then(persons => {
			console.log("PHONEBOOK:")
			persons.forEach(person => {
				console.log(`${person.name} - ${person.number}`)
			})
			mongoose.connection.close()
		})
	}
} else {
	console.log(`The number of parameters is wrong.
    It must be either just the password,
    Or password, name, and number.
    Order: node mongo.js <passwd> <name> <number>`)
	process.exit(1)
}















