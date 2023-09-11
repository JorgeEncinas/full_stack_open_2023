require("dotenv").config()
const PORT = process.env.PORT || 3001
const express = require("express")
const cors = require("cors")
const Note = require("./models/note")

const app = express()
app.use(express.json())
app.use(cors())

const password = process.argv[2]
console.log(password)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name === "CastError") {
        return response.status(400).send({error: "malformatted id"})
    }

    next(error)
}

//Middleware is a fn that receives 3 parameters
const requestLogger = (request, response, next) => {
    console.log("Method: ", request.method)
    console.log("Path: ", request.path)
    console.log("Body: ", request.body)
    console.log("---")
    next()
}
app.use(requestLogger)

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>")
})

app.get("/api/notes", (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get("/api/notes/:id", (request, response) => {
    Note.findById(request.params.id).then(retrievedNote => {
        if(retrievedNote) {
            response.json(retrievedNote)
        } else {
            response.status(404).end()
        }
        
    })
    .catch(error => next(error))
})

app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note => note.id))
        : 0
    return maxId + 1;
}

app.post("/api/notes", (request, response) => {
    const body = request.body
    if (!body.content) {
        return response.status(400).json({
            error: "'content' property is missing"
        })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

const unknownEndPoint = (request, response) => {
    response.status(404).send({
        error: "Unknown endpoint"
    })
}

app.use(unknownEndPoint)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})