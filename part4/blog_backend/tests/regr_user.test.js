const bcrypt = require('bcrypt')
const User = require('../models/user')
const db = require('./database')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const { user: userVM } = require('../models/validationMsg')

/* NOTES: run specific tests through commands
    npm test -- tests/note_api.test.js                                  JUST A FILE
    npm test -- -t "a specific note is within the returned notes"       SPECIFIC NAME OR DESCRIBE BLOCK
    npm test -- -t 'notes'                                              All tests that contain "notes" in their name

    Careful that the Mongoose Connection probably stays open if NO TESTS using the connection are run.
    Might be bc supertest primes the connection, but Jest doesn't run "afterAll"
*/

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

	test('creation fails with statuscode + message if username is taken', async () => {
		const existingUsersRequest = await api.get('/api/users')
			.expect(200)
		const existingUsers = existingUsersRequest.body
		const oneUser = existingUsers[0]
		console.log(oneUser)

		const newUser = {
			username: oneUser.username,
			name: 'Some other person',
			password: 'some other password!'
		}
		
		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body.error).toContain('unique')

		const usersAtEndRequest = await api.get('/api/users')
		const usersAtEnd = usersAtEndRequest.body
		expect(usersAtEnd).toEqual(existingUsers)

	})
})

describe('4.16 validate user creation w/status code and error messages', () => {

	test('creation fails when username exists', async () => {
		const existingUsersQ = await api.get('/api/users')
			.expect(200)
		const existingUsers = existingUsersQ.body
		const oneUser = existingUsers[0]

		const newUser = {
			username: oneUser.username,
			name: 'some other person',
			password: 'someOtherPassword'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
		
		expect(result.body.error).toContain('unique')
	})

	test('creation fails when username is not given', async () => {
		const newUser = {
			name: 'I have a name',
			password: 'Hiii I am a password and I was provided!'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body).toEqual({
			error: expect.stringContaining(userVM.username.required)
		})
	})

	test('creation fails when no name is given', async () => {
		const newUser = {
			username: 'no-name',
			password: 'Hiii I am a password and I was provided!'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body).toEqual({
			error: expect.stringContaining(userVM.name.required)
		})
	})

	test('creation fails when password is not given', async() => {
		const newUser = {
			username: 'no-password',
			name:'No password'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body).toEqual({
			error: expect.stringContaining(userVM.password.required)
		})
	})

	test('creation fails when username Starts with a number', async () => {
		const newUser = {
			username: '39name',
			name: 'A valid name',
			password: 'password'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body).toEqual({
			error: expect.stringContaining(userVM.username.match)
		})
	})

	test('creation fails when username Starts with a special character', async () => {
		const newUser = {
			username: '°name',
			name: 'A valid name',
			password: 'password'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body).toEqual({
			error: expect.stringContaining(userVM.username.match)
		})
	})

	test('creation fails when username has any special character in the middle', async () => {
		const newUser = {
			username: 'a°name',
			name: 'A valid name',
			password: 'password'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body).toEqual({
			error: expect.stringContaining(userVM.username.match)
		})
	})

	test('creation fails when username is less than 3 chars long', async () => {
		const newUser = {
			username: 'ki',
			name: 'A valid name',
			password: 'password'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body).toEqual({
			error: expect.stringContaining(userVM.username.minLength)
		})
	})

	test('creation fails when username is more than 16 characters long', async () => {
		const newUser = {
			username: 'anEXTREMELYLONGUSERNAMEthatDefinitelyExceeds16Characters',
			name: 'A valid name',
			password: 'password'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body).toEqual({
			error: expect.stringContaining(userVM.username.maxLength)
		})
	})

	test('creation fails when name is less than 3 characters long', async () => {
		const newUser = {
			username: 'Usernamee',
			name: 'ki',
			password: 'password'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body).toEqual({
			error: expect.stringContaining(userVM.name.minLength)
		})
	})

	test('creation fails when name is more than 16 characters long', async () => {
		const newUser = {
			username: 'aUsername',
			name: 'A name which is not valid because it is ridiculously long',
			password: 'password'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body).toEqual({
			error: expect.stringContaining(userVM.name.maxLength)
		})
	})

	test('creation fails when password is less than 3 chars long', async () => {
		const newUser = {
			username: 'aUsername',
			name: 'a valid name',
			password: 'pa'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body).toEqual({
			error: expect.stringContaining(userVM.password.minLength)
		})
	})

	test('creation succeeds with username+name being 16 chars long', async () => {
		const newUser = {
			username: 'aUsernameThatIsL',
			name: 'a valid name tha',
			password: 'password'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(201)

		const userAdded = result.body

		expect(userAdded).toEqual(
			expect.objectContaining({
				username:newUser.username,
				name:newUser.name,
				id: expect.any(String),
				blogs: expect.any(Array)
			})
		)
		
		//Becomes more of an integration test here, as I
		//read online whether this was acceptable or not...
		//const userQuery = await User.findOne(userAdded.id)
		//	.expect(200)
		//const userFromDb = userQuery.body
		//expect(userFromDb).toEqual(userAdded)
		
	})
})

describe.only('4.18 user token is needed', () => {
	test('Create blog without jwt fails', async () => {
		const newBlog = {
			title: 'I have no token!',
			author: 'no-token_evildoer',
			url: 'no_token_evildoer'
		}

		const result = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(401)

		expect(result.body).toEqual({
			'error': expect.stringContaining('jwt must be provided')
		})
	})

	test('Create succeeds if I provide a token', async () => {
		const newUser = {
			username: 'giorgio',
			name: 'Giovanni Giorgio',
			password: 'giovannigiorgio'
		}
		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)

		const loginPost = {
			username: newUser.username,
			password: newUser.password
		}
		const loginResponse = await api
			.post('/api/login')
			.send(loginPost)

		const responseData = loginResponse.body
		const token = responseData.token

		const newBlog = {
			title: 'JWTs and Me',
			author: 'James Wilson Theroux',
			url: 'yes_my_name_is_jwt'
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(201)
	})
})