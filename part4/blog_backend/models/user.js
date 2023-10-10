const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
//Note: username Regex from:
//https://stackoverflow.com/a/6814901
//https://stackoverflow.com/a/8462639

const userSchema = new mongoose.Schema({
	username: {
		type:String,
		required: true,
		unique: true,
		trim: true,
		minLength: 4,
		maxLength: 16,
		match: /^[a-zA-Z][a-zA-Z0-9]+$/
	},
	name: {
		type:String,
		required: true,
		minLength: 4,
		maxLength: 16
	},
	passwordHash: {
		type:String,
		required:true
	},
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	],
})

userSchema.set('toJSON', {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id.toString()
		delete returnedObj._id
		delete returnedObj.__v
		delete returnedObj.passwordHash
	}
})
userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)
module.exports = User
