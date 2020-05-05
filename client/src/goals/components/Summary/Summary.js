import React from 'react'

import {
  Typography,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  LinearProgress,
  Box,
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'

import useStyles from './Summary.style'

const Summary = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.userInfo}>
        <Avatar alt="Avatar" src="1.jpg" className={classes.avatar} />
        <Typography variant="h5" className={classes.username}>
          Username
        </Typography>
      </div>
      <div className={classes.progressInfo}>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" className={classes.title}>
            Целей всего:{' '}
            <Box component="span" color="secondary.main">
              10
            </Box>
          </Typography>
          <div className={classes.demo}>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="secondary" fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary="Целей выполнено:"
                  secondary={
                    <LinearProgress
                      variant="buffer"
                      value="40"
                      valueBuffer="0"
                    />
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AutorenewIcon color="secondary" fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary="Целей в процессе:"
                  secondary={
                    <LinearProgress variant="determinate" value="50" />
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <QueryBuilderIcon color="secondary" fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Целей отложено:" secondary="10%" />
              </ListItem>
            </List>
          </div>
        </Grid>
      </div>
      <Divider variant="middle" color="secondary" />
    </div>
  )
}

export default Summary
