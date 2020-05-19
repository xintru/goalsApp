export const convertGoalDate = (date) => {
  const currentDate = new Date(date)
  return currentDate.toLocaleDateString()
}
