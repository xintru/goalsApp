import { createContext } from 'react'

const noop = () => {}

export const HttpContext = createContext({
  isLoading: false,
  loadingMessage: '',
  errorMessage: '',
  request: noop,
  clearError: noop,
})
