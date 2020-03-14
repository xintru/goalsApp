import React from 'react'
import { Link } from 'react-router-dom'
import { Paper, Typography, TextField, Button } from '@material-ui/core'

import useStyles from './Login.style'
import { SIGN_UP } from '../../shared/constants/routes'

const Login = () => {
  const classes = useStyles()

  const onAuthenticateHandler = event => {
    event.preventDefault()
    console.log('submit')
  }

  return (
    <div className={classes.root}>
      <Paper>
        <form className={classes.card} onSubmit={onAuthenticateHandler}>
          <Typography variant="h5">Login</Typography>
          <TextField className={classes.textField} placeholder="Username" />
          <TextField className={classes.textField} placeholder="Password" />
          <Typography className={classes.link}>
            <Link to={SIGN_UP}>Don&apos;t have an account yet?</Link>
          </Typography>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  )
}
export default Login
