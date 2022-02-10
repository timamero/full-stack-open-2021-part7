import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import Message from './components/Message'
import blogService from './services/blogs'
import usersService from './services/users'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import Home from './pages/Home'
import Users from './pages/Users'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const errorMessage = useSelector(state => state.notification.error)
  const infoMessage = useSelector(state => state.notification.info)

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

  useEffect(() => {
    if (user) {
      usersService.getAll()
        .then(users => dispatch(initializeUsers(users)))
    }
  }, [user])

  return (
    <Router>
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
      <Switch>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>

  )
}

export default App