import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, CardBody, CardSubtitle, CardTitle, ListGroup, ListGroupItem } from 'reactstrap'

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
        <ListGroup flush>
          {user.blogs.map(blog => <ListGroupItem key={blog.id} className="py-1">{blog.title}</ListGroupItem>)}
        </ListGroup>
      </CardBody>
    </Card>
  )
}

export default User