import React, { useContext, useEffect, useState } from 'react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'

import { UserContext } from '../../../util/context/user-context'
import { MAIN_PAGE } from '../../../util/constants/routes'
import useForm from '../../../util/hooks/form-hook'
import GoalForm from '../../components/GoalForm/GoalForm'
import goalInputs from '../../components/GoalForm/inputs/goalInputs'

import useStyles from './AddAndUpdateGoal.style'
import theme from '../../../util/theme/theme'
import { GoalContext } from '../../context/GoalContext'
import GoalStepper from '../../components/GoalStepper/GoalStepper'
import GoalStepperControls from '../../components/GoalStepper/GoalStepperControls'

const steps = ['Опишите', 'Кастомизируйте', 'Добавьте']

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
  const [activeStep, setActiveStep] = useState(0)
  const [httpData, setHttpData] = useState({})
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // triggered when user refreshes the page completely
  useEffect(() => {
    if (currentGoal) {
      goalInputs.forEach((goal) =>
        onInputHandler(goal.id, currentGoal[goal.id])
      )
    }
  }, [currentGoal, onInputHandler])

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (!goalId) {
      addGoal(httpData)
    } else {
      updateGoal(httpData, goalId)
    }
    history.push(MAIN_PAGE)
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <GoalForm
            newGoal={!goalId}
            formState={formState}
            onInputHandler={onInputHandler}
          />
        )
      case 1:
        return <Typography>Customization here</Typography>
      case 2:
        return <Typography>Summary</Typography>
      default:
        return <Typography>Ой-ой, что-то пошло не так</Typography>
    }
  }

  const nextButtonAction = () => {
    switch (activeStep) {
      case 0:
        return setHttpData((prevHttpData) => ({
          ...prevHttpData,
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }))
      // need to add customization
      case 1:
        return () => {}
      default:
        return null
    }
  }

  const handleNextStep = () => {
    nextButtonAction()
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  return (
    <GoalContext.Provider
      value={{
        activeStep,
        steps,
        formIsValid: formState.formIsValid,
        handleNextStep,
        handlePrevStep,
        onSubmitHandler,
      }}
    >
      <div className={classes.root}>
        <Paper className={classes.card}>
          <GoalStepper />
          {renderStepContent()}
          {!isMobile && <GoalStepperControls />}
        </Paper>
      </div>
    </GoalContext.Provider>
  )
}

export default AddAndUpdateGoal