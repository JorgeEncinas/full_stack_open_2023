require('dotenv').config()

const PORT = 3003
const MONGO_DB_URI_BLOG = process.env.MONGO_DB_URI_BLOG
/*
const MONGO_DB_URI_BLOG = process.env.NODE_ENV === "test"
	? process.env.MONGO_DB_URI_BLOG_TEST
	: process.env.MONGO_DB_URI_BLOG
*/

module.exports = {
	MONGO_DB_URI_BLOG,
	PORT
}