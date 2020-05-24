/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { IconButton } from '@material-ui/core'

const LinkIconButton = (props) => {
  const { children, to, ...other } = props
  return (
    <Link to={to}>
      <IconButton {...other}>{children}</IconButton>
    </Link>
  )
}

LinkIconButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
}

export default LinkIconButton
