import React, { useContext } from 'react'
import { Typography, Button, Paper } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { UserContext } from '../../../util/context/user-context'
import LinkButton from '../../../shared/UI/LinkButtons/LinkButton'
import useStyles from './Goal.style'
import { MAIN_PAGE } from '../../../util/constants/routes'

const AboutGoal = () => {
  const {
    user: { goals },
    deleteGoal,
  } = useContext(UserContext)
  const { goalId } = useParams()
  const classes = useStyles()
  const history = useHistory()
  // Need to add spinner while fetching
  const currentGoal = goals.find((goal) => goal.id === goalId)

  const onDeleteHandler = () => {
    deleteGoal(goalId)
    history.push(MAIN_PAGE)
  }

  return (
    <div className={classes.root}>
      <LinkButton
        to={MAIN_PAGE}
        color="primary"
        startIcon={<ArrowBackIcon />}
        className={classes.backBtn}
      >
        Назад
      </LinkButton>
      <div className={classes.titleBox}>
        <Typography variant="h4" className={classes.title}>
          {currentGoal ? currentGoal.title : ''}
        </Typography>
      </div>
      <Typography className={classes.description}>
        {currentGoal ? currentGoal.description : ''}
      </Typography>
      <Paper className={classes.goalSteps} elevation={2}>
        Чекбоксы
      </Paper>
      <LinkButton
        to={`/update_goal/${goalId}`}
        variant="outlined"
        color="primary"
        startIcon={<EditIcon />}
        className={classes.btn}
      >
        Изменить
      </LinkButton>
      <Button
        color="secondary"
        onClick={onDeleteHandler}
        variant="contained"
        startIcon={<DeleteIcon />}
        className={classes.btn}
      >
        Удалить
      </Button>
    </div>
  )
}

export default AboutGoal
