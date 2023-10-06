const notesRouter = require("express").Router()
const Note = require("../models/note")

notesRouter.get("/", async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
})

notesRouter.get("/:id", async (request, response, next) => {
    try {
        const note = await Note.findById(request.params.id)
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    } catch(exception) {
        next(exception)
    }
})

notesRouter.delete("/:id", async (request, response, next) => {
    const query = await Note.findByIdAndRemove(request.params.id)
    const removedDoc = await query.exec()
    if(removedDoc) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

notesRouter.post("/", async (request, response, next) => {
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

    try {
        const savedNote = await note.save()
        response.status(201).json(savedNote)
    } catch(exception) {
        next(exception)
    }
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

module.exports = notesRouter