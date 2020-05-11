import React from 'react'
import { Typography, Button } from '@material-ui/core'

import useStyles from './Goal.style'

const Goal = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h5">Название цели</Typography>\
      <Typography>Описание цели</Typography>
      <Button>Редактировать</Button>
      <Button>Удалить</Button>
    </div>
  )
}

export default Goal
