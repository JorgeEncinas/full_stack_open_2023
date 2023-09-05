const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    return response.json(persons)
})

app.get("/info", (request, response) => {
    const info = `
        <p>Phonebook has info for ${persons.length} ${persons.length === 1 ? "person" : "people"}</p>
        <p>Request made on: ${Date()}</p>
    `
    response.set("Content-Type", "text/html")
    return response.send(info)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        return response.json(person)
    }
    response.status(404)
    return response.end()
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const originalLength = persons.length
    persons = persons.filter(person => person.id !== id)
    if (persons.length < originalLength) {
        return response.status(204).end()
    } else {
        return response.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))