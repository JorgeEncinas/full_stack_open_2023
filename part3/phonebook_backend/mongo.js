const mongoose = require("mongoose")

if(process.argv.length < 5) {
    console.log("needed password, name, and phone number")
    process.exit(1)
}

const password = process.argv[2]
const newPersonName = process.argv[3]
const newPersonNumber = process.argv[4]

const url = 
`mongodb+srv://chadmine:${password}@fsocluster.oe3mfsm.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model("Person", personSchema)

const newPerson = new Person({
    name: newPersonName,
    number: newPersonNumber
})

newPerson.save().then(result => {
    console.log(``)
})

mongoose.set("strictQuery", false)
mongoose.connect(url)

