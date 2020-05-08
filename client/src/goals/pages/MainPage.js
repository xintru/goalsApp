import React, { useContext, useState, useEffect } from 'react'

import { HttpContext } from '../../util/context/http-context'
import { AuthContext } from '../../util/context/auth-context'

import Summary from '../components/Summary/Summary'
import ActiveGoals from '../components/ActiveGoals/ActiveGoals'

import useStyles from './MainPage.style'

const MainPage = () => {
  const [user, setUser] = useState({ name: 'username', goals: [], avatar: '' })
  const classes = useStyles()
  const { isLoading, request } = useContext(HttpContext)
  const { token } = useContext(AuthContext)

  useEffect(() => {
    ;(async () => {
      const response = await request('/api/user', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setUser({
        name: response.user.name,
        goals: response.user.goals.map((goal) => ({
          title: goal.title,
          description: goal.description,
        })),
        avatar: response.user.avatar,
      })
    })()
  }, [request, token])

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
