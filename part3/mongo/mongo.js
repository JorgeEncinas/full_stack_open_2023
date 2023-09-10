const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log("give password as argument")
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://chadmine:${password}@fsocluster.oe3mfsm.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model("Note", noteSchema);

/*
const note2 = new Note({
    content: "This is actually note 2",
    important: false,
}) */
/*
note2.save().then(result => {
    console.log("note 2 saved!")
    mongoose.connection.close()
})*/

Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})