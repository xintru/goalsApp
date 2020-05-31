import { useCallback, useEffect, useReducer } from 'react'
import * as type from '../constants/actions/auth'
import LocalStorageService from '../services/LocalStorageService'
import authReducer, { initialState } from '../reducers/auth-hook-reducer'

const localStorageService = new LocalStorageService()

// Custom hook that shares info about user auth state through child components.
// Currently auth works via localStorage, but can obviously be switched just by addition of
// other storage decision. This hook is being used in Context "Store" which then forwards every
// method to child component. This hook is expected to be initialized on the one of the top levels
// of the application in order to get valuable info about token, as example.

const useAuth = () => {
  const [authState, dispatch] = useReducer(authReducer, initialState)

  const updateAvatar = useCallback(
    (avatar) => {
      const userData = localStorageService.getUserData()
      userData.avatar = avatar
      localStorageService.setUserData(userData)
      dispatch({ type: type.UPDATE_AVATAR, avatar })
    },
    [dispatch]
  )

  const login = useCallback((newToken, name, uid, avatar, expDate) => {
    dispatch({
      type: type.SET_EXP_DATE,
      expDate,
    })
    localStorageService.setUserData({
      userId: uid,
      username: name,
      avatar,
    })
    localStorageService.setToken({
      token: newToken,
      expDate,
    })
    dispatch({
      type: type.SET_AUTH_STATE,
      token: newToken,
      userId: uid,
      username: name,
      avatar,
    })
  }, [])

  const logout = useCallback(() => {
    dispatch({
      type: type.RESET_AUTH_STATE,
    })
    localStorageService.clearStorage()
  }, [])

  // Re-login if token is still valid.

  useEffect(() => {
    const storedTokenData = localStorageService.getToken()
    const storedUserData = localStorageService.getUserData()
    if (
      storedTokenData &&
      storedUserData &&
      storedTokenData.token &&
      new Date(storedTokenData.expDate) > new Date()
    ) {
      login(
        storedTokenData.token,
        storedUserData.username,
        storedUserData.userId,
        storedUserData.avatar,
        storedTokenData.expDate
      )
    }
  }, [login])

  // useEffect(() => {
  //   if (authState.token && authState.tokenExpirationDate) {
  //     const remainingTime =
  //       new Date(authState.tokenExpirationDate).getTime() - new Date().getTime()
  //     logoutTimer = setTimeout(logout, remainingTime)
  //   } else {
  //     clearTimeout(logoutTimer)
  //   }
  // }, [authState.token, logout, authState.tokenExpirationDate])

  return {
    ...authState,
    login,
    logout,
    updateAvatar,
  }
}

export default useAuth
