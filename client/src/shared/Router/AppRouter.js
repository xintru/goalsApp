import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import UserStore from '../../util/context/user-context'

import {
  STARTING_PAGE,
  MAIN_PAGE,
  SIGN_UP,
  LOGIN,
} from '../../util/constants/routes'

import MainPage from '../../goals/pages/MainPage'
import StartingPage from '../StartingPage/StartingPage'
import Signup from '../../users/pages/Signup'
import Login from '../../users/pages/Login'

import { AuthContext } from '../../util/context/auth-context'

const AppRouter = () => {
  const { token } = useContext(AuthContext)
  return (
    <>
      {token ? (
        <UserStore>
          <Switch>
            <Route exact path={MAIN_PAGE} component={MainPage} />
            <Redirect to={MAIN_PAGE} />
          </Switch>
        </UserStore>
      ) : (
        <Switch>
          <Route exact path={STARTING_PAGE} component={StartingPage} />
          <Route exact path={SIGN_UP} component={Signup} />
          <Route exact path={LOGIN} component={Login} />
          <Redirect to={STARTING_PAGE} />
        </Switch>
      )}
    </>
  )
}

export default AppRouter
