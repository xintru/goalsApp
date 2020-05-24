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
import { userReducer, initialState } from '../reducers/user'

const noop = () => {}

export const UserContext = createContext({
  ...initialState,
  setUser: noop,
  updateAvatar: noop,
  addGoal: noop,
  updateGoal: noop,
  deleteGoal: noop,
})

const UserStore = (props) => {
  const { children } = props
  const { request } = useContext(HttpContext)
  const { token, updateAuthAvatar } = useContext(AuthContext)
  const [userState, dispatch] = useReducer(userReducer, initialState)

  const setUser = useCallback(async () => {
    const response = await request(
      '/api/user',
      'GET',
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      'Получение данных...'
    )
    dispatch({ type: type.SET_USER, user: response.user })
  }, [request, dispatch, token])

  const updateAvatar = useCallback(
    async (image) => {
      const form = new FormData()
      form.append('image', image)
      const response = await request(
        '/api/user',
        'PATCH',
        form,
        {},
        'Обновление аватара...'
      )
      updateAuthAvatar(response.user.avatar)
      dispatch({ type: type.UPDATE_AVATAR, avatar: response.user.avatar })
    },
    [request, updateAuthAvatar]
  )

  const addGoal = useCallback(
    async (newGoal) => {
      const addedGoal = await request(
        '/api/goals',
        'POST',
        newGoal,
        {},
        'Добавление цели...'
      )
      dispatch({ type: type.ADD_GOAL, newGoal: addedGoal })
    },
    [request]
  )

  const updateGoal = useCallback(
    async (changedGoal, goalId) => {
      const updatedGoal = await request(
        `api/goals/${goalId}`,
        'PATCH',
        changedGoal,
        {},
        'Обновление цели...'
      )
      dispatch({ type: type.UPDATE_GOAL, updatedGoal })
    },
    [request, dispatch]
  )

  const deleteGoal = useCallback(
    async (goalId) => {
      const deletedGoal = await request(
        `api/goals/${goalId}`,
        'DELETE',
        null,
        {},
        'Удаление цели...'
      )
      dispatch({ type: type.DELETE_GOAL, deletedGoal })
    },
    [request, dispatch]
  )

  useEffect(() => {
    setUser()
  }, [setUser])

  return (
    <UserContext.Provider
      value={{
        user: userState.user,
        setUser,
        addGoal,
        updateGoal,
        deleteGoal,
        updateAvatar,
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
