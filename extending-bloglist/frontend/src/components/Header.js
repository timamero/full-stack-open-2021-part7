import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap'

const Header = () => {
  const user = useSelector(state => state.user)

  if (!user) {
    return null
  }

  return (
    <Card>
      <CardBody>
        <CardTitle tag='h2'>
          Blog App
        </CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {user.name} Logged In
        </CardSubtitle>
      </CardBody>
    </Card>
  )
}

export default Header