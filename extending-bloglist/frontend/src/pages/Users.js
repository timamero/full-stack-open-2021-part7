import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardTitle, Table } from 'reactstrap'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h2">
          Users
        </CardTitle>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blogs.length}</td>
                </tr>
              )}
            )
            }
          </tbody>
        </Table>
      </CardBody>

    </Card>
  )
}

export default Users