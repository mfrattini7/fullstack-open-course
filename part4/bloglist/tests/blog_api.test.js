const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')

const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

after(async () => {
  await mongoose.connection.close()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(e => e.title)
  assert.strictEqual(titles.includes('title 1'), true)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'title 4',
    author: 'author 4',
    url: 'url 4',
    likes: 4
  }
  await api.post('/api/blogs').send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  assert(blogsAtEnd.map(it => it.title).includes('title 4'))
})

test('a retrieved blog has an id property', async () => {
  const response = await api.get('/api/blogs')
  assert.notEqual(response.body[0].id, undefined)
})

test('a valid blog with no likes can be added and will have 0 likes', async () => {
  const newBlog = {
    title: 'title 5',
    author: 'author 5',
    url: 'url 5',
  }
  const created = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(created.body.likes, 0)
})

test('if a blog is missing the title respond with 400', async () => {
  const newBlog = {
    author: 'author 5',
    url: 'url 5',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('if a blog is missing the url respond with 400', async () => {
  const newBlog = {
    title: 'title 5',
    author: 'author 5'
  }
  await api.post('/api/blogs').send(newBlog)
    .expect(400)
})

test('can delete a blog', async () => {
  const blogs = await helper.blogsInDb()
  await api.delete(`/api/blogs/${blogs[0].id}`).expect(204)
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('can update a blog', async () => {
  
})