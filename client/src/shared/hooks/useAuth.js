import { useState, useCallback } from 'react'

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true)
  })

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  })

  return {
    isLoggedIn,
    login,
    logout,
  }
}

export default useAuth
