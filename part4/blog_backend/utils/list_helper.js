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

const favoriteBlog = (blogs) => {
	//Probably O(2n) runtime, which is O(n)
	if(blogs && blogs.length > 0) {
		let maxLikes = -9999
		blogs.forEach(blog => {
			if(blog.likes) {
				maxLikes = blog.likes > maxLikes ? blog.likes : maxLikes
			}
		})
		let favorites = blogs.filter(blog => {
			let likes = blog.likes? blog.likes : -1 //not going to be taken into account
			return likes === maxLikes
		})
		if (favorites.length === 0) {
			return {}
		}
		return favorites[0]
	}
	else {
		return {}
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}