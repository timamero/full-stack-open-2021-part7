import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'reactstrap'
import { initializeBlogs } from './reducers/blogReducer'
import Message from './components/Message'
import blogService from './services/blogs'
import usersService from './services/users'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import Home from './pages/Home'
import Users from './pages/Users'
import User from './pages/User'
import Blog from './pages/Blog'
import Nav from './components/Nav'
import Header from './components/Header'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const errorMessage = useSelector(state => state.notification.error)
  const infoMessage = useSelector(state => state.notification.info)

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
      <Container>
        <Nav />
        {errorMessage
          && <Message
            className="error"
            message={errorMessage}
          />
        }
        {infoMessage
          && <Message
            message={infoMessage}
          />
        }
        <Header />
        <Switch>
          <Route exact path='/users'>
            <Users />
          </Route>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/blogs/:id'>
            <Blog />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>

  )
}

export default App