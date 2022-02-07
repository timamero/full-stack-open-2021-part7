import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, deleteBlog, updateBlogs } from './reducers/blogReducer'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Message from './components/Message'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeUser, logoutUser } from './reducers/userReducer'
import { setErrorMessage, setInfoMessage } from './reducers/notificationReducer'

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
      {!user
        ?
        <div>
          <h2>Login In To Application</h2>
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
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label>
              Username
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
              Password
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </label>
            </div>
            <input id="login-button" type="submit" value="login" />
          </form>
        </div>
        :
        <div id="blogs">
          <h2>Blogs</h2>
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
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <hr />
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <h2>Create New</h2>
            <CreateBlog handleCreateBlog={handleCreateBlog}/>
          </Togglable>
          <hr />
          {blogsSortedByLikes && blogsSortedByLikes.map(blog =>
            <Blog
              key={blog.id}
              id={blog.id}
              userName={user.name}
              handleUpdateBlog={handleUpdateBlog}
              handleDeleteBlog={handleDeleteBlog}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App