import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, CardBody, CardSubtitle, CardTitle, List } from 'reactstrap'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.filter(user => user.id === id)[0])

  if (!user) {
    return null
  }

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h2">
          {user.name}
        </CardTitle>
        <CardSubtitle tag="h3" className="mb-2 text-muted">
          Added Blogs
        </CardSubtitle>
        <List type="unstyled">
          {user.blogs.map(blog => <li key={blog.id} className="py-1">{blog.title}</li>)}
        </List>
      </CardBody>
    </Card>
  )
}

export default User