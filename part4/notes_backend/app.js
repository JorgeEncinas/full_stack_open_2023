const config = require("./utils/config")
const logger = require("./utils/logger")
require("express-async-errors")
const mongoose = require("mongoose")
const notesRouter = require("./controllers/notes")
const usersRouter = require("./controllers/users")
const express = require("express")
const cors = require("cors")
const middleware = require("./utils/middleware")

logger.info("connecting to", config.MONGODB_URI_NOTES)
mongoose.set("strictQuery", false)
mongoose.connect(config.MONGODB_URI_NOTES)
    .then(() => {
        logger.info("connected to MongoDB")
    })
    .catch(error => {
        logger.error("error connecting to MongoDB:",error.message)
    })

const app = express()
app.use(express.json())
app.use(express.static("build"))
app.use(cors())
app.use(middleware.requestLogger)

app.use("/api/notes", notesRouter)
app.use("/api/users", usersRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)


module.exports = app