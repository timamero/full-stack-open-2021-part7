const userReducer = (state = {}, action) => {
  switch(action.type) {
  case 'INIT_USER':
    console.log('initialize user', action.data.user)
    return { ...action.data.user }
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

export const initializeUser = (user) => {
  return {
    type: 'INIT_USER',
    data: {
      user
    }
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  }
}

export default userReducer