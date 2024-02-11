const Blog = require('../models/blog')
const User = require('../models/user')
const fs = require('fs')

const writeToFile = async (jsonObject) => {
	const jsonString = JSON.stringify(jsonObject, null, 2)
	fs.appendFile('./tests/inspector.txt', jsonString, (err) => {
		if (err) {
			console.log('Error appending contents to inspector file', err)
		} else {
			console.log('Object contents can be inspected at tests/inspector.txt')
		}
	})
}

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

const initialUsers = [
	{
		username: 'andrewcr',
		name: 'Andrew Cranston',
		password: 'cranston111'
	},
	{
		username: 'bobjohnson',
		name: 'Bob Johnson',
		password:'bobjohnson'
	},
	{
		username: 'housemd',
		name: 'Gregory House',
		password: 'cuddy123'
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

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = {
	initialBlogs,
	initialUsers,
	nonExistingId,
	blogsInDb,
	usersInDb,
	writeToFile
}