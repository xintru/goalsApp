import React from 'react'
import propTypes from 'prop-types'
import { SwipeableDrawer } from '@material-ui/core'
import useStyles from './Drawer.style'

const Drawer = (props) => {
  const { open, onClose, onOpen, children } = props
  const classes = useStyles()
  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <div className={`${classes.root} centered`}>{children}</div>
    </SwipeableDrawer>
  )
}

Drawer.propTypes = {
  children: propTypes.node.isRequired,
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onOpen: propTypes.func.isRequired,
}

export default Drawer
