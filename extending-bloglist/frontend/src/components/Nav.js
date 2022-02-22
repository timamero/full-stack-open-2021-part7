import React from 'react'
import { useDispatch } from 'react-redux'
import { Nav as NavStrap, NavItem, NavLink, Button } from 'reactstrap'
import blogService from '../services/blogs'
import { logoutUser } from '../reducers/userReducer'
import { setInfoMessage } from '../reducers/notificationReducer'
import { Link, useLocation } from 'react-router-dom'

const Nav = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.clear()

    dispatch(logoutUser())
    blogService.setToken(null)

    dispatch(setInfoMessage('Successfully logged out', 10))
  }

  return (
    <NavStrap justified fill className='my-3'>
      <NavItem>
        <NavLink active={location.pathname === '/'} tag={Link} exact="true" to='/'>
          Blogs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={location.pathname === '/users'} tag={Link} exact="true" to='/users'>
          Users
        </NavLink>
      </NavItem>
      <NavItem>
        <Button outline onClick={handleLogout}>Logout</Button>
      </NavItem>
    </NavStrap>
  )
}

export default Nav