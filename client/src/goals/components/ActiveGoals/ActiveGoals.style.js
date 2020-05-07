import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
  },
  goalsBar: {
    width: '100%',
    height: '5rem',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.white.main,
    boxSizing: 'border-box',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  goalsList: {
    width: '100%',
    minHeight: 200,
  },
  goal: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progress: {
    flex: 3,
  },
  btn: {
    marginLeft: '3rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '1rem',
    },
  },
}))

export default useStyles
