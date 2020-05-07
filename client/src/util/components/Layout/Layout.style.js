import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    overflow: 'hidden',
    minHeight: 'calc(100vh - 64px)',
    background: theme.palette.white.bg,
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 56px)',
    },
  },
  wrapper: {
    minHeight: 'calc(100vh - 64px)',
    background: 'transparent',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 56px)',
      padding: 0,
    },
  },
}))

export default useStyles
