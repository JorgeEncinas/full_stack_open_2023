const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_DB_URI_BLOG)
	.then(() => {
		logger.info('Connected to MongoDB')
	})
	.catch(error => {
		logger.error('Error connecting to MongoDB:', error.message)
	})

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndPoint)

module.exports = app