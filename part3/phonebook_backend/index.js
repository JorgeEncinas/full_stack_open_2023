require("dotenv").config()
const PORT = process.env.PORT || 3001
const express = require("express")
const app = express()
const morgan = require("morgan")
//const morganmw = morgan("tiny")
const cors = require("cors")
morgan.token("post",
	(request) => {
		let contentString = ""
		if(request.method === "POST" || request.method === "PUT") {
			contentString = JSON.stringify(request.body)
		}
		return contentString
	}
)
const morganNewTiny = morgan(":method :url :status :res[content-length] - :response-time ms :post")
const Person = require("./models/person")

app.use(express.json())
app.use(morganNewTiny)
app.use(cors())
app.use(express.static("dist"))

const errorHandler = (error, request, response, next) => {
	console.log(error.message)
	if(error.name === "CastError") {
		return response.status(400).send({
			error:"Your request had the wrong format."
		})
	} else if (error.name === "ValidationError") {
		//console.log(error)
		return response.status(400).json({
			error: error.message
		})
	}
	next(error) //Pass it to the default errHandler?
}

app.get("/api/persons", (request, response) => {
	Person.find({}).then(persons => {
		return response.json(persons)
	})
})

app.get("/info", (request, response, next) => {
	Person.find({}).then(persons => {
		const info = `
        <p>Phonebook has info for ${persons.length} ${persons.length === 1 ? "person" : "people"}</p>
        <p>Request made on: ${Date()}</p>
        `
		response.set("Content-Type", "text/html")
		return response.send(info)
	})
		.catch(error => {
			next(error)
		})
})

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then(retrievedPerson => {
			if(retrievedPerson) {
				return response.json(retrievedPerson)
			} else {
				return response.status(404).end()
			}
		})
		.catch(error => {
			next(error)
		})
})

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(result => {
			if(result === null) {
				response.status(404).end()
			} else {
				response.status(204).end()
			}
		})
		.catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
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
		const newPerson = Person({
			name: body.name,
			number: body.number
		})
		newPerson.save().then(savedPerson => {
			return response.json(savedPerson)
		})
			.catch(error => {
				next(error)
			})
	}
})

app.put("/api/persons/:id", (request, response, next) => {
	const body = request.body

	if (!body) {
		response.status(400).json({
			error: "Person content was missing"
		})
	} else {
		console.log(body)
		if(body.number) {
			const editPerson = {
				//name: body.name,
				number: body.number
			}
			Person.findByIdAndUpdate(request.params.id,
				editPerson,
				{ new: true, runValidators: true, context: "query" })
				.then(updatedPerson => {
					response.json(updatedPerson)
				})
				.catch(error => next(error))
		} else {
			response.status(400).json({
				error: "Missing attributes"
			})
		}
	}
})

app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))