import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Add as AddIcon,
} from '@material-ui/icons'

import { GoalContext } from '../../context/GoalContext'
import theme from '../../../util/theme/theme'

export const MobileStepperNextButton = () => {
  const {
    activeStep,
    steps,
    handleNextStep,
    onSubmitHandler,
    formIsValid,
    newGoal,
  } = useContext(GoalContext)
  return (
    <>
      {activeStep === steps.length - 1 ? (
        <Button
          size="small"
          onClick={onSubmitHandler}
          disabled={!formIsValid}
          type="button"
        >
          {newGoal ? 'Добавить' : 'Обновить'}
          <AddIcon />
        </Button>
      ) : (
        <Button
          size="small"
          onClick={handleNextStep}
          disabled={!formIsValid}
          type="button"
        >
          Вперед
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      )}
    </>
  )
}

export const MobileStepperBackButton = () => {
  const { activeStep, handlePrevStep } = useContext(GoalContext)
  return (
    <Button size="small" onClick={handlePrevStep} disabled={activeStep === 0}>
      {theme.direction === 'rtl' ? (
        <KeyboardArrowRight />
      ) : (
        <KeyboardArrowLeft />
      )}
      Назад
    </Button>
  )
}
