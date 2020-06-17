import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import 'moment/locale/ru'

import AuthStore from './util/context/auth-context'
import HttpStore from './util/context/http-context'

import Toolbar from './shared/header/Toolbar'
import AppRouter from './shared/Router/AppRouter'
import Layout from './shared/layout/Layout'
import theme from './util/theme/theme'

const App = () => {
  return (
    <AuthStore>
      <HttpStore>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils} locale="ru">
            <Router history={createBrowserHistory()}>
              <Toolbar />
              <Layout>
                <AppRouter />
              </Layout>
            </Router>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </HttpStore>
    </AuthStore>
  )
}

export default App
