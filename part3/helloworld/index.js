const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]

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
    response.json(notes)
})

app.get("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => {
        //console.log(note.id, typeof note.id, id, typeof id, note.id === id)
        return note.id === id
    })
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
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
    const note = {
        id: generateId(),
        content: body.content,
        important: body.important || false
    }

    notes = notes.concat(note)
    response.json(note)
})

const unknownEndPoint = (request, response) => {
    response.status(404).send({
        error: "Unknown endpoint"
    })
}
app.use(unknownEndPoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})