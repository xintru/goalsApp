import React, { useContext, useEffect, useState } from 'react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'

import { UserContext } from '../../../util/context/user-context'
import { MAIN_PAGE } from '../../../util/constants/routes'
import useForm from '../../../util/hooks/form-hook'
import goalInputs from '../../components/GoalForm/inputs/goalInputs'

import useStyles from './AddAndUpdateGoal.style'
import theme from '../../../util/theme/theme'
import { GoalContext } from '../../context/GoalContext'
import GoalStepper from '../../components/GoalStepper/GoalStepper'
import GoalStepperControls from '../../components/GoalStepper/GoalStepperControls'

import GoalForm from '../../components/GoalForm/GoalForm'
import GoalCustomization from '../../components/GoalCustomization/GoalCustomization'
import GoalSummary from '../../components/GoalSummary/GoalSummary'
import { getGoalDate } from '../../../util/helpers/getGoalDate'

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
  const [customizationOptions, setCustomizationOptions] = useState({
    date: {
      week: true,
      month: false,
      year: false,
    },
    subgoals: [],
  })
  const [httpData, setHttpData] = useState({
    completed: false,
  })
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // triggered when user refreshes the page completely
  useEffect(() => {
    if (currentGoal) {
      goalInputs.forEach((goal) =>
        onInputHandler(goal.id, currentGoal[goal.id])
      )
      setCustomizationOptions((prevOptions) => ({
        ...prevOptions,
        subgoals: [...currentGoal.subgoals],
        completed: currentGoal.completed,
      }))
    }
  }, [currentGoal, onInputHandler, setCustomizationOptions])

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
        return (
          <GoalCustomization
            customizationOptions={customizationOptions}
            setCustomizationOptions={setCustomizationOptions}
          />
        )
      case 2:
        return <GoalSummary />
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
        return setHttpData((prevHttpData) => ({
          ...prevHttpData,
          date: getGoalDate(customizationOptions.date),
          subgoals: customizationOptions.subgoals,
        }))
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
        steps: goalId
          ? [...steps.slice(0, steps.length - 1), 'Обновите']
          : steps,
        formIsValid: formState.formIsValid,
        newGoal: !goalId,
        httpData,
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
