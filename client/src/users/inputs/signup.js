import { required, length, email } from '../../util/helpers/formValidation'

const signupInputs = [
  {
    id: 'username',
    label: 'Username',
    errorHint: 'Required field.',
    validators: [required],
    type: 'text',
  },
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
  {
    id: 'confirmPassword',
    label: 'Confirm Password',
    errorHint: 'Must be at least 6 characters long.',
    validators: [required, length({ min: 6 })],
    type: 'password',
  },
]

export default signupInputs
