import { useCallback, useEffect, useReducer } from 'react'
import * as type from '../constants/actions/auth'

let logoutTimer
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
      const data = localStorage.getItem('breadCrumbsUserData')
      const userData = JSON.parse(data)
      userData.avatar = avatar
      localStorage.setItem('breadCrumbsUserData', JSON.stringify(userData))
      dispatch({ type: type.UPDATE_AVATAR, avatar })
    },
    [dispatch]
  )

  const login = useCallback((newToken, name, uid, avatar, expDate) => {
    const expirationDate =
      expDate || new Date(new Date().getTime() + 1000 * 3600)
    dispatch({
      type: type.SET_EXP_DATE,
      expDate: expirationDate,
    })
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
    if (authState.token && authState.tokenExpirationDate) {
      const remainingTime =
        authState.tokenExpirationDate.getTime() - new Date().getTime()
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
