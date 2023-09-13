require('dotenv').config()

const MONGO_DB_URI_BLOG = process.env.MONGO_DB_URI_BLOG
const PORT = 3003

module.exports = {
	MONGO_DB_URI_BLOG,
	PORT
}