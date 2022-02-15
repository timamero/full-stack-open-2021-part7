const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }

  const user = request.user

  if (!body.title) {
    return response.status(400).json({
      error: 'title missing'
    })
  }

  if (!body.url) {
    return response.status(400).json({
      error: 'url missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id,
    comments: []
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(200).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }

  const user = request.user

  try {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(400).json({ error: 'blog does not exist are was already deleted'})
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'user is not authorized to delete this blog'})
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

  } catch(exception) {

    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedNote)
  } catch(exception) {
    next(exception)
  }  
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  if (body) {
    const id = request.params.id
    request.blog = await Blog.findById(id)
  }

  const blog = request.blog

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const comment = new Comment({
    content: body.content,
  })
  
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(200).json(savedComment)
})

module.exports = blogsRouter