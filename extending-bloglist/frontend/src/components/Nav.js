import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { logoutUser } from '../reducers/userReducer'
import { setInfoMessage } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Nav = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if (!user) {
    return null
  }

  const navStyle = {
    display: 'flex',
    flexDirection : 'row',
    alignItems: 'center'
  }

  const handleLogout = () => {
    window.localStorage.clear()

    dispatch(logoutUser())
    blogService.setToken(null)

    dispatch(setInfoMessage('Successfully logged out', 10))
  }

  return (
    <div style={navStyle}>
      <Link to='/'>Blogs</Link>
      <Link to='/users'>Users</Link>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Nav