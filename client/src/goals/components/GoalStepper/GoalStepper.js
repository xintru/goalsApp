import React, { useContext } from 'react'
import {
  MobileStepper,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
} from '@material-ui/core'

import {
  MobileStepperBackButton,
  MobileStepperNextButton,
} from './GoalStepperMobileControls'
import { GoalContext } from '../../context/GoalContext'
import theme from '../../../util/theme/theme'
import useStyles from './GoalStepper.style'

const GoalStepper = () => {
  const classes = useStyles()
  const { activeStep, steps } = useContext(GoalContext)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className={classes.root}>
      {isMobile ? (
        <MobileStepper
          variant="progress"
          steps={steps.length}
          activeStep={activeStep}
          nextButton={<MobileStepperNextButton />}
          backButton={<MobileStepperBackButton />}
        >
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </MobileStepper>
      ) : (
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      )}
    </div>
  )
}

export default GoalStepper
