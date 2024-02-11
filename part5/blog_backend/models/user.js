const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { user:userVM } = require('./validationMsg')
//Note: username Regex from:
//https://stackoverflow.com/a/6814901
//https://stackoverflow.com/a/8462639

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, userVM.username.required],
		unique: [true, userVM.username.unique],
		trim: true,
		minLength: [3, userVM.username.minLength],
		maxLength: [16, userVM.username.maxLength],
		match: [/^[a-zA-Z][a-zA-Z0-9]+$/, userVM.username.match]
	},
	name: {
		type: String,
		required: [true, userVM.name.required],
		minLength: [3, userVM.name.minLength],
		maxLength: [16, userVM.name.maxLength]
	},
	passwordHash: {
		type: String,
		required: [true, userVM.password.required] //more so will pop up if backend forgets to set it
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
