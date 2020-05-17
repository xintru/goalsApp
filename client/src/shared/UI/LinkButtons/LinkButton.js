/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const LinkButton = (props) => {
  const { children, to, ...other } = props
  return (
    <Link to={to}>
      <Button {...other}>{children}</Button>
    </Link>
  )
}

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
}

export default LinkButton
