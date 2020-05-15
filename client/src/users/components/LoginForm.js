import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

import loginInputs from '../inputs/login'
import { SIGN_UP } from '../../util/constants/routes'
import useStyles from '../pages/Login.style'
import { loginFormState } from '../../util/customPropTypes/formPropTypes'

const LoginForm = (props) => {
  const classes = useStyles()
  const { onSubmit, formState, onInputHandler } = props
  return (
    <form
      className={classes.card}
      onSubmit={onSubmit}
      noValidate
      autoComplete="no"
    >
      <Typography variant="h5">Вход</Typography>
      {loginInputs.map((input) => (
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
      <Typography className={classes.link}>
        <Link to={SIGN_UP}>Еще нет аккаунта?</Link>
      </Typography>
      <Button
        disabled={!formState.formIsValid}
        type="submit"
        color="primary"
        variant="contained"
        className={classes.submitButton}
      >
        Войти
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  formState: loginFormState.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputHandler: PropTypes.func.isRequired,
}

export default LoginForm
