import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import useHttp from '../hooks/http-hook'

const noop = () => {}

export const HttpContext = createContext({
  isLoading: false,
  loadingMessage: '',
  errorMessage: '',
  request: noop,
  clearError: noop,
})

const HttpStore = (props) => {
  const { children } = props
  const {
    isLoading,
    loadingMessage,
    errorMessage,
    request,
    clearError,
  } = useHttp()
  return (
    <HttpContext.Provider
      value={{ isLoading, loadingMessage, errorMessage, request, clearError }}
    >
      {children}
    </HttpContext.Provider>
  )
}

HttpStore.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HttpStore
