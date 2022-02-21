import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setInfoMessage, setErrorMessage } from '../reducers/notificationReducer'
import { Card } from 'reactstrap'

const BlogList = ({ blogs }) => {
  const dispatch = useDispatch()

  // const blogStyle = {
  //   display: 'block',
  //   border: '1px solid black',
  //   borderRadius: '0.2rem',
  //   margin: '1rem 0',
  //   padding: '0.5rem'
  // }

  const blogFormRef = useRef()

  const handleCreateBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()

      dispatch(createBlog(blogObject))

      dispatch(setInfoMessage(`The blog ${blogObject.title} by ${blogObject.author} was added`, 10))

    } catch (exception) {
      dispatch(setErrorMessage('Blog was not added', 10))
    }
  }

  return (
    <div id="blogs">
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <h2>Create New</h2>
        <CreateBlog handleCreateBlog={handleCreateBlog}/>
      </Togglable>
      {blogs && blogs.map(blog =>
        <Card key={blog.id} className="my-2" body>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </Card>
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array,
}

export default BlogList