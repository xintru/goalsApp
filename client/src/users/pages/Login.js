import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Paper } from '@material-ui/core'

import { AuthContext } from '../../util/context/auth-context'
import { HttpContext } from '../../util/context/http-context'
import useStyles from './Login.style'
import useForm from '../../util/hooks/form-hook'
import loginInputs from '../inputs/login'
import LoginForm from '../components/LoginForm'

const Login = () => {
  const { formState, onInputHandler } = useForm(loginInputs, false)
  const classes = useStyles()
  const { request } = useContext(HttpContext)
  const { login } = useContext(AuthContext)
  const history = useHistory()

  const onAuthenticateHandler = async (event) => {
    event.preventDefault()
    try {
      const response = await request(
        '/api/auth/login',
        'POST',
        {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        },
        {},
        'Вход выполняется...'
      )
      login(response.token, response.name, response.userId, response.avatar)
      history.push('/')
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  return (
    <div className={classes.root}>
      <Paper>
        <LoginForm
          onSubmit={onAuthenticateHandler}
          formState={formState}
          onInputHandler={onInputHandler}
        />
      </Paper>
    </div>
  )
}
export default Login
