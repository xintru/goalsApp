import React, { useState, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Avatar, Dialog, DialogContent, Button } from '@material-ui/core'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import SaveIcon from '@material-ui/icons/Save'

import { DEVELOPMENT_SERVER } from '../../../config/config'

import useStyles from './AvatarComponent.style'
import { UserContext } from '../../../util/context/user-context'

const AvatarComponent = (props) => {
  const { name, avatar } = props
  const [hovered, setHovered] = useState(false)
  const [avatarIsLoaded, setAvatarIsLoaded] = useState(false)
  const [newAvatar, setNewAvatar] = useState(null)
  const [preview, setPreview] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const { updateAvatar } = useContext(UserContext)
  const uploadRef = useRef(null)
  const classes = useStyles()

  const onImgUpload = (event) => {
    setNewAvatar(event.target.files[0])
    setPreview(URL.createObjectURL(event.target.files[0]))
    setAvatarIsLoaded(true)
  }

  const onAvatarPatchHandler = () => {
    updateAvatar(newAvatar)
  }

  const onCloseDialogHandler = () => {
    setDialogOpen(false)
    setAvatarIsLoaded(false)
    setNewAvatar(null)
  }

  const onOpenDialogHandler = () => {
    setDialogOpen(true)
  }

  return (
    <>
      <div
        role="presentation"
        className={classes.root}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onOpenDialogHandler}
      >
        <div className={classNames(hovered && classes.hovered)}>
          <Avatar
            alt={name}
            src={avatar ? DEVELOPMENT_SERVER + avatar : ''}
            className={classes.avatar}
          />
        </div>
        {hovered && (
          <AddPhotoAlternateIcon fontSize="large" className={classes.icon} />
        )}
      </div>
      <Dialog open={dialogOpen} onClose={onCloseDialogHandler}>
        <DialogContent>
          <div className={classes.dialog}>
            {avatarIsLoaded ? (
              <>
                <img
                  src={preview}
                  alt="preview"
                  onLoad={() => URL.revokeObjectURL(preview)}
                  className={classes.preview}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SaveIcon />}
                  onClick={onAvatarPatchHandler}
                >
                  Сохранить
                </Button>
              </>
            ) : (
              <>
                <input
                  ref={uploadRef}
                  style={{ display: 'none' }}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={onImgUpload}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddAPhotoIcon />}
                  onClick={() => uploadRef.current.click()}
                >
                  Загрузить
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

AvatarComponent.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
}

export default AvatarComponent
