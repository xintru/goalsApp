import { useState, useCallback, useEffect } from 'react'

let logoutTimer

const useAuth = () => {
  const [token, setToken] = useState()
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [userId, setUserId] = useState()
  const [username, setUsername] = useState()
  const [userAvatar, setUserAvatar] = useState()

  const login = useCallback((newToken, name, uid, avatar, expDate) => {
    setToken(newToken)
    const expirationDate =
      expDate || new Date(new Date().getTime() + 1000 * 3600)
    setTokenExpirationDate(expirationDate)
    localStorage.setItem(
      'breadCrumbsUserData',
      JSON.stringify({
        userId: uid,
        username: name,
        token: newToken,
        expiration: expirationDate.toISOString(),
        avatar,
      })
    )
    setUserAvatar(avatar)
    setUsername(name)
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setUserId(null)
    setUsername(null)
    localStorage.removeItem('breadCrumbsUserData')
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('breadCrumbsUserData'))
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.token,
        storedData.username,
        storedData.userId,
        storedData.avatar,
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
    username,
    userAvatar,
    login,
    logout,
  }
}

export default useAuth
