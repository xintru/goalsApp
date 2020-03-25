import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import { AuthContext } from './util/context/auth-context'
import { MAIN_PAGE, SIGN_UP, LOGIN } from './util/constants/routes'
import Toolbar from './shared/header/Toolbar'

import useAuth from './util/hooks/auth-hook'
import MainPage from './places/pages/MainPage'
import Signup from './users/pages/Signup'
import Login from './users/pages/Login'
import Layout from './util/components/Layout/Layout'
import theme from './util/theme/theme'

const App = () => {
  const { token, login, logout, username } = useAuth()

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, username, token, login, logout }}
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
                {/* <Route exact path={MAIN_PAGE} component={MainPage} /> */}
                <Route exact path={SIGN_UP} component={Signup} />
                <Route exact path={LOGIN} component={Login} />
                <Redirect to={LOGIN} />
              </Switch>
            )}
          </Layout>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  )
}

export default App
