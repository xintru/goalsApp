import React, { useState } from 'react'
import { Paper, Typography, TextField, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import useAuth from '../../shared/hooks/auth-hook'
import useHttp from '../../shared/hooks/http-hook'
import useStyles from './Signup.style'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const history = useHistory()
  const classes = useStyles()
  const { request } = useHttp()
  const { login } = useAuth()

  const onAuthenticateHandler = async event => {
    event.preventDefault()
    try {
      const response = await request('/api/auth/signup', 'POST', {
        name,
        email,
        password,
        confirmPassword,
      })
      login(response.token)
      history.push('/')
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  return (
    <div className={classes.root}>
      <Paper>
        <form className={classes.card} onSubmit={onAuthenticateHandler}>
          <Typography variant="h5">SignUp</Typography>
          <TextField
            className={classes.textField}
            placeholder="Username"
            value={name}
            onChange={evt => setName(evt.target.value)}
          />
          <TextField
            className={classes.textField}
            placeholder="Email"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
          />
          <TextField
            className={classes.textField}
            placeholder="Password"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
          />
          <TextField
            className={classes.textField}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={evt => setConfirmPassword(evt.target.value)}
          />
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  )
}
export default Signup
