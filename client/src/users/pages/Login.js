import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Paper, Typography, TextField, Button } from '@material-ui/core'

import { AuthContext } from '../../util/context/auth-context'
import useStyles from './Login.style'
import { SIGN_UP } from '../../util/constants/routes'
import useHttp from '../../util/hooks/http-hook'
import useForm from '../../util/hooks/form-hook'
import loginInputs from '../inputs/login'

const Login = () => {
  const { formState, onInputHandler } = useForm(loginInputs, false)
  const classes = useStyles()
  const { request } = useHttp()
  const { login } = useContext(AuthContext)
  const history = useHistory()

  const onAuthenticateHandler = async event => {
    event.preventDefault()
    const response = await request('/api/auth/login', 'POST', {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    })
    login(response.token, response.userId)
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <Paper>
        <form
          className={classes.card}
          onSubmit={onAuthenticateHandler}
          noValidate
          autoComplete="no"
        >
          <Typography variant="h5">Login</Typography>
          {loginInputs.map(input => (
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
              onChange={evt =>
                onInputHandler(input.id, evt.target.value.trimLeft())
              }
              onBlur={evt =>
                onInputHandler(input.id, evt.target.value.trimLeft())
              }
              value={formState.inputs[input.id].value}
            />
          ))}
          <Typography className={classes.link}>
            <Link to={SIGN_UP}>Don&apos;t have an account yet?</Link>
          </Typography>
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
      </Paper>
    </div>
  )
}
export default Login
