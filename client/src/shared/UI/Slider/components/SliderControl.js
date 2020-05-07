import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import classes from '../Slider.module.scss'

const SliderControl = (props) => {
  const { type, title, handleClick } = props
  return (
    <button
      type="button"
      className={classNames(classes.btn, classes[`btn--${type}`])}
      title={title}
      onClick={handleClick}
    >
      <svg className={classes.icon} viewBox="0 0 24 24">
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
      </svg>
    </button>
  )
}

SliderControl.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default SliderControl
