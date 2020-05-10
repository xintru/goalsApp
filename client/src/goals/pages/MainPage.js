import React, { useContext } from 'react'

import { HttpContext } from '../../util/context/http-context'
import { UserContext } from '../../util/context/user-context'

import Summary from '../components/Summary/Summary'
import ActiveGoals from '../components/ActiveGoals/ActiveGoals'

import useStyles from './MainPage.style'

const MainPage = () => {
  const classes = useStyles()
  const { isLoading } = useContext(HttpContext)
  const { user } = useContext(UserContext)

  return (
    <div className={classes.root}>
      <Summary
        name={user.name}
        goals={user.goals}
        isLoading={isLoading}
        avatar={user.avatar}
      />
      <ActiveGoals goals={user.goals} isLoading={isLoading} />
    </div>
  )
}

export default MainPage
