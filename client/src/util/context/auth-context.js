import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import useAuth from '../hooks/auth-hook'

const noop = () => {}

export const AuthContext = createContext({
  isLoggedIn: false,
  username: '',
  token: null,
  userId: null,
  userAvatar: '',
  login: noop,
  logout: noop,
})

const AuthStore = (props) => {
  const { children } = props
  const { username, token, userAvatar, login, logout } = useAuth()
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        username,
        userAvatar,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthStore.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthStore
