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

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

let timeoutID
export const setErrorMessage = (error, timeout) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_ERROR',
      data: {
        error
      }
    })
    timeoutID = setTimeout(() => dispatch(resetNotification()), timeout*1000)
  }
}

export const setInfoMessage = (info, timeout) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_INFO',
      data: {
        info
      }
    })
    timeoutID = setTimeout(() => dispatch(resetNotification()), timeout*1000)
  }
}

export default notificationReducer