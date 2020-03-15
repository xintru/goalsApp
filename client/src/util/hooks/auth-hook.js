import { useState, useCallback, useEffect } from 'react'

let logoutTimer

const useAuth = () => {
  const [token, setToken] = useState()
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [userId, setUserId] = useState()

  const login = useCallback((newToken, uid, expDate) => {
    setToken(newToken)
    const expirationDate =
      expDate || new Date(new Date().getTime() + 1000 * 360)
    setTokenExpirationDate(expirationDate)
    localStorage.setItem(
      'diplomaUserData',
      JSON.stringify({
        userId: uid,
        token: newToken,
        expiration: expirationDate.toISOString(),
      })
    )
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setUserId(null)
    localStorage.removeItem('diplomaUserData')
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('diplomaUserData'))
    console.log(storedData)
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.token,
        storedData.userId,
        new Date(storedData.expiration)
      )
    }
  }, [login])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])

  return {
    token,
    userId,
    login,
    logout,
  }
}

export default useAuth
