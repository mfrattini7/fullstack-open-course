const totalLikes = (blogs) => {
    let sum = 0
    for (let i = 0; i < blogs.length; i++) {
        sum += blogs[i].likes
    }
    return sum
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let max = 0
    let best = -1
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > max) {
            max = blogs[i].likes
            best = i
        }
    }
    return blogs[i]
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) return null

    const authorsMap = new Map()
    for (let i = 0; i < blogs.length; i++) {
        const author = blogs[i].author
        if (!authorsMap.has(author)) {
            authorsMap.set(author, 1)
        } else {
            authorsMap.set(author, authorsMap.get(author) + 1)
        }
    }

    let max = 0
    let authorMax = null
    for (const [key, value] of authorsMap) {
        if (value > max) {
            max = value
            authorMax = key
        }
    }
    return {
        author: authorMax,
        blogs: max
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const authorsMap = new Map()
    for (let i = 0; i < blogs.length; i++) {
        const author = blogs[i].author
        const likes = blogs[i].likes
        if (!authorsMap.has(author)) {
            authorsMap.set(author, likes)
        } else {
            authorsMap.set(author, authorsMap.get(author) + likes)
        }
    }

    let max = 0
    let authorMax = null
    for (const [key, value] of authorsMap) {
        if (value > max) {
            max = value
            authorMax = key
        }
    }
    return {
        author: authorMax,
        likes: max
    }
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}