const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body
   
	const userInDb = await User.findOne({username: username})
	const passwordCorrect = userInDb === null 
		? false
		: await bcrypt.compare(password, userInDb.passwordHash) //hash contains saltRound information built-in
    
	if (!(userInDb && passwordCorrect)) {
		return response.status(400).json({
			error: 'invalid username or password'
		})
	}

	const userForToken = {
		username: userInDb.username,
		id: userInDb._id
	}

	const token = jwt.sign(userForToken, process.env.SECRET,
		{
			expiresIn: 60*60
		}
	)

	response
		.status(200)
		.send({ token, username: userInDb.username, name: userInDb.name })
})

module.exports = loginRouter