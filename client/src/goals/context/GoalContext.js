import { createContext } from 'react'

export const GoalContext = createContext({
  activeStep: null,
  steps: [],
  formIsValid: false,
  handleNextStep: () => {},
  handlePrevStep: () => {},
  onSubmitHandler: () => {},
})
