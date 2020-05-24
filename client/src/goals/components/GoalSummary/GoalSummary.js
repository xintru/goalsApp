import React, { useContext } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'
import { GoalContext } from '../../context/GoalContext'
import useStyles from './GoalSummary.style'

const GoalSummary = () => {
  const classes = useStyles()
  const { httpData } = useContext(GoalContext)
  return (
    <div className={classes.root}>
      <Typography>{httpData.title}</Typography>
      <Typography>{httpData.description}</Typography>
      <Typography>{new Date(httpData.date).toLocaleString()}</Typography>
      <hr />
      {!!httpData.subgoals.length && (
        <>
          <Typography>Subgoals: </Typography>
          <List className={classes.subgoalList}>
            {httpData.subgoals.map((subgoal, i) => (
              <ListItem
                key={`subgoal-item-${i + 1}`}
                aria-controls="subgoal-menu"
              >
                <ListItemIcon>
                  <ChevronRight />
                </ListItemIcon>
                <ListItemText>{subgoal.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  )
}

export default GoalSummary
