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

import useAuth from './util/hooks/auth-hook'
import MainPage from './places/pages/MainPage'
import Signup from './users/pages/Signup'
import Login from './users/pages/Login'
import Layout from './util/components/Layout/Layout'
import theme from './util/theme/theme'

const App = () => {
  const { token, login, logout } = useAuth()

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, login, logout }}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Router>
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
          </Router>
        </Layout>
      </ThemeProvider>
    </AuthContext.Provider>
  )
}

export default App
