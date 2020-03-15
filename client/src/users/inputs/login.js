import { required, length, email } from '../../util/helpers/formValidation'

const loginInputs = [
  {
    id: 'email',
    label: 'Email',
    errorHint: 'Email is required.',
    validators: [required, email],
    type: 'text',
  },
  {
    id: 'password',
    label: 'Password',
    errorHint: 'Must be at least 6 characters long.',
    validators: [required, length({ min: 6 })],
    type: 'password',
  },
]

export default loginInputs
