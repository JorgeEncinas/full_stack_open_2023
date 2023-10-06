const notesRouter = require("express").Router()
const Note = require("../models/note")

notesRouter.get("/", async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
})

notesRouter.get("/:id", async (request, response) => {
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

notesRouter.delete("/:id", async (request, response) => {
    const query = await Note.findByIdAndRemove(request.params.id)
    const removedDoc = await query.exec()
    if(removedDoc) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

notesRouter.post("/", async (request, response) => {
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

    const savedNote = await note.save()
    response.status(201).json(savedNote)
})

notesRouter.put("/:id", async (request, response) => {
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
    const query = await Note.findByAndUpdate(
        request.params.id,
        note,
        { new: true, runValidators: true, context: "query" })
    const updatedNote = await query.exec()
    response.json(updatedNote)
})

module.exports = notesRouter