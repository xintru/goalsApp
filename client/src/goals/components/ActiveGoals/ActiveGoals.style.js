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
  goalInfo: {
    flex: 0,
    minWidth: 330,
    marginRight: '2rem',
    [theme.breakpoints.down('sm')]: {
      minWidth: 130,
      marginRight: '1rem',
      // overflow: 'hidden',
      // whiteSpace: 'nowrap',
      // textOverflow: 'ellipsis',
    },
  },
  progress: {
    flex: 2,
  },
  btn: {
    marginLeft: '2rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '1rem',
    },
  },
  noGoals: {
    marginTop: '2rem',
    textAlign: 'center',
  },
}))

export default useStyles
