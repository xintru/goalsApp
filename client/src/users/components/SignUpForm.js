import React from 'react'
import { Typography, Button, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

import signupInputs from '../inputs/signup'
import useStyles from '../pages/Login.style'
import { signupFormState } from '../../util/customPropTypes/formPropTypes'

const SignUpForm = (props) => {
  const classes = useStyles()
  const { onSubmit, formState, onInputHandler } = props
  return (
    <form
      className={classes.card}
      onSubmit={onSubmit}
      noValidate
      autoComplete="no"
    >
      <Typography variant="h5">SignUp</Typography>
      {signupInputs.map((input) => (
        <TextField
          className={classes.textField}
          key={input.id}
          label={input.label}
          id={input.id}
          type={input.type}
          helperText={
            !formState.inputs[input.id].isValid &&
            formState.inputs[input.id].touched &&
            input.errorHint
          }
          error={
            !formState.inputs[input.id].isValid &&
            formState.inputs[input.id].touched
          }
          onChange={(evt) =>
            onInputHandler(input.id, evt.target.value.trimLeft())
          }
          onBlur={(evt) =>
            onInputHandler(input.id, evt.target.value.trimLeft())
          }
          value={formState.inputs[input.id].value}
        />
      ))}
      <Button
        disabled={!formState.formIsValid}
        type="submit"
        color="primary"
        variant="contained"
        className={classes.submitButton}
      >
        Submit
      </Button>
    </form>
  )
}

SignUpForm.propTypes = {
  formState: signupFormState.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputHandler: PropTypes.func.isRequired,
}

export default SignUpForm
