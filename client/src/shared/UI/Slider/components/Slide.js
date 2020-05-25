import React, { useRef, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import LinkButton from '../../LinkButtons/LinkButton'

import classes from '../Slider.module.scss'
import {
  CONTENT_FADE_TRANSITION,
  FADE_TIME,
} from '../constants/sliderConstants'
import { SIGN_UP } from '../../../../util/constants/routes'

const Slide = (props) => {
  const timeoutRef = useRef()
  const slideRef = useRef()
  const contentFadeRef = useRef()
  const {
    slide: { src, button, headline, index },
    current,
    handleSlideClick,
  } = props

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  // Parallax effect while hovering

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

  // Image Loading

  const imageLoaded = (event) => {
    const styles = event.target.style
    styles.opacity = 1
  }

  // Content fade in while scrolling slider

  useEffect(() => {
    clearTimeout(timeoutRef.current)
    contentFadeRef.current.style.opacity = 0
    contentFadeRef.current.style.transition = 'none'
    timeoutRef.current = setTimeout(() => {
      if (current === index) {
        contentFadeRef.current.style.transition = CONTENT_FADE_TRANSITION
        contentFadeRef.current.style.opacity = 1
      }
    }, FADE_TIME)
  }, [current, index])

  return (
    <li
      role="presentation"
      ref={slideRef}
      className={classNames(
        classes.slide,
        current === index && classes['slide--current'],
        (current - 1 === index || current + 2 === index || index === -1) &&
          classes['slide--previous'],
        (current + 1 === index || current - 2 === index || index === 3) &&
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

      <article className={classes.slide__content} ref={contentFadeRef}>
        <h2 className={classes.slide__headline}>{headline}</h2>
        <LinkButton
          to={SIGN_UP}
          variant="contained"
          color="secondary"
          size="large"
        >
          {button}
        </LinkButton>
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
