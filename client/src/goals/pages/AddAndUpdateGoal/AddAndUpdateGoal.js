import React, { useContext, useEffect } from 'react'
import { Paper } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'

import { UserContext } from '../../../util/context/user-context'
import { MAIN_PAGE } from '../../../util/constants/routes'
import useForm from '../../../util/hooks/form-hook'
import GoalForm from '../../components/GoalForm/GoalForm'
import goalInputs from '../../components/GoalForm/inputs/goalInputs'

import useStyles from './AddAndUpdateGoal.style'

const AddAndUpdateGoal = () => {
  const classes = useStyles()
  const history = useHistory()
  const { goalId } = useParams()
  const {
    user: { goals },
    addGoal,
    updateGoal,
  } = useContext(UserContext)
  const currentGoal = goals.find((goal) => goal.id === goalId)
  const { formState, onInputHandler } = useForm(goalInputs, !!currentGoal)

  // triggered when user refreshes the page completely
  useEffect(() => {
    if (currentGoal) {
      goalInputs.forEach((goal) =>
        onInputHandler(goal.id, currentGoal[goal.id])
      )
    }
  }, [currentGoal, onInputHandler])

  const onSubmitHandler = () => {
    if (!goalId) {
      addGoal({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      })
    } else {
      updateGoal(
        {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        },
        goalId
      )
    }
    history.push(MAIN_PAGE)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.card}>
        <GoalForm
          newGoal={!goalId}
          formState={formState}
          onInputHandler={onInputHandler}
          onSubmit={onSubmitHandler}
        />
      </Paper>
    </div>
  )
}

export default AddAndUpdateGoal
