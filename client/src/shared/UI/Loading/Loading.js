import React from 'react'
import PropTypes from 'prop-types'

import { CircularProgress } from '@material-ui/core'

import useStyles from './Loading.style'

const Loading = (props) => {
  const { centerVertically } = props
  const classes = useStyles()
  return (
    <div
      className={`${classes.root} ${centerVertically &&
        classes.centerVertically}`}
    >
      <CircularProgress />
    </div>
  )
}

Loading.propTypes = {
  centerVertically: PropTypes.bool,
}

Loading.defaultProps = {
  centerVertically: false,
}

export default Loading
