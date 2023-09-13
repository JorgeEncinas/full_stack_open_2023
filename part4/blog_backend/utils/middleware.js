const logger = require('./logger')

const unknownEndPoint = (request, response) => {
	response.status(404).send({
		'error':'Could not find page'
	})
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)
	if(error.name === 'CastError') {
		return response.status(400).send({
			error: 'the format of the data on your request is wrong.'
		})
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({
			error: error.message
		})
	}
	next(error)
}

module.exports = { unknownEndPoint, errorHandler }