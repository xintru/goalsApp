import { useState, useCallback, useRef, useEffect } from 'react'
import axios from 'axios'

const createTokenInterceptor = (token) => (request) => {
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  } else {
    delete request.headers.Authorization
  }
  return request
}

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const activeHttpRequests = useRef([])

  // Token interceptor
  const userData = localStorage.getItem('breadCrumbsUserData')
  if (userData) {
    const { token } = JSON.parse(userData)
    const setTokenCb = createTokenInterceptor(token)
    axios.interceptors.request.use(setTokenCb, (error) => Promise.reject(error))
  }

  const request = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = {},
      loadMessage = 'Loading...'
    ) => {
      setIsLoading(true)
      setLoadingMessage(loadMessage)
      const httpAbortController = new AbortController()
      activeHttpRequests.current.push(httpAbortController)
      try {
        const response = await axios({
          url,
          method,
          data: body,
          headers,
        })

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (controller) => controller !== httpAbortController
        )

        setIsLoading(false)
        setLoadingMessage('')
        return response.data
      } catch (err) {
        setIsLoading(false)
        setLoadingMessage('')
        setErrorMessage(err.response.data.message)
        throw err
      }
    },
    []
  )

  const clearError = () => {
    setErrorMessage(null)
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((controller) => controller.abort())
    }
  }, [])

  return {
    isLoading,
    loadingMessage,
    errorMessage,
    request,
    clearError,
  }
}

export default useHttp
