import React, { useContext, useState, useEffect } from 'react'
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Chip,
} from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import DoneIcon from '@material-ui/icons/Done'

import { convertGoalDate } from '../../../util/helpers/convertGoalDate'
import { UserContext } from '../../../util/context/user-context'
import LinkButton from '../../../shared/UI/LinkButtons/LinkButton'
import LinkIconButton from '../../../shared/UI/LinkButtons/LinkIconButton'
import Loading from '../../../shared/UI/Loading/Loading'
import useStyles from './Goal.style'
import { MAIN_PAGE } from '../../../util/constants/routes'

// надо порефакторить

const AboutGoal = () => {
  const {
    user: { goals },
    deleteGoal,
    updateGoal,
  } = useContext(UserContext)
  const { goalId } = useParams()
  const classes = useStyles()
  const history = useHistory()
  // Need to add spinner while fetching
  const currentGoal = goals.find((goal) => goal.id === goalId)
  const [subgoalStatuses, setSubgoalStatuses] = useState([])

  useEffect(() => {
    if (currentGoal) {
      setSubgoalStatuses(
        currentGoal.subgoals.map((subgoal) => subgoal.completed)
      )
    }
  }, [currentGoal, setSubgoalStatuses])

  const onDeleteHandler = () => {
    deleteGoal(goalId)
    history.push(MAIN_PAGE)
  }

  const onSaveHandler = () => {
    updateGoal(
      {
        ...currentGoal,
        subgoals: currentGoal.subgoals.map((subgoal, i) => ({
          ...subgoal,
          completed: subgoalStatuses[i],
        })),
        completed: subgoalStatuses.reduce((a, b) => a && b, true),
      },
      goalId
    )
    history.push(MAIN_PAGE)
  }

  const onCheckHandler = (index) => {
    setSubgoalStatuses((prevState) =>
      prevState.map((el, i) => (i === index ? !el : el))
    )
  }

  const checkGoalStatus = () => subgoalStatuses.reduce((a, b) => a && b, true)

  const isGoalCompleted = () => currentGoal.completed

  return (
    <div className={classes.root}>
      {currentGoal ? (
        <>
          <LinkButton
            to={MAIN_PAGE}
            color="primary"
            startIcon={<ArrowBackIcon />}
            className={classes.backBtn}
          >
            Назад
          </LinkButton>
          <div className={classes.editBtns}>
            {isGoalCompleted() ? null : (
              <LinkIconButton
                to={`/update_goal/${goalId}`}
                color="primary"
                className={classes.btn}
              >
                <EditIcon />
              </LinkIconButton>
            )}
            <LinkIconButton
              to={MAIN_PAGE}
              color="secondary"
              onClick={onDeleteHandler}
              className={classes.btn}
            >
              <DeleteIcon />
            </LinkIconButton>
          </div>
          <div className={classes.titleBox}>
            <Typography variant="h4" className={classes.title}>
              {currentGoal.title}
            </Typography>
          </div>
          <Typography className={classes.description}>
            {currentGoal.description}
          </Typography>
          <Chip
            className={classes.date}
            color="secondary"
            label={`До ${convertGoalDate(currentGoal.date)}`}
          />
          {!!currentGoal.subgoals.length && (
            <>
              <List className={classes.goalSteps}>
                {currentGoal.subgoals.map((subgoal, index) => (
                  <Paper
                    className={classes.paper}
                    classes={{ root: classes.paperInner }}
                    elevation={2}
                    key={subgoal.id}
                  >
                    <ListItem
                      button
                      onClick={() => onCheckHandler(index)}
                      disabled={currentGoal.completed}
                    >
                      <ListItemIcon>
                        <Checkbox
                          checked={subgoalStatuses[index] || false}
                          name={subgoal.title}
                        />
                      </ListItemIcon>
                      <ListItemText primary={subgoal.title} />
                    </ListItem>
                  </Paper>
                ))}
              </List>
            </>
          )}
          <div>
            {isGoalCompleted() ? null : (
              <LinkButton
                to={MAIN_PAGE}
                color="primary"
                variant="contained"
                onClick={onSaveHandler}
                startIcon={checkGoalStatus() ? <DoneIcon /> : <SaveIcon />}
                className={classes.doneBtn}
              >
                {checkGoalStatus() ? 'Завершить' : 'Сохранить'}
              </LinkButton>
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default AboutGoal
