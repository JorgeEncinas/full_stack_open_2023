const logger = require("./logger")

//Middleware is a fn that receives 3 parameters
const requestLogger = (request, response, next) => {
    console.log("Method: ", request.method)
    console.log("Path: ", request.path)
    console.log("Body: ", request.body)
    console.log("---")
    next()
}

const unknownEndPoint = (request, response) => {
    response.status(404).send({
        error: "Unknown endpoint"
    })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if(error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndPoint,
    errorHandler
}