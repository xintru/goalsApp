import React, { useContext } from 'react'
import { Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../../util/context/auth-context'
import { HttpContext } from '../../util/context/http-context'
import useStyles from './Signup.style'
import signupInputs from '../inputs/signup'
import useForm from '../../util/hooks/form-hook'
import SignUpForm from '../components/SignUpForm'

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
        {},
        'Регистрация выполняется...'
      )
      login(
        response.token,
        response.name,
        response.userId,
        response.avatar,
        response.expDate
      )
      history.push('/')
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <SignUpForm
          onSubmit={onAuthenticateHandler}
          formState={formState}
          onInputHandler={onInputHandler}
        />
      </Paper>
    </div>
  )
}
export default Signup
