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
    } else if (error.name === "ValidationError") {
        return response.status(400).json({error: error.message})
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
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            if(result === null) {
                response.status(404).end()
            } else {
                response.status(204).end()
            }
            
        })
        .catch(error => next(error))
})

app.post("/api/notes", (request, response) => {
    const body = request.body
    if (body.content === undefined) { //undefined and null are both falsey
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
    .catch(error => next(error))
})

app.put("/api/notes/:id", (request, response) => {
    const body = request.body

    /* Apparently they don't do this?
    const note = new Note({
        content: body.content,
        important: body.important || false
    }) */
    
    const note = {
        content: body.content,
        important: body.important
    }
    //A new way:
    //const {content, important} = request.body

    Note.findByIdAndUpdate(
        request.params.id, 
        note,
        //{content, important} //from "A new way"
        {new: true, runValidators: true, context: 'query'}) //new: true is to get the updated Note, and not the OG.
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
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