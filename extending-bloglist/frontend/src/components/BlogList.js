import React from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs, blogFormRef, handleCreateBlog }) => {
  const blogStyle = {
    display: 'block',
    border: '1px solid black',
    borderRadius: '0.2rem',
    margin: '1rem 0',
    padding: '0.5rem'
  }

  return (
    <div id="blogs">
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <h2>Create New</h2>
        <CreateBlog handleCreateBlog={handleCreateBlog}/>
      </Togglable>
      <hr />
      {blogs && blogs.map(blog =>
        <Link key={blog.id} to={`/blogs/${blog.id}`} style={blogStyle}>{blog.title}</Link>
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array,
  handleCreateBlog: PropTypes.func.isRequired,
}

export default BlogList