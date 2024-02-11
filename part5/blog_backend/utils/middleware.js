const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//Middleware is a fn that receives 3 parameters
const requestLogger = (request, response, next) => {
	logger.info('Method: ', request.method)
	logger.info('Path: ', request.path)
	logger.info('Body: ', request.body)
	logger.info('---')
	next()
}

const userExtractorMW = async (request, response, next) => {
	if(request.token) {
		const decodedToken = jwt.verify(
			request.token,
			process.env.SECRET
		)
		if(decodedToken.id) {
			const user = await User.findById(decodedToken.id)
			if(user) {
				request['user'] = user
			}
		}
	}
	next()
}

const tokenExtractorMW = (request, response, next) => {
	const authorization = request.get('authorization') //it's lowercase on the request. I looked for it.
	if(authorization && authorization.startsWith('Bearer ')) {
		request['token'] = authorization.replace('Bearer ', '')
	}
	next()
}

const unknownEndPoint = (request, response) => {
	response.status(404).send({
		'error':'Could not find page'
	})
}

const errorHandler = (error, request, response, next) => {
	logger.error('Stack trace: ', error.stack.slice(0, 200))
	if(error.name === 'CastError') {
		return response.status(400).send({
			error: 'the format of the data on your request is wrong.'
		})
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({
			error: error.message
		})
	} else if (error.name === 'TypeError') {
		return response.status(400).json({
			error: error.message
		})
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: error.message
		})
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({
			error: 'Token has expired.'
		})
	}
	next(error)
}

module.exports = {
	unknownEndPoint,
	errorHandler,
	requestLogger,
	tokenExtractorMW,
	userExtractorMW
}