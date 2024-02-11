const listHelper = require('../utils/list_helper')

describe('dummy', () => {
	test('dummy returns one', () => {
		const blogs = []

		const result = listHelper.dummy(blogs)
		expect(result).toBe(1)
	})
})

describe('total likes', () => {
	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

	const blogs = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2,
			__v: 0
		}  
	]

	const blogWithoutLikes = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			__v: 0
		},
	]

	const blogsWithAndWithoutLikes = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 3,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2,
			__v: 0
		}  
	]
    
	test('only one blog, equals five', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})

	test('6 blogs, 36 likes total', () => {
		const result = listHelper.totalLikes(blogs)

		expect(result).toBe(36)
	})

	test('no blogs, 0 likes total', () => {
		const result = listHelper.totalLikes([])

		expect(result).toBe(0)
	})

	test('blog without likes, returns 0', () => {
		const result = listHelper.totalLikes(blogWithoutLikes)

		expect(result).toBe(0)
	})

	test('blogs with and without likes, returns 24', () => {
		const result = listHelper.totalLikes(blogsWithAndWithoutLikes)

		expect(result).toBe(24)
	})

})

describe('Favorite posts', () => {
	const listWithOneBlogWithLikes = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

	const listManyBlogsWithLikesOneFavorite = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2,
			__v: 0
		}  
	]

	const listManyBlogsWithLikesThreeFavorites = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 15,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 15,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 15,
			__v: 0
		}  
	]

	const listOneblogWithoutLikes = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			__v: 0
		},
	]

	const listBlogsWithAndWithoutLikesTwoFavorites = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 20,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 20,
			__v: 0
		}  
	]

	test('One blog, returns the same', () => {
		const result = listHelper.favoriteBlog(listWithOneBlogWithLikes)

		expect(result).toEqual({
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		})
	})

	test('No blogs, returns empty dict', () => {
		const result = listHelper.favoriteBlog({})

		expect(result).toEqual({})
	})

	test('Many blogs, only one favorite', () => {
		const result = listHelper.favoriteBlog(listManyBlogsWithLikesOneFavorite)

		expect(result).toEqual({
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		})
	})

	test('Many blogs, three favorites', () => {
		const result = listHelper.favoriteBlog(listManyBlogsWithLikesThreeFavorites)

		expect(result).toEqual({
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 15,
			__v: 0
		})
	})

	test('One blog, likes are missing', () => {
		const result = listHelper.favoriteBlog(listOneblogWithoutLikes)

		expect(result).toEqual({})
	})

	test('More than one favorite, some missing likes', () => {
		const result = listHelper.favoriteBlog(listBlogsWithAndWithoutLikesTwoFavorites)
		
		expect(result).toEqual(		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 20,
			__v: 0
		})
	})
})

describe('Most blogs', () => {
	
	const listWithOneBlogWithAuthor = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

	const listOneWinnerManyBlogsWithAuthor = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10,
			__v: 0
		},
	]

	const listManyBlogsWithAuthorsTwoWinners = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 15,
			__v: 0
		},
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns 2',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 0,
			__v: 0
		}
	]

	const listOneblogWithoutAuthor = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			url: 'https://reactpatterns.com/',
			__v: 0
		},
	]

	const listBlogsWithAndWithoutAuthorsTwoFavorites = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns 2',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 20,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 20,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 20,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			__v: 0
		},
	]

	test('One blog with author, returns the author', () => {
		const result = listHelper.mostBlogs(listWithOneBlogWithAuthor)

		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 1
		})
	})

	test('No blogs, returns empty dict', () => {
		const result = listHelper.mostBlogs({})

		expect(result).toEqual({})
	})

	test('Many blogs, one winner, they all have authors', () => {
		const result = listHelper.mostBlogs(listOneWinnerManyBlogsWithAuthor)

		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 5
		})
	})

	test('Many blogs, two winners, they all have authors', () => {
		const result = listHelper.mostBlogs(listManyBlogsWithAuthorsTwoWinners)

		expect(result).toEqual({
			author: 'Michael Chan',
			blogs: 2
		})
	})

	test('One blog, author is missing', () => {
		const result = listHelper.mostBlogs(listOneblogWithoutAuthor)

		expect(result).toEqual({})
	})

	test('More than one most_blogs, some entries without authors.', () => {
		const result = listHelper.mostBlogs(listBlogsWithAndWithoutAuthorsTwoFavorites)
		
		expect(result).toEqual(		{
			author: 'Robert C. Martin',
			blogs: 3
		})
	})
})

describe.only('Most likes', () => {
	
	const listWithOneBlogWithAuthorAndWithLikes = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

	const listWithOneBlogWithAuthorWithoutLikes = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			__v: 0
		}
	]
	const listWithOneBlogNoAuthorWithoutLikes = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			__v: 0
		}
	]

	const listWithOneBlogWithoutAuthorWithLikes = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

	const listOneWinnerManyBlogsWithAuthor = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10,
			__v: 0
		},
	]

	const listManyBlogsWithAuthorsTwoWinners = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns 2',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 10,
			__v: 0
		}
	]

	const listBlogsWithAndWithoutAuthorsOneWinner = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns 2',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 20,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 20,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 20,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			__v: 0
		},
	]

	const listBlogsWithAndWithoutAuthorsTwoFavorites = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 53,
			__v: 0
		},
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns 2',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 20,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 20,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 20,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Michael Chan',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 7,
			__v: 0
		},
	]

	test('One blog with author, and likes. Returns author', () => {
		const result = listHelper.mostLikes(listWithOneBlogWithAuthorAndWithLikes)

		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 5
		})
	})

	test('No blogs, returns empty dict', () => {
		const result = listHelper.mostLikes({})

		expect(result).toEqual({})
	})

	test('One blog, with author, without likes', () => {
		const result = listHelper.mostLikes(listWithOneBlogWithAuthorWithoutLikes)

		expect(result).toEqual({})
	})

	test('One blog, without author, with likes', () => {
		const result = listHelper.mostLikes(listWithOneBlogWithoutAuthorWithLikes)

		expect(result).toEqual({})
	})

	test('One blog, no author, no likes', () => {
		const result = listHelper.mostLikes(listWithOneBlogNoAuthorWithoutLikes)

		expect(result).toEqual({})
	})

	test('Many blogs, one winner, they all have authors', () => {
		const result = listHelper.mostLikes(listOneWinnerManyBlogsWithAuthor)

		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 53
		})
	})

	test('Many blogs, two winners, they all have authors', () => {
		const result = listHelper.mostLikes(listManyBlogsWithAuthorsTwoWinners)

		expect(result).toEqual({
			author: 'Robert C. Martin',
			likes: 20
		})
	})

	test('One blog, author is missing', () => {
		const result = listHelper.mostLikes(listBlogsWithAndWithoutAuthorsOneWinner)

		expect(result).toEqual({
			author: 'Robert C. Martin',
			likes: 40
		})
	})

	test('More than one most_blogs, some entries without authors.', () => {
		const result = listHelper.mostLikes(listBlogsWithAndWithoutAuthorsTwoFavorites)
		
		expect(result).toEqual(		{
			author: 'Michael Chan',
			likes: 60
		})
	})
})