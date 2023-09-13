const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	console.log(blogs.length)
	if (blogs.length === 0) {
		return 0
	} else {
		return blogs.reduce((accumulator, blog) => {
			let likes = blog.likes ? blog.likes : 0
			return accumulator + likes
		}, 0)
	}
}

module.exports = {
	dummy,
	totalLikes
}