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

blogsRouter.put('/:id', async (request, response) => {
	const editedBlog = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes
	}
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		editedBlog,
		{ new: true, runValidators: true,
			context: 'query' }
	)
	//console.log(updatedBlog)
	response.status(200).json(updatedBlog)
})

module.exports = blogsRouter