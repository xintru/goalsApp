const calcGeneralProgress = (goals) =>
  (goals
    .map((goal) => {
      const completedNum = goal.subgoals.reduce((a, b) => a + b.completed, 0)
      return +(completedNum / (goal.subgoals.length || 1)).toFixed(2)
    })
    .reduce((a, b) => a + b, 0) /
    goals.length) *
  100

export default calcGeneralProgress
