const notesRouter = require("express").Router()
const Note = require("../models/note")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const getTokenFrom = request => {
    const authorization = request.get("authorization")
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "")
    }
    return null
}

notesRouter.get("/", async (request, response) => {
    const notes = await Note.find({})
        .populate("user",
        {
            username: 1,
            name: 1
        })
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
    const rawDocument = await Note.findByIdAndRemove(request.params.id)
    if(rawDocument) {
        const parsedNote = new Note(rawDocument)
        if (parsedNote.id === request.params.id) response.status(204).end()
        else response.status(500).end()
        //response.status(204).end()
    } else {
        response.status(404).end()
    }
})

notesRouter.post("/", async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(
        getTokenFrom(request),
        process.env.SECRET
    )
    if (!decodedToken.id) {
        return response.status(401)
            .json({
                error: "Token invalid"
            })
    }
    if (body.content === undefined) { //undefined and null are both falsey
        return response.status(400).json({
            error: "'content' property is missing"
        })
    }
    const user = await User.findById(decodedToken.id)
    const note = new Note({
        content: body.content,
        important: body.important || false,
        user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
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