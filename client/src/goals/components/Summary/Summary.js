import React from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Box,
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'

import Loading from '../../../shared/UI/Loading/Loading'
import AvatarComponent from '../../../shared/UI/AvatarComponent/AvatarComponent'
import calcGeneralProgress from '../../../util/helpers/calcGeneralProgress'
import useStyles from './Summary.style'
import { MAX_PROGRESS } from '../../../util/constants/summary'

const Summary = (props) => {
  const { name, goals, avatar, isLoading } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {isLoading ? (
        <Loading centerVertically />
      ) : (
        <>
          <div className={classes.userInfo}>
            <AvatarComponent name={name} avatar={avatar} />
            <Typography variant="h6" className={classes.username}>
              {name}
            </Typography>
          </div>
          <div className={classes.progressInfo}>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" className={classes.title}>
                Целей всего:{' '}
                <Box component="span" color="secondary.main">
                  {goals.length}
                </Box>
              </Typography>
              <div className={classes.demo}>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={<Typography>Выполнено:</Typography>}
                      secondary={
                        <LinearProgress
                          variant="determinate"
                          value={calcGeneralProgress(goals)}
                        />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AutorenewIcon color="secondary" fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={<Typography>В процессе:</Typography>}
                      secondary={
                        <LinearProgress
                          variant="determinate"
                          value={MAX_PROGRESS - calcGeneralProgress(goals)}
                          color="secondary"
                        />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <QueryBuilderIcon color="secondary" fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography>Просрочено:</Typography>}
                      secondary="0"
                    />
                  </ListItem>
                </List>
              </div>
            </Grid>
          </div>
        </>
      )}
    </div>
  )
}

Summary.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default Summary
