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
	expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 10000)

test('Verify ID is defined', async () => {
	const response = await api.get('/api/blogs')
	for(const blog of response.body) {
		expect(blog.id).toBeDefined()
	}
})