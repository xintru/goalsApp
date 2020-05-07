import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSwipeable } from 'react-swipeable'

import Slide from './components/Slide'
import SliderControl from './components/SliderControl'
import classes from './Slider.module.scss'
import {
  ARROW_LEFT,
  ARROW_RIGHT,
  SLIDE_TRANSITION,
  TRANSFORM_NEXT,
  TRANSFORM_PREV,
  AUTOSLIDE_TIMER,
  SLIDE_TIME,
} from './constants/sliderConstants'

const Slider = (props) => {
  const { initialSlides } = props
  const [current, setCurrent] = useState(1)
  const [sliding, setSliding] = useState(false)
  const [direction, setDirection] = useState(0)
  const [slides, setSlides] = useState(initialSlides)

  const slidingTimeout = useRef(null)
  const slidingInterval = useRef(null)

  // Functions that work with slides array, basically they are used to control slides

  const handleNext = useCallback(() => {
    if (slidingTimeout.current) {
      clearTimeout(slidingTimeout.current)
    }
    setSliding(true)
    setDirection(1)
    slidingTimeout.current = setTimeout(() => {
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
    }, SLIDE_TIME)
  }, [slides.length])

  const handlePrev = useCallback(() => {
    if (slidingTimeout.current) {
      clearTimeout(slidingTimeout.current)
    }
    setSliding(true)
    setDirection(-1)
    slidingTimeout.current = setTimeout(() => {
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
    }, SLIDE_TIME)
  }, [slides.length])

  // handlers to allow swiping on mobile devices

  const swipeableHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
  })

  // helper that creates autoslide interval

  const createAutoSlideInterval = useCallback(() => {
    slidingInterval.current = setInterval(() => {
      handleNext()
    }, AUTOSLIDE_TIMER)
  }, [handleNext])

  const refreshAutoSlidingInterval = useCallback(() => {
    clearInterval(slidingInterval.current)
    createAutoSlideInterval()
  }, [createAutoSlideInterval])

  // Keyboard controls

  const keyboardHandler = useCallback(
    (event) => {
      refreshAutoSlidingInterval()
      if (event.keyCode === ARROW_LEFT) {
        handlePrev()
      }
      if (event.keyCode === ARROW_RIGHT) {
        handleNext()
      }
    },
    [handlePrev, handleNext, refreshAutoSlidingInterval]
  )

  useEffect(() => {
    document.addEventListener('keydown', keyboardHandler)
    createAutoSlideInterval()
    return () => {
      document.removeEventListener('keydown', keyboardHandler)
    }
  }, [keyboardHandler, createAutoSlideInterval])

  // Click-on-slide control

  const handleSlideClick = (index) => {
    refreshAutoSlidingInterval()
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

  // Sliding animation

  const slideActionStyle = () => {
    if (sliding) {
      if (direction > 0) {
        return {
          transform: TRANSFORM_NEXT(slides.length),
          transition: SLIDE_TRANSITION,
        }
      }
      return {
        transform: TRANSFORM_PREV(slides.length),
        transition: SLIDE_TRANSITION,
      }
    }
    return {}
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={classes.slider} {...swipeableHandlers}>
      <ul className={classes.slider__wrapper} style={slideActionStyle()}>
        <Slide
          key="slide_start_copy"
          slide={{ ...slides[slides.length - 1], index: -1 }}
          current={current}
          handleSlideClick={handleSlideClick}
        />
        {slides.map((slide) => {
          return (
            <React.Fragment key={`slider_main_${slide.order}`}>
              <Slide
                slide={slide}
                current={current}
                handleSlideClick={handleSlideClick}
              />
            </React.Fragment>
          )
        })}
        <Slide
          key="slide_end_copy"
          slide={{ ...slides[0], index: 3 }}
          current={current}
          handleSlideClick={handleSlideClick}
        />
      </ul>

      <div className={classes.slider__controls}>
        <SliderControl
          type="previous"
          title="Go to previous slide"
          handleClick={() => {
            refreshAutoSlidingInterval()
            handlePrev()
          }}
        />

        <SliderControl
          type="next"
          title="Go to next slide"
          handleClick={() => {
            refreshAutoSlidingInterval()
            handleNext()
          }}
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
