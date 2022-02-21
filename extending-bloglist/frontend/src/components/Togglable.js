import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = visible ? { display: '' } : { display: 'none' }
  const hideWhenVisible = visible ? { display: 'none' } : { display: '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <Button type="button" onClick={toggleVisibility}>Cancel</Button>
      </div>
      <div style={hideWhenVisible}>
        <Button
          type="button"
          onClick={toggleVisibility}
          color="primary"
        >{props.buttonLabel}</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable