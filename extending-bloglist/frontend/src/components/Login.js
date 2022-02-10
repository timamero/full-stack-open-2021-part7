import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { initializeUser } from '../reducers/userReducer'
import { setInfoMessage, setErrorMessage } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  return (
    <div>
      <h2>Login In To Application</h2>
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
  )
}

export default Login