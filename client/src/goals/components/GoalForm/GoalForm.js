import React from 'react'
import { TextField, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

import goalInputs from './inputs/goalInputs'
import useStyles from './GoalForm.style'

const GoalForm = (props) => {
  const { formState, onInputHandler, newGoal } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h5">
        {newGoal ? 'Задать новую цель:' : 'Изменить старую цель'}
      </Typography>
      {goalInputs.map((input) => (
        <TextField
          className={classes.textField}
          multiline={input.type === 'textarea'}
          variant="outlined"
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
    </div>
  )
}

GoalForm.propTypes = {
  formState: PropTypes.shape({
    inputs: PropTypes.shape({
      title: PropTypes.shape({
        value: PropTypes.string.isRequired,
        isValid: PropTypes.bool.isRequired,
        touched: PropTypes.bool.isRequired,
        validators: PropTypes.arrayOf(PropTypes.func).isRequired,
      }).isRequired,
      description: PropTypes.shape({
        value: PropTypes.string.isRequired,
        isValid: PropTypes.bool.isRequired,
        touched: PropTypes.bool.isRequired,
        validators: PropTypes.arrayOf(PropTypes.func).isRequired,
      }).isRequired,
    }).isRequired,
    formIsValid: PropTypes.bool.isRequired,
  }).isRequired,
  onInputHandler: PropTypes.func.isRequired,
  newGoal: PropTypes.bool.isRequired,
}

export default GoalForm
