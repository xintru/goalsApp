const updateGoal = (state, action) => {
  const goalIndex = state.user.goals.findIndex(
    (goal) => goal.id === action.updatedGoal.id
  )
  // State is supposed to be a copy, that's why i'm mutating it
  const { goals } = state.user
  goals[goalIndex] = action.updatedGoal
  return {
    ...state,
    user: {
      ...state.user,
      goals,
    },
  }
}

export default updateGoal
