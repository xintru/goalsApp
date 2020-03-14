import { createContext } from 'react'

const noop = () => {}

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: noop,
  logout: noop,
})