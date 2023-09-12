const config = require(".utils/config")
const logger = require(".utils/logger")
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const middleware = require("./utils/middleware")
const notesRouter = require("./controllers/notes")

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

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)
app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})