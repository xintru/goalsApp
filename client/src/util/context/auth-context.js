import { createContext } from 'react'

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
