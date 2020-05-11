import * as type from '../constants/actions/user'
import updateGoal from '../helpers/updateGoal'

export const initialState = {
  user: {
    name: 'username',
    goals: [],
    avatar: '',
  },
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case type.SET_USER:
      return {
        ...state,
        user: action.user,
      }
    case type.ADD_GOAL:
      return {
        ...state,
        user: {
          ...state.user,
          goals: [...state.user.goals, action.newGoal],
        },
      }
    case type.UPDATE_GOAL:
      return updateGoal({ ...state }, { ...action })
    case type.DELETE_GOAL:
      return {
        ...state,
        user: {
          ...state.user,
          goals: state.user.goals.filter(
            (goal) => goal.id !== action.deletedGoal.id
          ),
        },
      }
    default:
      return state
  }
}
