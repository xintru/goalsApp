import React, { useContext } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'
import { GoalContext } from '../../context/GoalContext'
import useStyles from './GoalSummary.style'

const GoalSummary = () => {
  const classes = useStyles()
  const { httpData } = useContext(GoalContext)
  return (
    <div className={classes.root}>
      <Typography variant="h5" color='primary'>{httpData.title}</Typography>
      <Typography className={classes.description}>{httpData.description}</Typography>
      <Chip variant="outlined" color="secondary" label={`До ${new Date(httpData.date).toLocaleDateString()}`}/>
      <hr />
      {!!httpData.subgoals.length && (
        <>
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
