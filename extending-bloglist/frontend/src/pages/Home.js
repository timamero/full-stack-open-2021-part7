import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../components/Login'
import BlogList from '../components/BlogList'

const Home = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)


  // Sorted in descending order of number of likes
  const blogsSortedByLikes = blogs.sort((a, b) => {
    if (a.likes > b.likes) {
      return -1
    }
    if (a.likes < b.likes) {
      return 1
    }
    return 0
  })

  return (
    <div>
      {!user
        ?
        <Login />
        :
        <BlogList
          blogs={blogsSortedByLikes}
        />
      }
    </div>
  )
}

export default Home