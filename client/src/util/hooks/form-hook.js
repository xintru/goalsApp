import { useReducer, useCallback } from 'react'
import formReducer from '../reducers/form-hook-reducer'
import * as type from '../constants/actions/form-hook'

// Custom hook which main purpose is to track input and overall form values and their validity.

const useForm = (initialInputs, initialFormValidity) => {
  const inputObj = {}

  initialInputs.forEach((input) => {
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
      type: type.INPUT_CHANGE,
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
