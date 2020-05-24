import { createContext } from 'react'

export const GoalContext = createContext({
  activeStep: null,
  steps: [],
  httpData: {},
  formIsValid: false,
  newGoal: false,
  handleNextStep: () => {},
  handlePrevStep: () => {},
  onSubmitHandler: () => {},
})
