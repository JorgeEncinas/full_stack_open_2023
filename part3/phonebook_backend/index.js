require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
//const morganmw = morgan("tiny")
const cors = require("cors")
morgan.token("post",
    (request, response) => {
        let contentString = ""
        if(request.method == "POST") {
            contentString = JSON.stringify(request.body)
        }
        return contentString
})
const morganNewTiny = morgan(":method :url :status :res[content-length] - :response-time ms :post")
const Person = require("./models/person");

app.use(express.json())
app.use(morganNewTiny)
app.use(cors())
app.use(express.static("dist"))

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
    Person.find({}).then(persons => {
        return response.json(persons)
    })
})

app.get("/info", (request, response) => {
    Person.find({}).then(persons => {
        const info = `
        <p>Phonebook has info for ${persons.length} ${persons.length === 1 ? "person" : "people"}</p>
        <p>Request made on: ${Date()}</p>
        `
        response.set("Content-Type", "text/html")
        return response.send(info)
    })
    .catch(error => {
        console.log("Error fetching info", error)
    })
})

app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id)
        .then(retrievedPerson => {
            if(retrievedPerson) {
                return response.json(retrievedPerson)
            } else {
                return response.status(404).end()
            }
        })
        .catch(error => {
            console.log("Error finding person:", error.message)
            return response.status(404).end()
        })
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

const generateId = () => {
    return Math.floor(Math.random()*100000)
}

app.post("/api/persons", (request, response) => {
    const body = request.body
    if(!body) {
        return response.status(400).json({
            error:"No body."
        })
    }

    if (body.number === undefined || body.name === undefined
        || body.number === null || body.name === null) {
        return response.status(400).json({
            error: "Requires both 'name' and 'number'"
        })
    } else {
        const nameExists = persons.find(person => {
            return person.name === body.name
        })
        if (nameExists) {
            return response.status(400).json({
                error: "name is already registered"
            })
        }
        const newPerson =   {
            id: generateId(),
            name: body.name,
            number: body.number
        } 
        persons.push(newPerson)
        return response.status(200).json(newPerson)
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))