import React from 'react'
import { Typography, Button, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Gallery from '../UI/Gallery/Gallery'
// import Carousel from '../UI/Carousel/Carousel'
// import CenterCarousel from '../UI/CenterCarousel/CenterCarousel'

import useStyles from './StartingPage.style'

const StartingPage = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.infoContainer}>
        <Typography variant="h2" className={classes.title}>
          BREAD
          <Box component="span" color="#FF5722">
            CRUMBS
          </Box>
        </Typography>
        <Typography>
          Решение для тех, кто хочет ставить цели и достигать их быстро и
          эффективно.
        </Typography>
      </div>
      <Gallery />
      {/* <CenterCarousel className={classes.carousel}>
        <img src="/assets/images/starting_img.jpg" alt="Screenshot 1" />
        <img src="/assets/images/starting_img.jpg" alt="Screenshot 2" />
        <img src="/assets/images/starting_img.jpg" alt="Screenshot 3" />
        <img src="/assets/images/starting_img.jpg" alt="Screenshot 4" />
      </CenterCarousel> */}
      <Link to="/sign_up">
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
