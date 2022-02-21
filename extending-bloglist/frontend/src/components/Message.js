import React from 'react'
import { Alert } from 'reactstrap'

const Message = ({ message, className = '' }) => {
  const color = className === 'error' ? 'danger' : 'success'
  return (
    <Alert className={className} color={color}>{message}</Alert>
  )
}

export default Message