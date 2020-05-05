import React from 'react'

import { Typography } from '@material-ui/core'

import useStyles from './ActiveGoals.style'

const ActiveGoals = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h5">Активные цели:</Typography>
    </div>
  )
}

export default ActiveGoals
