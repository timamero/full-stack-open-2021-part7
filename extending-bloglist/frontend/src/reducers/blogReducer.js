const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return [...action.data.blogs]
  case 'ADD_BLOG':
    return state.concat(action.data.blog)
  case 'DELETE_BLOG':
    return [...state.filter(blog => blog.id !== action.data.id)]
  default:
    return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: {
      blogs
    }
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    data: {
      blog
    }
  }
}

export const deleteBlog = (id) => {
  return {
    type: 'DELETE_BLOG',
    data: {
      id
    }
  }
}

export default blogReducer