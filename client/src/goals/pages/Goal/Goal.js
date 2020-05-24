import React, { useContext, useState } from 'react'
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
  const [subgoalStatuses, setSubgoalStatuses] = useState(
    currentGoal ? currentGoal.subgoals.map((subgoal) => subgoal.completed) : []
  )

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
            <LinkIconButton
              to={`/update_goal/${goalId}`}
              color="primary"
              className={classes.btn}
            >
              <EditIcon />
            </LinkIconButton>
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
          {currentGoal.subgoals.length ? (
            <>
              <Paper className={classes.paper} elevation={2}>
                <List className={classes.goalSteps}>
                  {currentGoal.subgoals.map((subgoal, index) => (
                    <ListItem
                      button
                      key={subgoal.id}
                      onClick={() => onCheckHandler(index)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          checked={subgoalStatuses[index]}
                          name={subgoal.title}
                        />
                      </ListItemIcon>
                      <ListItemText primary={subgoal.title} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <LinkButton
                to={MAIN_PAGE}
                color="primary"
                variant="outlined"
                onClick={onSaveHandler}
                startIcon={<SaveIcon />}
                className={classes.saveBtn}
              >
                Сохранить
              </LinkButton>
            </>
          ) : (
            <div>
              <LinkButton
                to={MAIN_PAGE}
                color="primary"
                variant="contained"
                onClick={onSaveHandler}
                startIcon={<DoneIcon />}
                className={classes.doneBtn}
              >
                Завершить
              </LinkButton>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default AboutGoal
