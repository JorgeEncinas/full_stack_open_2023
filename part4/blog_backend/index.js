const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

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
app.use(middleware.errorHandler)

app.use(middleware.unknownEndPoint)
app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`)
})