//const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const db = require('./database')
//JEST:  Run in band prevents running tests in parallel

beforeAll( async () => {
	await db.connect()
})

beforeEach( async () => {
	await db.clear()
	console.log(helper.initialBlogs)
	for(let item of helper.initialBlogs) {
		let blogObj = new Blog(item)
		await blogObj.save()
	}
})

afterAll( async () => {
	await db.close()
})

test('HTTP GET /api/blogs', async () => {
	const response = await api.get('/api/blogs')
		.expect(200)
	expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 10000)

test('Verify ID is defined', async () => {
	const response = await api.get('/api/blogs')
	for(const blog of response.body) {
		expect(blog.id).toBeDefined()
	}
})
test('HTTP POST request is successful', async () => {
	const newBlog = {
		title:'Jest post',
		author:'Superagent',
		url:'superagent-can-post',
		likes:4
	}

	const response = await api.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type',/application\/json/)
	const noteSaved = JSON.parse(response.text)

	const responseGETAll = await api.get('/api/blogs')
		.expect(200)	
	expect(JSON.parse(responseGETAll.text)).toHaveLength(helper.initialBlogs.length+1)

	const responseGET = await api
		.get(`/api/blogs/${noteSaved.id}`)
	const findBlog = JSON.parse(responseGET.text)
	expect(findBlog).toEqual(noteSaved)
})

test('if likes are missing, it defaults to 0', async () => {
	const newBlog = {
		title:'Jest post',
		author:'Superagent',
		url:'superagent-can-post'
	}

	const response = await api.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	const blogSaved = JSON.parse(response.text) 

	const responseGet = await api.get(`/api/blogs/${blogSaved.id}`)
		.expect(200)
	const noteRetrieved = JSON.parse(responseGet.text)
	expect(noteRetrieved.likes).toBe(0)
})

test('if title is missing, returns 400', async () => {
	const newBlog = {
		author:'Superagent',
		url:'superagent-can-post',
		likes:4
	}

	await api.post('/api/blogs')
		.send(newBlog)
		.expect(400)
})

test('if url is missing, returns 400', async () => {
	const newBlog = {
		title:'Jest post',
		author:'Superagent',
		likes:4
	}

	await api.post('/api/blogs')
		.send(newBlog)
		.expect(400)
})