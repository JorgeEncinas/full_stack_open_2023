const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
	let blogs = await Blog.find({})
	response.json(blogs)
})
  
blogsRouter.post('/', (request, response, next) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
		.catch(error => {
			next(error)
		})
})

blogsRouter.get('/:id', async (request, response) => {
	const blogFound = await Blog.findById(request.params.id)
	if(blogFound) {
		response.json(blogFound) //response.status(200).json(blogFound)
	} else {
		response.status(404).end()
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	const blogRaw = await Blog.findByIdAndRemove(request.params.id)
	if (blogRaw) {
		const blogParsed = new Blog(blogRaw)
		if(blogParsed.id === request.params.id)
			response.status(204).end()
		else response.status(500).end()
	} else response.status(404).end()
})

module.exports = blogsRouter