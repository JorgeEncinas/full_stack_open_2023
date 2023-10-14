require("dotenv").config()

const PORT = process.env.PORT
const MONGODB_URI_NOTES = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI_NOTES
const SECRET = process.env.SECRET
const SESSION_SECRET = process.env.SESSION_SECRET
const SESSION_CONFIG = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET //If you use config you can write process.env.SESSION_SECRET
}


module.exports = {
    MONGODB_URI_NOTES,
    PORT,
    SECRET,
    SESSION_SECRET,
    SESSION_CONFIG
}