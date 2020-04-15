/* eslint-disable react/jsx-wrap-multilines */
import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Container, Snackbar, CircularProgress } from '@material-ui/core'

import { HttpContext } from '../../context/http-context'
import useStyles from './Layout.style'

const Layout = (props) => {
  const classes = useStyles()
  const { isLoading, loadingMessage, errorMessage, clearError } = useContext(
    HttpContext
  )
  const { children } = props

  const renderSnackbar = () => (
    <Snackbar
      open={isLoading || !!errorMessage}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      message={loadingMessage || errorMessage}
      autoHideDuration={10000}
      onClose={clearError}
      action={isLoading && <CircularProgress size={20} />}
    />
  )

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.wrapper}>
        {children}
      </Container>
      {renderSnackbar()}
    </div>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
}

export default Layout
