import { useReducer, useCallback } from 'react'

const checkValidity = (state, action) => {
  const newState = {
    ...state,
    inputs: {
      ...state.inputs,
      [action.id]: {
        ...state.inputs[action.id],
        value: action.value,
        isValid: state.inputs[action.id].validators
          .map(validator => validator(action.value))
          .reduce((a, b) => a && b),
        touched: true,
      },
    },
  }
  newState.formIsValid = Object.entries(newState.inputs)
    .map(input => input[1].isValid && input[1].touched)
    .reduce((a, b) => a && b)

  return newState
}

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return checkValidity(state, action)
    default:
      return state
  }
}

const useForm = (initialInputs, initialFormValidity) => {
  const inputObj = {}
  initialInputs.forEach(input => {
    inputObj[input.id] = {
      value: '',
      isValid: false,
      touched: false,
      validators: input.validators,
    }
  })
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: inputObj,
    formIsValid: initialFormValidity,
  })

  const onInputHandler = useCallback((id, value) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value,
      id,
    })
  }, [])

  return {
    formState,
    onInputHandler,
  }
}

export default useForm
