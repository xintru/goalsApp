import React, { useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import classes from './Slider.module.scss'

const Slide = (props) => {
  const slideRef = useRef()
  const {
    slide: { src, button, headline, index },
    current,
    handleSlideClick,
  } = props

  const handleMouseMove = (event) => {
    const el = slideRef.current
    const r = el.getBoundingClientRect()
    el.style.setProperty(
      '--x',
      event.clientX - (r.left + Math.floor(r.width / 2))
    )
    el.style.setProperty(
      '--y',
      event.clientY - (r.top + Math.floor(r.height / 2))
    )
  }

  const handleMouseLeave = () => {
    slideRef.current.style.setProperty('--x', 0)
    slideRef.current.style.setProperty('--y', 0)
  }

  const handleSlideClicked = () => {
    handleSlideClick(props.slide.index)
  }

  const imageLoaded = (event) => {
    const styles = event.target.style
    styles.opacity = 1
  }

  return (
    <li
      role="presentation"
      ref={slideRef}
      className={classNames(
        classes.slide,
        current === index && classes['slide--current'],
        (current - 1 === index || current - 2 === index) &&
          classes['slide--previous'],
        (current + 1 === index || current + 2 === index) &&
          classes['slide--next']
      )}
      onClick={handleSlideClicked}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={classes['slide__image-wrapper']}>
        <img
          className={classes.slide__image}
          alt={headline}
          src={src}
          onLoad={imageLoaded}
        />
      </div>

      <article className={classes.slide__content}>
        <h2 className={classes.slide__headline}>{headline}</h2>
        <button
          type="button"
          className={classNames(classes.slide__action, classes.btn)}
        >
          {button}
        </button>
      </article>
    </li>
  )
}

Slide.propTypes = {
  slide: PropTypes.shape({
    index: PropTypes.number.isRequired,
    headline: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
  }).isRequired,
  current: PropTypes.number.isRequired,
  handleSlideClick: PropTypes.func.isRequired,
}

export default Slide
