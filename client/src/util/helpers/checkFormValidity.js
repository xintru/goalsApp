// State validity checker for useForm hook

const checkValidity = (state, action) => {
  const newState = {
    ...state,
    inputs: {
      ...state.inputs,
      [action.id]: {
        ...state.inputs[action.id],
        value: action.value,
        isValid: state.inputs[action.id].validators
          .map((validator) => validator(action.value))
          .reduce((a, b) => a && b),
        touched: true,
      },
    },
  }
  newState.formIsValid = Object.entries(newState.inputs)
    .map((input) => input[1].isValid && input[1].touched)
    .reduce((a, b) => a && b)

  return newState
}

export default checkValidity
