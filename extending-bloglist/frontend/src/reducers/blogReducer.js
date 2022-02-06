import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return [...action.data.blogs]
  case 'CREATE_BLOG':
    return state.concat(action.data.blog)
  case 'UPDATE_BLOGS':
    return [...action.data.blogs]
  case 'DELETE_BLOG':
    return [...state.filter(blog => blog.id !== action.data.id)]
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: {
        blogs
      }
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const blog = await blogService.create(blogObject)
    dispatch({
      type: 'CREATE_BLOG',
      data: {
        blog
      }
    })
  }
}

export const updateBlogs = (updatedBlog) => {
  return async dispatch => {
    await blogService.update(updatedBlog.id, updatedBlog)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'UPDATE_BLOGS',
      data: {
        blogs
      }
    })
  }
}

export const deleteBlog = (id) => {
  return  async dispatch => {
    await blogService.deleteObj(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        id
      }
    })
  }
}

export default blogReducer