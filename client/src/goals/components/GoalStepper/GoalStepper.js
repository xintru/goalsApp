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

  const StepperComponent = isMobile
    ? ({ children }) => (
        <MobileStepper
          variant="progress"
          steps={steps.length}
          activeStep={activeStep}
          nextButton={<MobileStepperNextButton />}
          backButton={<MobileStepperBackButton />}
        >
          {children}
        </MobileStepper>
      )
    : ({ children }) => <Stepper activeStep={activeStep}>{children}</Stepper>

  return (
    <div className={classes.root}>
      <StepperComponent>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </StepperComponent>
    </div>
  )
}

export default GoalStepper
