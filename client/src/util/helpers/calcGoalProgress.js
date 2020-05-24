const calcGoalProgress = (goal) =>
  +(
    goal.subgoals.reduce((a, b) => a + b.completed, 0) / (goal.subgoals.length || 1)
  ).toFixed(2) * 100

export default calcGoalProgress
