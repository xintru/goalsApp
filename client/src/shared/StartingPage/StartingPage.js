import React from 'react'
import { Typography, Button, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'

import useStyles from './StartingPage.style'
import Slider from '../UI/Slider/Slider'
import { SIGN_UP } from '../../util/constants/routes'
import { initialSlides } from '../../util/constants/startingPageSlides'

const StartingPage = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.infoContainer}>
        <Typography variant="h2" className={classes.title}>
          BREAD
          <Box component="span" color="secondary.main">
            CRUMBS
          </Box>
        </Typography>
        <Typography>
          Решение для тех, кто хочет ставить цели и достигать их быстро и
          эффективно.
        </Typography>
      </div>
      <Slider initialSlides={initialSlides} />
      <Link to={SIGN_UP}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={classes.btn}
        >
          НАЧАТЬ СЕЙЧАС
        </Button>
      </Link>
    </div>
  )
}

export default StartingPage
