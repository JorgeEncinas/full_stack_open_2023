const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

mongoose.set("strictQuery", false)
mongoose.connect(url)
    .then(result => {
        console.log("connected to MongoDB")
    })
    .catch(error => {
        console.log("Error connecting to MongoDB", error.message)
    })

//Also consider the more "universal" "toObject"
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
//const Note = mongoose.model("Note", noteSchema)


module.exports = mongoose.model("Note", noteSchema)
//module.exports = Note