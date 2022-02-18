import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const CreateBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleCreateBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>
          Title
        </Label>
        <Input
          required
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>
          Author
        </Label>
        <Input
          required
          id="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>
          URL
        </Label>
        <Input
          required
          id="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </FormGroup>
      <Button id="create-blog-button" type="submit" value="Create">Create</Button>
    </Form>
  )
}

CreateBlog.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired
}

export default CreateBlog