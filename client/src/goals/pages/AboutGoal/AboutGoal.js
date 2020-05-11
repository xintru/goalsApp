import React, { useContext, useState, useEffect } from 'react'

import { HttpContext } from '../../../util/context/http-context'
import { AuthContext } from '../../../util/context/auth-context'

import useStyles from './AboutGoal.style'

const AboutGoal = () => {
  const [goal, setGoal] = useState({ title: '', description: '' })
  const classes = useStyles()
  const { isLoading, request } = useContext(HttpContext)
  const { token } = useContext(AuthContext)

  useEffect(() => {
    ;(async () => {
      const response = await request('/api/user', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setGoal({
        title: response.user.goal.title,
        description: response.user.goal.description,
      })
    })()
  }, [request, token])

  return <div className={classes.root}>компонент цели</div>
}

export default AboutGoal
