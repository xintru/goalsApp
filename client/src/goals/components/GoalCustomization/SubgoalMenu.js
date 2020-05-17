import React from 'react'
import PropTypes from 'prop-types'
import { Menu, MenuItem } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

const SubgoalMenu = (props) => {
  const { anchorEl, onClose, onDelete, index } = props
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!anchorEl}
      onClose={onClose}
    >
      <MenuItem
        onClick={() => {
          onClose()
          onDelete(index)
        }}
      >
        Удалить
        <Delete />
      </MenuItem>
    </Menu>
  )
}

SubgoalMenu.propTypes = {
  anchorEl: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
}

SubgoalMenu.defaultProps = {
  anchorEl: null,
}

export default SubgoalMenu
