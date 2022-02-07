import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, deleteBlog, updateBlogs } from './reducers/blogReducer'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeUser, logoutUser } from './reducers/userReducer'
import { setErrorMessage, setInfoMessage } from './reducers/notificationReducer'
import Login from './components/Login'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const errorMessage = useSelector(state => state.notification.error)
  const infoMessage = useSelector(state => state.notification.info)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const messageStyle = {
    borderRadius: 5,
    padding: 8,
    marginTop: 16,
    marginBottom: 16,
    width: 'max-content',
    fontSize: 20
  }

  const infoMessageStyle = {
    ...messageStyle,
    border: '2px solid #29A33B',
    color: '#29A33B'
  }

  const errorMessageStyle = {
    ...messageStyle,
    border: '2px solid #A32929',
    color: '#A32929'
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(initializeUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(initializeUser(user))
      setUsername('')
      setPassword('')

      dispatch(setInfoMessage('Successfully logged in', 10))

    } catch(error) {
      console.log('error: ', error)

      dispatch(setErrorMessage('The username or password you entered was incorrect', 10))
    }
  }

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
      {errorMessage
          && <Message
            className="error"
            message={errorMessage}
            style={errorMessageStyle}
          />
      }
      {infoMessage
          && <Message
            message={infoMessage}
            style={infoMessageStyle}
          />
      }
      {!user
        ?
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLoginSubmit={handleLoginSubmit}
        />
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

export default App