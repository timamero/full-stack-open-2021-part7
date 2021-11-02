import React from 'react';
import { useParams } from 'react-router';

const Anecdote = ({ anecdote }) => {
  // const id = useParams().id
  // console.log('id ', id)
  // console.log('anecdotes list', anecdotes)
  // const anecdote = anecdotes.find(a => a.id === id)
  console.log('anecdote', anecdote)
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}

export default Anecdote