const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'How to POST',
		author: 'John Doe',
		url: 'posting',
		likes: 0
	},
	{
		title: 'How to POST',
		author: 'Bob Smith',
		url: 'no_titling_your_post',
		likes: 5
	},
	{
		title: 'How to POST',
		author: 'John Doe',
		url: 'posting',
		likes: 0
	}
]

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'TBDeleted',
		author: 'Who cares',
		url: 'https://google.com',
		likes: 5,
	})
	await blog.save()
	await blog.deleteOne()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb
}