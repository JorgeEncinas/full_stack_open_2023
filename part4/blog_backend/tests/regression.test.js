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
	//console.log(helper.initialBlogs)
	for(let item of helper.initialBlogs) {
		let blogObj = new Blog(item)
		await blogObj.save()
	}
})

afterAll( async () => {
	await db.close()
})

describe('Blog posts already exist', () => {
	test('HTTP GET /api/blogs', async () => {
		const response = await api.get('/api/blogs')
			.expect(200)
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	}, 10000)
})

describe('View a specific blog', () => {
	test('Verify ID is defined', async () => {
		const response = await api.get('/api/blogs')
		for(const blog of response.body) {
			expect(blog.id).toBeDefined()
		}
	})
})

describe('Addition of a blog', () => {
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
})

describe('Deletion of a blog', () => {
	test('Delete one blog', async () => {
		const responseGETAllBeforeDelete = await api.get('/api/blogs')
			.expect(200)
		const blogs = responseGETAllBeforeDelete.body
		const firstBlog = blogs[0]
		await api.delete(`/api/blogs/${firstBlog.id}`)
			.expect(204)
		//const blogDeletedRaw = JSON.parse(responseDelete.text)
		//const blogDeletedObj = new Blog(blogDeletedRaw)
		const responseGETAllAfterDelete = await api.get('/api/blogs')
			.expect(200)
		const blogsAfterDelete = responseGETAllAfterDelete.body
		expect(blogsAfterDelete).toHaveLength(blogs.length-1)

		await api.get(`/api/blogs/${firstBlog.id}`)
			.expect(404)
	})
})

describe.only('Updating a blog', () => {
	test('Update many blog attributes at once', async () => {
		const response = await api.get('/api/blogs')
			.expect(200)
		const blogs = response.body
		const firstBlog = blogs[0]
		const editedBlog = {
			title: 'new title',
			author: 'jest-updated',
			likes: 13
		}
		expect(firstBlog.title).not.toBe(editedBlog.title)
		expect(firstBlog.author).not.toBe(editedBlog.author)
		expect(firstBlog.likes).not.toBe(editedBlog.likes)
		const responsePUT = await api.put(`/api/blogs/${firstBlog.id}`)
			.send(editedBlog)
			.expect(200)
		const updatedBlog = new Blog(responsePUT.body)
		expect(updatedBlog.title).toEqual(editedBlog.title)
		expect(updatedBlog.author).toEqual(editedBlog.author)
		expect(updatedBlog.likes).toEqual(editedBlog.likes)
	})
	test('Update title only', async () => {
		const response = await api.get('/api/blogs')
			.expect(200)
		const blogs = response.body
		const firstBlog = blogs[0]
		const editedBlog = {
			title: 'new title'
		}
		expect(firstBlog.title).not.toBe(editedBlog.title)
		const responsePUT = await api.put(`/api/blogs/${firstBlog.id}`)
			.send(editedBlog)
			.expect(200)
		const updatedBlog = new Blog(responsePUT.body)
		expect(updatedBlog.title).toEqual(editedBlog.title)
	})
	test('Update likes only', async () => {
		const response = await api.get('/api/blogs')
			.expect(200)
		const blogs = response.body
		const firstBlog = blogs[0]
		const editedBlog = {
			likes: 13
		}
		expect(firstBlog.likes).not.toBe(editedBlog.likes)
		const responsePUT = await api.put(`/api/blogs/${firstBlog.id}`)
			.send(editedBlog)
			.expect(200)
		const updatedBlog = new Blog(responsePUT.body)
		expect(updatedBlog.likes).toEqual(editedBlog.likes)
	})
	test('Update author only', async () => {
		const response = await api.get('/api/blogs')
			.expect(200)
		const blogs = response.body
		const firstBlog = blogs[0]
		const editedBlog = {
			author: 'jest-updated'
		}
		expect(firstBlog.likes).not.toBe(editedBlog.likes)
		const responsePUT = await api.put(`/api/blogs/${firstBlog.id}`)
			.send(editedBlog)
			.expect(200)
		const updatedBlog = new Blog(responsePUT.body)
		expect(updatedBlog.author).toEqual(editedBlog.author)
	})
})





