//Thanks to https://dev.to/ryuuto829/setup-in-memory-database-for-testing-node-js-and-mongoose-1kop
//For showing in his article how to setup
//The in-memory mock-up mongodb
//This is their code, I DO NOT CLAIM IT AS MINE.

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
let mongoServer

const opts = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}

const connect = async () => {
	await mongoose.disconnect() //Make sure prev was closed
	mongoServer = await MongoMemoryServer.create()
    
	const mongoUri = await mongoServer.getUri()
	await mongoose.connect(mongoUri, opts)
}

const close = async () => {
	await mongoose.disconnect()
	await mongoServer.stop()
}

const clear = async () => {
	const collections = mongoose.connection.collections

	for(const key in collections) {
		await collections[key].deleteMany()
	}
}

module.exports = {
	connect,
	close,
	clear
}