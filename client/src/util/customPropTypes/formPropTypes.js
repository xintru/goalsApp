import PropTypes from 'prop-types'

export const formInput = PropTypes.shape({
  value: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf(PropTypes.func).isRequired,
})

export const loginFormState = PropTypes.shape({
  inputs: PropTypes.shape({
    email: formInput,
    password: formInput,
  }).isRequired,
  formIsValid: PropTypes.bool.isRequired,
})

export const signupFormState = PropTypes.shape({
  inputs: PropTypes.shape({
    username: formInput,
    email: formInput,
    password: formInput,
    confimPassword: formInput,
  }).isRequired,
  formIsValid: PropTypes.bool.isRequired,
})
