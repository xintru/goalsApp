import { useState, useCallback, useEffect } from 'react'

const useAuth = () => {
  const [token, setToken] = useState(null)

  const login = newToken => setToken(newToken)

  const logout = useCallback(() => {
    setToken(null)
  }, [])

  useEffect(() => {
    console.log(token)
  }, [token])

  return {
    token,
    login,
    logout,
  }
}

export default useAuth
