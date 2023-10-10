const bcrypt = require('bcrypt')
const User = require('../models/user')
const db = require('./database')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeAll(async () => {
	await db.connect()
})

beforeEach(async () => {
	await db.clear()
	const saltRounds = 10
	for(let user of helper.initialUsers) {
		let passwordHash = await bcrypt.hash(user.password,
			saltRounds)
		let userObj = new User({
			username: user.username,
			name: user.name,
			passwordHash: passwordHash
		})
		await userObj.save()
	}
})

afterAll(async () => {
	await db.close()
})

describe('When there is one user in the db', () => {

	test('Create succeeds with new username', async () => {
		const newUser = {
			username: 'superagentuser',
			name: 'Super Agent',
			password: 'superagent'
		}
		const responseAdd = await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const userAdded = JSON.parse(responseAdd.text)

		//const responseGetAfterAdd = await api.get('/api/users')
		//	.expect(200)
		const usersAfterAdd = await helper.usersInDb()
		expect(usersAfterAdd).toHaveLength(helper.initialUsers.length+1)

		const responseGetUser = await api
			.get(`/api/users/${userAdded.id}`)
		console.log(responseGetUser)
		const userRetrieved = JSON.parse(responseGetUser.text)
		expect(userRetrieved).toEqual(userAdded)
	})
})