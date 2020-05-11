import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress,
  useMediaQuery,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import InfoIcon from '@material-ui/icons/Info'

import Loading from '../../../shared/UI/Loading/Loading'

import useStyles from './ActiveGoals.style'
import { NEW_GOAL } from '../../../util/constants/routes'

const ActiveGoals = (props) => {
  const { goals, isLoading } = props
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // NEEDS HUGE REFACTORING
  return (
    <div className={classes.root}>
      <div className={classes.goalsBar}>
        <Typography variant="h6" className={classes.title}>
          Активные цели:
        </Typography>
        <Link to={NEW_GOAL}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={isMobile ? null : <AddIcon />}
          >
            {isMobile ? <AddIcon /> : 'Добавить цель'}
          </Button>
        </Link>
      </div>
      {goals.length === 0 ? (
        <Typography className={classes.noGoals}>
          У вас нет активных целей
        </Typography>
      ) : (
        <List className={classes.goalsList}>
          {isLoading ? (
            <Loading centerVertically />
          ) : (
            goals.map((goal, i) => (
              <React.Fragment key={`goal_list${i + 1}`}>
                <ListItem className={classes.goal}>
                  <ListItemText
                    classes={{ root: classes.goalInfo }}
                    primary={goal.title}
                    secondary={isMobile ? null : goal.description}
                  />
                  <LinearProgress
                    variant="determinate"
                    value={20}
                    color="secondary"
                    classes={{
                      root: classes.progress,
                    }}
                  />
                  <Link to={`/goal/${goal.id}`}>
                    {isMobile ? (
                      <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        className={classes.btn}
                      >
                        <InfoIcon />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        className={classes.btn}
                      >
                        Подробнее
                      </Button>
                    )}
                  </Link>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          )}
        </List>
      )}
    </div>
  )
}

ActiveGoals.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default ActiveGoals
