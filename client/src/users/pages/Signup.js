import React, { useContext } from 'react'
import { Paper, Typography, TextField, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../../util/context/auth-context'
import { HttpContext } from '../../util/context/http-context'
import useStyles from './Signup.style'
import signupInputs from '../inputs/signup'
import useForm from '../../util/hooks/form-hook'

const Signup = () => {
  const { formState, onInputHandler } = useForm(signupInputs, false)
  const history = useHistory()
  const classes = useStyles()
  const { request } = useContext(HttpContext)
  const { login } = useContext(AuthContext)

  const onAuthenticateHandler = async (event) => {
    event.preventDefault()
    try {
      const response = await request(
        '/api/auth/signup',
        'POST',
        {
          name: formState.inputs.username.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          confirmPassword: formState.inputs.confirmPassword.value,
        },
        null,
        'Signing you up...'
      )
      login(response.token, response.name, response.userId)
      history.push('/')
      // eslint-disable-next-line no-empty
    } catch (error) {}
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
      </Paper>
    </div>
  )
}
export default Signup
