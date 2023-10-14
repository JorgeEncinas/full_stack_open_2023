const config = require("./utils/config")
const logger = require("./utils/logger")
require("express-async-errors")
const mongoose = require("mongoose")
const notesRouter = require("./controllers/notes")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const express = require("express")
const cors = require("cors")
const middleware = require("./utils/middleware")
const session = require("express-session")
const { createClient } = require("redis")
const connectRedis = require("connect-redis")

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

app.use(session(config.SESSION_CONFIG)) //We'll have to change the SESSION_CONFIG

app.use("/api/notes", notesRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

//const RedisStore = connectRedis(session) //We'll have to change the SESSION_CONFIG

app.use("/hello", (request, response) => {
    if(request.session.viewCount === undefined) {
        request.session.viewCount = 0
    } else {
        request.session.viewCount++
    }
    res.send("View count: "+ viewCount)
})

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)


module.exports = app