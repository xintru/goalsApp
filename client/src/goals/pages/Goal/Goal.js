import React, { useContext } from 'react'
import { Typography, Button } from '@material-ui/core'
import { Link, useParams, useHistory } from 'react-router-dom'

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
      <Typography>{currentGoal ? currentGoal.title : ''}</Typography>
      <Typography>{currentGoal ? currentGoal.description : ''}</Typography>
      <Link to={`/update_goal/${goalId}`}>
        <Button>Изменить</Button>
      </Link>
      <Button onClick={onDeleteHandler}>Удалить</Button>
    </div>
  )
}

export default AboutGoal
