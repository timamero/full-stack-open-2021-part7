import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ username, password, setUsername, setPassword, handleLoginSubmit }) => {

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

Login.propTypes = {
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLoginSubmit: PropTypes.func.isRequired,
}

export default Login