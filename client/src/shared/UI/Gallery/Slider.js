import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import Slide from './Slide'
import SliderControl from './SliderControl'
import classes from './Slider.module.scss'

const Slider = (props) => {
  const { initialSlides } = props
  const [current, setCurrent] = useState(1)
  const [sliding, setSliding] = useState(false)
  const [direction, setDirection] = useState(0)
  const [slides, setSlides] = useState(initialSlides)

  const handleNext = useCallback(() => {
    setSliding(true)
    setDirection(1)
    setTimeout(() => {
      setSlides((prevSlides) => {
        const oldSlides = [...prevSlides]
        const hiddenSlide = oldSlides.shift()
        const newHiddenSlide = {
          ...hiddenSlide,
          order: oldSlides[oldSlides.length - 1].order + 1,
        }
        oldSlides.push(newHiddenSlide)
        const newSlides = oldSlides.map((s) => {
          return { ...s, order: s.order - 1 }
        })
        return newSlides
      })
      setSliding(false)
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 500)
  }, [slides.length])

  const handlePrev = useCallback(() => {
    setSliding(true)
    setDirection(-1)
    setTimeout(() => {
      setSlides((prevSlides) => {
        const oldSlides = [...prevSlides]
        let lastSlide = oldSlides.pop()
        lastSlide = { ...lastSlide, order: 0 }
        const newSlides = oldSlides.map((s) => {
          return { ...s, order: s.order + 1 }
        })
        newSlides.unshift(lastSlide)
        return newSlides
      })
      setSliding(false)
      setCurrent((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1))
    }, 500)
  }, [slides.length])

  const keyHandler = useCallback(
    (event) => {
      if (event.keyCode === 37) {
        handlePrev()
      }
      if (event.keyCode === 39) {
        handleNext()
      }
    },
    [handlePrev, handleNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler)
    }
  }, [keyHandler])

  const handleSlideClick = (index) => {
    if (current !== index) {
      if (index === slides.length - 1) {
        return current === 0 ? handlePrev() : handleNext()
      }
      if (index === 0) {
        return current === slides.length - 1 ? handleNext() : handlePrev()
      }
      if (index > current) {
        return handleNext()
      }
      if (index < current) {
        return handlePrev()
      }
    }
    return null
  }

  const slideActionStyle = () => {
    if (sliding) {
      if (direction > 0) {
        return {
          transform: `translateX(-${100 / slides.length}%)`,
          transition: 'transform 500ms ease-in',
        }
      }
      return {
        transform: `translateX(${100 / slides.length}%)`,
        transition: 'transform 500ms ease-in',
      }
    }
    return {}
  }

  return (
    <div className={classes.slider}>
      <ul className={classes.slider__wrapper} style={slideActionStyle()}>
        {slides.map((slide) => {
          return (
            <Slide
              key={slide.index}
              slide={slide}
              current={current}
              handleSlideClick={handleSlideClick}
            />
          )
        })}
      </ul>

      <div className={classes.slider__controls}>
        <SliderControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePrev}
        />

        <SliderControl
          type="next"
          title="Go to next slide"
          handleClick={handleNext}
        />
      </div>
    </div>
  )
}

Slider.propTypes = {
  initialSlides: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      headline: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
}

export default Slider
