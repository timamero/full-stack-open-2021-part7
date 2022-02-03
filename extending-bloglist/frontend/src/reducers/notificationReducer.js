const initialState = {
  error: null,
  info: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_ERROR':
    return { ...state, error: action.data.error }
  case 'SET_INFO':
    return { ...state, info: action.data.info }
  case 'RESET_NOTIFICATION':
    return { error: null, info: null }
  default:
    return state
  }
}

export const setErrorMessage = (error) => {
  return {
    type: 'SET_ERROR',
    data: {
      error
    }
  }
}

export const setInfoMessage = (info) => {
  return {
    type: 'SET_INFO',
    data: {
      info
    }
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default notificationReducer