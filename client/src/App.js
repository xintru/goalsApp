import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import { AuthContext } from './util/context/auth-context'
import { HttpContext } from './util/context/http-context'
import {
  STARTING_PAGE,
  MAIN_PAGE,
  SIGN_UP,
  LOGIN,
} from './util/constants/routes'
import Toolbar from './shared/header/Toolbar'

import useAuth from './util/hooks/auth-hook'
import useHttp from './util/hooks/http-hook'
import MainPage from './goals/pages/MainPage'
import StartingPage from './shared/StartingPage/StartingPage'
import Signup from './users/pages/Signup'
import Login from './users/pages/Login'
import Layout from './util/components/Layout/Layout'
import theme from './util/theme/theme'

const App = () => {
  const { token, login, logout, username } = useAuth()
  const {
    isLoading,
    loadingMessage,
    errorMessage,
    request,
    clearError,
  } = useHttp()
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, username, token, login, logout }}
    >
      <HttpContext.Provider
        value={{ isLoading, loadingMessage, errorMessage, request, clearError }}
      >
        <ThemeProvider theme={theme}>
          <Router>
            <Toolbar />
            <Layout>
              {token ? (
                <Switch>
                  <Route exact path={MAIN_PAGE} component={MainPage} />
                  <Redirect to={MAIN_PAGE} />
                </Switch>
              ) : (
                <Switch>
                  <Route exact path={STARTING_PAGE} component={StartingPage} />
                  <Route exact path={SIGN_UP} component={Signup} />
                  <Route exact path={LOGIN} component={Login} />
                  <Redirect to={STARTING_PAGE} />
                </Switch>
              )}
            </Layout>
          </Router>
        </ThemeProvider>
      </HttpContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
