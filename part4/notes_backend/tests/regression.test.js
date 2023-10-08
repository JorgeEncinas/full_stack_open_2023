const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const Note = require("../models/note")

beforeEach( async () => {
    await Note.deleteMany({})
    console.log("cleared")
    /* BAD SOLUTION: Creates an async process per noteObject
    helper.initialNotes.forEach( async (note) => {
        let noteObject = new Note(note)
        await noteObject.save()
        console.log("saved")
    }) */
    /* SITUATIONAL SOLUTION
    const noteObjects = helper.initialNotes
        .map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray) */
    //you can use const result = await Promise.all() to get an array with the resolved values for each promise
    //But executes promises it receives in parallel, so if a particular order is needed, it will be a problem.
    /*
    for (let note of helper.initialNotes) {
        let noteObject = new Note(note)
        await noteObject.save()
    } */
    await Note.insertMany(helper.initialNotes)
    console.log("done")
})

afterAll(async () => {
    await mongoose.connection.close()
})

describe("When there is initially some notes saved", () => {
    test("notes are returned as json", async () => {
        console.log("entered test")
        await api
            .get("/api/notes")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    }, 100000)

    test("all notes are returned", async () => {
        const response = await api.get("/api/notes")
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })

    test("a specific note is within the returned notes", async () => {
        const response = await api.get("/api/notes")

        const contents = response.body.map(r => r.content)
        expect(contents).toContain(
            "Browser can execute only JavaScript"
        )
    })
})

describe("viewing a specific note", () => {
    test("a specific note can be viewed", async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToView = notesAtStart[0]

        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect (resultNote.body).toEqual(noteToView)
    })
})

describe("addition of a new note", () => {
    test("a valid note can be added", async () => {
        const newNote = {
            content: "async/await simplifies making async calls",
            important: true,
        }

        await api
            .post("/api/notes")
            .send(newNote)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const notesAtEnd = await helper.notesInDb()//api.get("/api/notes/")
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

        const contents = notesAtEnd.map(n => n.content)
        expect(contents).toContain(
            "async/await simplifies making async calls"
        )
    })

    test("note without content is not added", async () => {
        const newNote = {
            important: true
        }

        await api
            .post("/api/notes")
            .send(newNote)
            .expect(400)

        const notesAtEnd = await helper.notesInDb() //api.get("/api/notes")
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})

describe("deletion of a note", () => {
    test("a note can be deleted", async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

        const notesAtEnd = await helper.notesInDb()

        expect(notesAtEnd).toHaveLength(
            helper.initialNotes.length - 1
        )

        const contents = notesAtEnd.map(r => r.content)

        expect(contents).not.toContain(noteToDelete.content)
    })
})