import React, { useContext } from 'react'
import { Typography, Button, Paper } from '@material-ui/core'
import { Link, useParams, useHistory } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { UserContext } from '../../../util/context/user-context'
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
      <Link to={MAIN_PAGE}>
        <Button
          color="primary"
          startIcon={<ArrowBackIcon />}
          className={classes.backBtn}
        >
          Назад
        </Button>
      </Link>
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
      <Link to={`/update_goal/${goalId}`}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          className={classes.btn}
        >
          Изменить
        </Button>
      </Link>
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
