import { useCallback, useEffect, useReducer } from 'react'
import * as type from '../constants/actions/auth'
import LocalStorageService from '../services/LocalStorageService'

let logoutTimer
const localStorageService = new LocalStorageService()

const initialState = {
  token: '',
  tokenExpirationDate: '',
  userId: '',
  username: '',
  userAvatar: '',
}

const authReducer = (state, action) => {
  switch (action.type) {
    case type.SET_AUTH_STATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        username: action.username,
        userAvatar: action.avatar,
      }
    case type.SET_EXP_DATE:
      return {
        ...state,
        tokenExpirationDate: action.expDate,
      }
    case type.RESET_AUTH_STATE:
      return initialState
    case type.UPDATE_AVATAR: {
      return {
        ...state,
        userAvatar: action.avatar,
      }
    }
    default:
      return state
  }
}

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

  useEffect(() => {
    if (authState.token && authState.tokenExpirationDate) {
      const remainingTime =
        new Date(authState.tokenExpirationDate).getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [authState.token, logout, authState.tokenExpirationDate])

  return {
    ...authState,
    login,
    logout,
    updateAvatar,
  }
}

export default useAuth
