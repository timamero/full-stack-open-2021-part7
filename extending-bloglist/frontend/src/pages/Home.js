import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from '../components/Login'
import BlogList from '../components/BlogList'
import blogService from '../services/blogs'
import { logoutUser } from '../reducers/userReducer'
import { setInfoMessage, setErrorMessage } from '../reducers/notificationReducer'
import { createBlog, updateBlogs, deleteBlog } from '../reducers/blogReducer'

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  const handleLogout = () => {
    window.localStorage.clear()

    dispatch(logoutUser())
    blogService.setToken(null)

    dispatch(setInfoMessage('Successfully logged out', 10))
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()

      dispatch(createBlog(blogObject))

      dispatch(setInfoMessage(`The blog ${blogObject.title} by ${blogObject.author} was added`, 10))

    } catch (exception) {
      dispatch(setErrorMessage('Blog was not added', 10))
    }
  }

  const handleUpdateBlog = async (updatedBlog) => {
    try {
      dispatch(updateBlogs(updatedBlog))

      dispatch(setInfoMessage(`Blog ${updatedBlog.title} was updated`, 10))
    } catch (exceptions) {
      dispatch(setErrorMessage('Blog not updated', 10))
    }
  }

  const handleDeleteBlog = async (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      try {
        dispatch(deleteBlog(id))

        dispatch(setInfoMessage('Removed blog', 10))
      } catch (exceptions) {
        dispatch(setErrorMessage('Blog not deleted', 10))
      }
    }
  }

  // Sorted in descending order of number of likes
  const blogsSortedByLikes = blogs.sort((a, b) => {
    if (a.likes > b.likes) {
      return -1
    }
    if (a.likes < b.likes) {
      return 1
    }
    return 0
  })

  return (
    <div>
      {!user
        ?
        <Login />
        :
        <BlogList
          blogs={blogsSortedByLikes}
          blogFormRef={blogFormRef}
          handleCreateBlog={handleCreateBlog}
          handleUpdateBlog={handleUpdateBlog}
          handleDeleteBlog={handleDeleteBlog}
          handleLogout={handleLogout}
        />
      }
    </div>
  )
}

export default Home