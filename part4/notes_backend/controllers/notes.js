const notesRouter = require("express").Router()
const Note = require("../models/note")

notesRouter.get("/", (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

notesRouter.get("/:id", (request, response, next) => {
    Note.findById(request.params.id).then(retrievedNote => {
        if(retrievedNote) {
            response.json(retrievedNote)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

notesRouter.delete("/:id", (request, response, next) => {
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

notesRouter.post("/", (request, response, next) => {
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

notesRouter.put("/:id", (request, response, next) => {
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
        { new: true, runValidators: true, context: "query" }) //new: true is to get the updated Note, and not the OG.
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = {
    notesRouter
}