import checkValidity from '../helpers/checkFormValidity'
import * as type from '../constants/actions/form-hook'

const formReducer = (state, action) => {
  switch (action.type) {
    case type.INPUT_CHANGE:
      return checkValidity(state, action)
    default:
      return state
  }
}

export default formReducer
