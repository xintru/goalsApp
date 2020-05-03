// import React from 'react'
// import AliceCarousel from 'react-alice-carousel'
// import 'react-alice-carousel/lib/alice-carousel.css'

// const Carousel = () => {
//   const handleOnDragStart = (e) => e.preventDefault()

//   return (
//     <AliceCarousel
//       duration={500}
//       fadeOutAnimation
//       autoHeight
//       autoPlay
//       autoPlayInterval={2500}
//       buttonsDisabled
//     >
//       <img
//         src="/assets/images/starting_img_1.jpg"
//         onDragStart={handleOnDragStart}
//         className="yours-custom-class"
//         alt="Screenshot 1"
//       />
//       <img
//         src="/assets/images/starting_img_2.jpg"
//         onDragStart={handleOnDragStart}
//         className="yours-custom-class"
//         alt="Screenshot 2"
//       />
//       <img
//         src="/assets/images/starting_img_3.jpg"
//         onDragStart={handleOnDragStart}
//         className="yours-custom-class"
//         alt="Screenshot 3"
//       />
//     </AliceCarousel>
//   )
// }

// export default Carousel

import React, { Component } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

import { IconButton } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import './Gallery.css'

class Gallery extends Component {
  items = [
    '/assets/images/starting_img_1.jpg',
    '/assets/images/starting_img_2.jpg',
    '/assets/images/starting_img_3.jpg',
  ]

  state = {
    galleryItems: this.items.map((i) => (
      <img src={i} key={i} alt="screenshot" />
    )),
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <AliceCarousel
          infinite
          duration={500}
          fadeOutAnimation
          autoHeight
          autoPlay
          autoPlayInterval={2000}
          buttonsDisabled
          items={this.state.galleryItems}
          ref={(el) => (this.Carousel = el)}
        />
        <IconButton
          style={{ position: 'absolute', top: 320, left: 730 }}
          color="secondary"
          aria-label="arrow back"
          onClick={() => this.Carousel.slidePrev()}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          style={{ position: 'absolute', top: 320, right: 730 }}
          color="secondary"
          aria-label="arrow forward"
          onClick={() => this.Carousel.slideNext()}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    )
  }
}

export default Gallery
