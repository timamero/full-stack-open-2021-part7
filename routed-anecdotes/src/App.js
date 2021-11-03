import React, { useState } from 'react'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Menu from './components/Menu'
import Anecdote from './components/Anecdote'

import {
  Switch, Route, useRouteMatch
} from 'react-router-dom'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 10000)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  let matchAnecdote = useRouteMatch('/anecdotes/:id')
  console.log('matched anecdote', matchAnecdote)
  const anecdote = matchAnecdote
    ? anecdotes.find(a => a.id === matchAnecdote.params.id)
    : null
  console.log('matched anecdote', anecdote)

  return (

    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <p>{notification}</p>}
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote}/>
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} showNotification={showNotification}/>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes}/>
        </Route>
      </Switch>
      
      <Footer />
    </div>
  )
}

export default App;