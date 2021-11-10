import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useField } from '../hooks'

const CreateNew = ({ addNew, showNotification }) => {
  const history = useHistory()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    showNotification(`A new anecdote '${content.value}' created!`)
    history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={() => {content.onReset(); author.onReset(); info.onReset()}}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  )

}

export default CreateNew