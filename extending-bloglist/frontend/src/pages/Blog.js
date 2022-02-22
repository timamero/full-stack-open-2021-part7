import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { updateBlogs, initializeBlogs } from '../reducers/blogReducer'
import { setInfoMessage, setErrorMessage } from '../reducers/notificationReducer'
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardLink,
  CardText,
  Button,
  Form,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
  Badge } from 'reactstrap'

const Blog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.filter(blog => blog.id === id)[0])
  const [likes, setLikes] = useState(0)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (blog) {
      setLikes(blog.likes)
    }
  }, [likes, blog])

  if (!blog) {
    return null
  }

  const handleUpdateBlog = async (updatedBlog) => {
    try {
      dispatch(updateBlogs(updatedBlog))

      dispatch(setInfoMessage(`Blog ${updatedBlog.title} was updated`, 10))
    } catch (exceptions) {
      dispatch(setErrorMessage('Blog not updated', 10))
    }
  }

  const handleLikeClick = () => {
    const updatedLikes = blog.likes + 1
    const updatedBlog = { ...blog, likes: updatedLikes }

    handleUpdateBlog(updatedBlog)
    setLikes(updatedLikes)
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    const newComment = {
      content: comment
    }

    await blogService.createComment(id, newComment)
    setComment('')
    dispatch(initializeBlogs())
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h2">
            {blog.title}
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted">
            <p>Added by {blog.user.name}</p>
          </CardSubtitle>
          <CardText>
            <Badge className="likes" color="dark">Likes: {likes}</Badge>
          </CardText>
          <CardText>
            <CardLink href={blog.url} target="_blank">
              View Blog
            </CardLink>
          </CardText>
          <Button
            type="button"
            onClick={handleLikeClick}
            color="primary"
            outline
          >Like</Button>
        </CardBody>
      </Card>
      <Card className='mt-2'>
        <CardBody>
          <CardTitle tag="h3">
          Comments
          </CardTitle>
          <Form onSubmit={handleCommentSubmit}>
            <FormGroup>
              <Input type="text" value={comment} onChange={({ target }) => setComment(target.value)}/>
            </FormGroup>
            <Button color="primary" outline>Add Comment</Button>
          </Form>
          <ListGroup className='mt-4'>
            {blog.comments.map(comment => <ListGroupItem key={comment.id}>{comment.content}</ListGroupItem>)}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  )
}

export default Blog