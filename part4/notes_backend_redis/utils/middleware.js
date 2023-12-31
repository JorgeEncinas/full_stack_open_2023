const logger = require("./logger")

//Middleware is a fn that receives 3 parameters
const requestLogger = (request, response, next) => {
    logger.info("Method: ", request.method)
    logger.info("Path: ", request.path)
    logger.info("Body: ", request.body)
    logger.info("---")
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
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({
            error: error.message
        })
    } else if (error.name === "TokenExpiredError") {
        return response.status(401).json({
            error: "Token has expired"
        })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndPoint,
    errorHandler
}