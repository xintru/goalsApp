import React from 'react'
import { Paper, Typography, TextField, Button } from '@material-ui/core'

import useStyles from './Signup.style'

const Signup = () => {
  const classes = useStyles()

  const onAuthenticateHandler = event => {
    event.preventDefault()
    console.log('submit')
  }

  return (
    <div className={classes.root}>
      <Paper>
        <form className={classes.card} onSubmit={onAuthenticateHandler}>
          <Typography variant="h5">SignUp</Typography>
          <TextField className={classes.textField} placeholder="Username" />
          <TextField className={classes.textField} placeholder="Passwords" />
          <TextField
            className={classes.textField}
            placeholder="Confirm Password"
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
