import { useState, useCallback, useRef, useEffect } from 'react'
import Axios from 'axios'

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const activeHttpRequests = useRef([])

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true)
      const httpAbortController = new AbortController()
      activeHttpRequests.current.push(httpAbortController)
      try {
        const response = await Axios({
          url,
          method,
          data: body,
          headers,
        })

        activeHttpRequests.current = activeHttpRequests.current.filter(
          controller => controller !== httpAbortController
        )

        setIsLoading(false)
        return response.data
      } catch (err) {
        setIsLoading(false)
        setError(err.message)
        throw err
      }
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(controller => controller.abort())
    }
  }, [])

  return {
    isLoading,
    error,
    request,
    clearError,
  }
}

export default useHttp
