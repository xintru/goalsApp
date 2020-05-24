const calcGeneralProgress = (goals) =>
  goals
    .map((goal) => {
      const completedNum = goal.subgoals.reduce((a, b) => a + b.completed, 0)
      return +(completedNum / goal.subgoals.length).toFixed(2)
    })
    .reduce((a, b) => a + b, 0) / goals.length

export default calcGeneralProgress
