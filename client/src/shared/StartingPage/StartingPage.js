import React from 'react'
import { Typography, Box } from '@material-ui/core'

import useStyles from './StartingPage.style'
import Slider from '../UI/Slider/Slider'
import { initialSlides } from '../../util/constants/startingPageSlides'

const StartingPage = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.infoContainer}>
        <Typography variant="h1" className={classes.title}>
          BREAD
          <Box component="span" color="secondary.main">
            CRUMBS
          </Box>
        </Typography>
        <Typography className={classes.description} variant="h6">Минималистичный онлайн-трекер целей и задач</Typography>
      </div>
      <Slider initialSlides={initialSlides} />
    </div>
  )
}

export default StartingPage
