import React from 'react'
import propTypes from 'prop-types'
import { Container } from '@material-ui/core'
import useStyles from './Layout.style'

const Layout = props => {
  const classes = useStyles()
  const { children } = props
  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.wrapper}>
        {children}
      </Container>
    </div>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
}

export default Layout
