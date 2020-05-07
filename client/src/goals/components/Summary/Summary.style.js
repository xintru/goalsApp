import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '15rem',
    backgroundColor: theme.palette.white.main,
    color: theme.palette.primary.textColor,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  userInfo: {
    flex: 1,
  },
  avatar: {
    width: '8.5rem',
    height: '8.5rem',
    margin: 'auto',
    backgroundColor: theme.palette.secondary.light,
    fontSize: '5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
      width: '5rem',
      height: '5rem',
    },
  },
  username: {
    color: theme.palette.primary.dark,
    textTransform: 'uppercase',
    fontWeight: 500,
    marginTop: '0.5rem',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      marginTop: '1.3rem',
    },
  },
  progressInfo: {
    flex: 3,
    paddingTop: '1rem',
    [theme.breakpoints.down('sm')]: {
      flex: 2,
    },
  },
  title: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
}))

export default useStyles
