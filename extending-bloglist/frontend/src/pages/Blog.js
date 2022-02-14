import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlogs } from '../reducers/blogReducer'
import { setInfoMessage, setErrorMessage } from '../reducers/notificationReducer'

const Blog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.filter(blog => blog.id === id)[0])
  const [likes, setLikes] = useState(0)

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

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span className="likes">likes: {likes}</span>{' '}
        <button type="button" onClick={handleLikeClick}>Like</button>
      </div>
      <p>Added by {blog.user.name}</p>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
      </ul>
    </div>
  )
}

export default Blog