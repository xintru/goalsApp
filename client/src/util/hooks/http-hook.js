import { useState, useCallback, useRef, useEffect } from 'react'
import axios from '../axiosInstance/axiosInstance'

// Custom hook for http. Uses custom axios which modifies requests and responses to
// work with access/refresh tokens. Tracks in which state request currently is, such as loading, as example.
// Also is responsible for messages in snackbar, either errors or loading messages.
// Finally, tracks active requests and aborts them if needed.

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const activeHttpRequests = useRef([])

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
