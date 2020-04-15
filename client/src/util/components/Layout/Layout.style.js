import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    minHeight: 'calc(100vh - 64px)',
    background: theme.palette.primary.dark,
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 56px)',
    },
  },
  wrapper: {
    minHeight: 'calc(100vh - 64px)',
    background: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 56px)',
    },
  },
}))

export default useStyles
