export const getGoalDate = (date) => {
  const dateOption = Object.keys(date)
    .map((option) => date[option] && option)
    .filter(Boolean)[0]
  const today = new Date()
  switch (dateOption) {
    case 'week':
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      )
    case 'month':
      return (() => {
        if (today.getMonth() === 11) {
          return new Date(today.getFullYear() + 1, 0, today.getDate())
        }
        return new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          today.getDate()
        )
      })()
    case 'year':
      return new Date(
        today.getFullYear() + 1,
        today.getMonth(),
        today.getDate()
      )
    default:
      return today
  }
}
