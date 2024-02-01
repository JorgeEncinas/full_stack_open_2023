const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { user:userVM } = require('../models/validationMsg')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
		.populate('blogs',
			{ title: 1, author: 1,
				url: 1, likes: 1})
	response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
	const user = await User.findById(request.params.id)
	if (user) { response.json(user) }
	else { response.status(404).end() }
})

usersRouter.post('/', async (request, response) => {
	const saltRounds = 10

	let body = request.body
	let userForm = {
		username: body.username,
		name: body.name,
		password: body.password,
	}

	if(!userForm.password) {
		return response.status(400).json({
			error: userVM.password.required
		})
	}
	if (userForm.password.length < 3) {
		return response.status(400).json({
			error: userVM.password.minLength
		})
	}

	const passwordHash = await bcrypt.hash(userForm.password, saltRounds)

	const user = new User({
		username: userForm.username,
		name: userForm.name,
		passwordHash: passwordHash
	})
	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

module.exports = usersRouter