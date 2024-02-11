const mongoose = require('mongoose')
const { blog:blogVM } = require('./validationMsg')
const User = require('./user')

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, blogVM.title.required],
		minLength: [1, blogVM.title.minLength],
		maxLength: [100, blogVM.title.maxLength]
	},
	author: {
		type: String,
		required: [true, blogVM.author.required],
		minLength: [1, blogVM.author.minLength],
		maxLength: [100, blogVM.author.maxLength]
	},
	url: {
		type: String,
		required: [true, blogVM.url.required],
		minLength: [1, blogVM.url.minLength],
		maxLength: [2000, blogVM.url.maxLength]
	},
	likes: {
		type: Number,
		required: [true, blogVM.likes.required],
		default: 0
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, blogVM.user.required],
		validate: {
			validator: async ( value ) => {
				const userExists = await User.findById(value)
				return userExists ? true : false
			},
			message: blogVM.user.userExists
		}
	}
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

//const Blog = mongoose.model('Blog', blogSchema)
//module.exports = Blog
module.exports = mongoose.model('Blog', blogSchema)