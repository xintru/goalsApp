import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: theme.palette.white.main,
    boxSizing: 'border-box',
    padding: 20,
    textAlign: 'center',
    position: 'relative',
  },
  titleBox: {
    margin: '0 auto',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
  title: {
    color: theme.palette.primary.dark,
    marginTop: '2rem',
    paddingBottom: '1rem',
    borderBottom: `2px solid ${theme.palette.secondary.light}`,
    [theme.breakpoints.down('sm')]: {
      marginTop: '3rem',
      fontSize: '1.5rem',
    },
  },
  description: {
    fontSize: '1.1rem',
    margin: '10px auto',
    height: 80,
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      fontSize: '1rem',
      margin: '40px auto',
    },
  },
  date: {
    marginBottom: '1rem',
    fontSize: '1rem',
    fontWeight: 500,
  },
  paper: {
    margin: '20px auto',
    minHeight: 100,
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      fontSize: '1rem',
    },
  },
  goalSteps: {
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  editBtns: {
    position: 'absolute',
    top: '1.5rem',
    right: '3rem',
    [theme.breakpoints.down('sm')]: {
      top: '0.5rem',
      right: '1rem',
    },
  },
  btn: {
    '&:last-child': {
      marginLeft: 15,
    },
  },
  backBtn: {
    position: 'absolute',
    left: '3rem',
    top: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      top: '1rem',
      left: '1rem',
    },
  },
  doneBtn: {
    marginTop: '1.5rem',
  }
}))

export default useStyles
