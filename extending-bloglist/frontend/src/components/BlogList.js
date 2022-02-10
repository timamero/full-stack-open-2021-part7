import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import Blog from './Blog'

const BlogList = ({ blogs, blogFormRef, handleCreateBlog, handleUpdateBlog, handleDeleteBlog }) => {
  const user = useSelector(state => state.user)


  return (
    <div id="blogs">
      {/* <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <hr /> */}
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <h2>Create New</h2>
        <CreateBlog handleCreateBlog={handleCreateBlog}/>
      </Togglable>
      <hr />
      {blogs && blogs.map(blog =>
        <Blog
          key={blog.id}
          id={blog.id}
          userName={user.name}
          handleUpdateBlog={handleUpdateBlog}
          handleDeleteBlog={handleDeleteBlog}
        />
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array,
  handleCreateBlog: PropTypes.func.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default BlogList