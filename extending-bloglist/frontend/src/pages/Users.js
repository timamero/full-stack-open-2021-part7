import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)
  console.log('users page', users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>Blogs Created</th>
        </tr>
        {users.map(user => {
          return (
            <tr key={user.id}>
              <td >{user.name}</td>
              <td >{user.blogs.length}</td>
            </tr>
          )}
        )
        }
      </table>
    </div>
  )
}

export default Users