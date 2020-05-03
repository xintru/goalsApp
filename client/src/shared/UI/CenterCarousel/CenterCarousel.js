import React from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import './CenterCarousel.css'

const CenterCarousel = (props) => {
  const { children } = props
  return (
    <Slider className="center" centerMode dots slidesToShow={3} speed={500}>
      {children}
    </Slider>
  )
}

CenterCarousel.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CenterCarousel
