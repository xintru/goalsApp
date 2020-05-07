// slider.js
export const ARROW_LEFT = 37
export const ARROW_RIGHT = 39
export const AUTOSLIDE_TIMER = 5000
export const SLIDE_TIME = 650
export const SLIDE_TRANSITION = `transform ${SLIDE_TIME}ms ease-in`
export const TRANSFORM_NEXT = (length) => `translateX(-${100 / (length + 2)}%)`
export const TRANSFORM_PREV = (length) => `translateX(${100 / (length + 2)}%)`

// Slide.js

export const FADE_TIME = 300
export const CONTENT_FADE_TRANSITION = `opacity ${FADE_TIME}ms ease-out`
