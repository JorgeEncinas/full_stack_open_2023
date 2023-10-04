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

const mostBlogs = (blogs) => {
    ///Returns the author who has the largest amount of blogs.
    ///If there's more than one, returns the first.
    //Implementation idea: iterate once, saving each into a dictionary.
    //Then just iterate over the values.
    //Runtime O(2n) ---> O(n) (simplified)
	let authors = {}
	let most_blogs = 0
	let winning_author = null
	if(blogs.length > 0) {
		blogs.forEach(blog => {
			if (blog.author !== null && blog.author !== undefined) {
				if (authors[blog.author] === null || authors[blog.author] === undefined) {
					authors[blog.author] = 1
				} else {
					authors[blog.author] += 1
				}
				if (authors[blog.author] > most_blogs) {
					most_blogs = authors[blog.author]
					winning_author = blog.author
				}
			}
		})
	}
	return (most_blogs > 0) ? { 'author':winning_author, 'blogs':most_blogs } : {}
}

const mostLikes = (blogs) => {
    ///Returns the author whose blog posts have the largest amount of likes (sum of all)
    ///Also must contain the total number of likes on the answer
    //Implementation idea: seems like an expansion of the previous
    //ITERATION 1: In a dictionary, we use each person as key, and the value is the accumulator
    //ITERATION 2: Get the highest likes. Save the index for it.
    //Runtime: O(2n) ---> O(n) (simplified)
	let authors = {}
	let most_likes = 0
	let winning_author = null
	if (blogs.length > 0) {
		blogs.forEach(blog => {
			if(blog.author !== null && blog.author !== undefined && blog.likes !== null && blog.likes !== undefined) {
				if(authors[blog.author] === null || authors[blog.author] === undefined) {
					authors[blog.author] = blog.likes
				} else {
					authors[blog.author] += blog.likes
				}
				if(authors[blog.author] >= most_likes) {
					most_likes = authors[blog.author]
					winning_author = blog.author
				}
			}
		})
	}
	return (winning_author !== null) ? { 'author':winning_author, 'likes':most_likes } : {}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
    mostBlogs,
    mostLikes
}