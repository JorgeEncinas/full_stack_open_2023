const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
  
const mongoUrl = config.MONGO_DB_URI_BLOG
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use()

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})