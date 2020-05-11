import React, { useContext } from 'react'
import { Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { HttpContext } from '../../../util/context/http-context'
import useForm from '../../../util/hooks/form-hook'
import GoalForm from '../../components/GoalForm/GoalForm'
import goalInputs from '../../components/GoalForm/inputs/goalInputs'

import useStyles from './NewGoal.style'

const NewGoal = () => {
  const classes = useStyles()
  const { formState, onInputHandler } = useForm(goalInputs, false)
  const { request } = useContext(HttpContext)
  const history = useHistory()

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    await request(
      '/api/goals',
      'POST',
      {
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      },
      {},
      'Цель добавляется...'
    )
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.card}>
        <GoalForm
          formState={formState}
          onInputHandler={onInputHandler}
          onSubmit={onSubmitHandler}
        />
      </Paper>
    </div>
  )
}

export default NewGoal
