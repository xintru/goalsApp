/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const NavLinkButton = (props) => {
  const { children, to, activeClassName, ...other } = props
  return (
    <NavLink to={to} activeClassName={activeClassName}>
      <Button {...other}>{children}</Button>
    </NavLink>
  )
}

NavLinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  activeClassName: PropTypes.string.isRequired,
}

export default NavLinkButton
