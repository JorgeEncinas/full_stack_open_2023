exports.user = {
	username: {
		required: 'username is required',
		unique: 'username must be unique',
		minLength: 'username must be at least 3 characters long.',
		maxLength: 'username must be no longer than 16 characters.',
		match: 'username must start with a letter, whether upper or lowercase, and then follow with only alphanumerical characters.'
	},
	name: {
		required: 'name is required.',
		minLength: 'name must be at least 3 characters long.',
		maxLength: 'name must be no longer than 16 characters long.',
	},
	password: {
		required: 'password is required',
		minLength: 'password is too short.'
	}
}
exports.blog = {
	title: {
		required: 'Must specify a title for the blog.',
		minLength: 'Title must be at least 1 character long',
		maxLength: 'Title can\'t exceed 100 characters.'
	},
	author: {
		required: 'Must specify an author for the blog.',
		minLength: 'Author must be at least 1 character long',
		maxLength: 'Author\'s name can\'t exceed 100 characters.'
	},
	url: {
		required: 'Must specify the blog\'s url.',
		minLength: 'url must be at least 1 character long',
		maxLength: 'url can\'t exceed 2000 characters.'
	},
	likes: {
		required: 'Likes were not set up correctly.'
	},
	user: {
		required: 'Blog must have a user associated to it.',
		userExists: 'User does not exist'
	}
}