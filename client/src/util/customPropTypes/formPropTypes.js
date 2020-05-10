import PropTypes from 'prop-types'

export const formInput = PropTypes.shape({
  value: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf(PropTypes.func).isRequired,
}).isRequired

export const formState = PropTypes.shape({
  inputs: PropTypes.shape({
    title: formInput,
    description: formInput,
  }).isRequired,
  formIsValid: PropTypes.bool.isRequired,
}).isRequired
