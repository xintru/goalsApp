import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'
import { HttpContext } from './http-context'
import { AuthContext } from './auth-context'
import * as type from '../constants/actions/user'

const noop = () => {}

const initialState = {
  user: {
    name: 'username',
    goals: [],
    avatar: '',
  },
}

const userReducer = (state, action) => {
  switch (action.type) {
    case type.SET_USER:
      return {
        ...state,
        user: action.user,
      }
    default:
      return state
  }
}

export const UserContext = createContext({ ...initialState, setUser: noop })

const UserStore = (props) => {
  const { children } = props
  const { request } = useContext(HttpContext)
  const { token } = useContext(AuthContext)
  const [userState, dispatch] = useReducer(userReducer, initialState)

  const setUser = useCallback(async () => {
    const response = await request('/api/user', 'GET', null, {
      Authorization: `Bearer ${token}`,
    })
    dispatch({ type: type.SET_USER, user: response.user })
  }, [request, dispatch, token])

  useEffect(() => {
    setUser()
  }, [setUser])

  return (
    <UserContext.Provider
      value={{
        user: userState.user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserStore.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserStore
