import React, { useContext } from 'react'
import { Button } from '@material-ui/core'

import { GoalContext } from '../../context/GoalContext'
import useStyles from './GoalStepper.style'

const GoalStepperControls = () => {
  const classes = useStyles()
  const {
    activeStep,
    handlePrevStep,
    handleNextStep,
    onSubmitHandler,
    formIsValid,
    steps,
    newGoal,
  } = useContext(GoalContext)

  return (
    <div className={classes.buttonContainer}>
      <Button disabled={activeStep === 0} onClick={handlePrevStep}>
        Назад
      </Button>
      {activeStep !== steps.length - 1 ? (
        <Button onClick={handleNextStep} disabled={!formIsValid} type="button">
          Вперед
        </Button>
      ) : (
        <Button type="submit" onClick={onSubmitHandler} disabled={!formIsValid}>
          {newGoal ? 'Добавить цель' : 'Обновить цель'}
        </Button>
      )}
    </div>
  )
}

export default GoalStepperControls
