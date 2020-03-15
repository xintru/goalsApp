import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    background: theme.palette.primary.dark,
  },
  wrapper: {
    height: '100vh',
    background: theme.palette.primary.main,
  },
}))

export default useStyles
