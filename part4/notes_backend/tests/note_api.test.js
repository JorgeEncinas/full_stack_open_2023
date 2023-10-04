const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Note = require("../models/note")

const initialNotes = [
    {
        content: "HTML is easy",
        important: false,
    },
    {
        content: "Browser can execute only JavaScript",
        important: true,
    },
]

beforeEach( async () => {
    await Note.deleteMany({})
    let noteObject = new Note(initialNotes[0])
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
})

test("notes are returned in json", async () => {
    await api
        .get("/api/notes")
        .expect(200)
        .expect("Content-Type", /application\/json/)
}, 100000)

test("all notes are returned", async () => {
    const response = await api.get("/api/notes")

    expect(response.body).toHaveLength(initialNotes.length)
})

test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes")

    const contents = response.body.map(r => r.content)
    expect(contents).toContain(
        "Browser can execute only JavaScript"
    )
})

afterAll(async () => {
    await mongoose.connection.close()
})
/* NOTES: run specific tests through commands
    npm test -- tests/note_api.test.js                                  JUST A FILE
    npm test -- -t "a specific note is within the returned notes"       SPECIFIC NAME OR DESCRIBE BLOCK
    npm test -- -t 'notes'                                              All tests that contain "notes" in their name

    Careful that the Mongoose Connection doesn't stay open if NO TESTS using the connection are run.
    Might be bc supertest primes the connection, but Jest doesn't run "afterAll"
*/