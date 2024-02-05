const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { blog:blogVM } = require('../models/validationMsg')
const middleware = require('../utils/middleware')

/*const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}*/

blogsRouter.get('/', async (request, response) => {
	let blogs = await Blog.find({})
		.populate('user', { username: 1, name: 1})
	response.json(blogs)
})

blogsRouter.post('/nojwt', async (request, response) => { // 4.17
	const body = request.body
	/*const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	} */
	/*
	const user = await User.findById(decodedToken.id)
	*/
	const user = await User.findOne({})
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: 0,
		user: user.id
	})
	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})
  
blogsRouter.post('/', middleware.userExtractorMW, async (request, response) => {
	const body = request.body
	const decodedToken = jwt.verify(
		request.token,//getTokenFrom(request),
		process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({
			error: blogVM.user.invalidTokenParse
		})
	}

	if(!request.user) {
		return response.status(401).json({
			error: 'Custom error'
		})
	}
	
	const user = request.user

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes !== undefined ? body.likes : 0,
		user: user.id
	})

	const savedBlog = await blog.save()
	const savedBlogObj = savedBlog.toJSON()
	user.blogs = user.blogs.concat(savedBlog._id)
	response.status(201)
		//.header('Content-Type', 'application/json')
		.json(savedBlogObj)
})

blogsRouter.get('/:id', async (request, response) => {
	const blogFound = await Blog.findById(request.params.id)
	if(blogFound) {
		response.json(blogFound) //response.status(200).json(blogFound)
	} else {
		response.status(404).end()
	}
})

blogsRouter.delete('/:id', middleware.userExtractorMW, async (request, response) => {
	const blogRetrieved = await Blog.findById(request.params.id)

	if (!request.user) {
		return response.status(401).json({
			error: blogVM.user.required
		})
	}
	const user = request.user
	if (blogRetrieved.user.toString() !== user.id) {
		return response.status(401).json({
			error: blogVM.user.userIsNotThePoster
		})
	}

	const blogRaw = await Blog.findByIdAndRemove(request.params.id)
	if (blogRaw) {
		const blogParsed = new Blog(blogRaw)
		if(blogParsed.id === request.params.id)
			response.status(204).end()
		else response.status(500).end()
	} else response.status(404).end()
})

blogsRouter.put('/:id', middleware.userExtractorMW, async (request, response) => {
	if (!request.user) {
		return response.status(401).json({
			error: blogVM.user.required
		})
	}
	const user = request.user
	const blogToUpdate = await Blog.findById(request.params.id)
	if (blogToUpdate.user.toString() !== user.id) {
		return response.status(401).json({
			error: blogVM.user.userIsNotThePoster
		})
	}
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