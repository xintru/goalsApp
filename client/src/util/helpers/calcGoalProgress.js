const calcGoalProgress = (goal) =>
  +(
    goal.subgoals.reduce((a, b) => a + b.completed, 0) / goal.subgoals.length
  ).toFixed(2)

export default calcGoalProgress
