import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)
  console.log('users page', users)
  return (
    <div>
      <h2>Users</h2>
    </div>
  )
}

export default Users