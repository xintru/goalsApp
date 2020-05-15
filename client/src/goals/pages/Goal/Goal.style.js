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
  },
  title: {
    color: theme.palette.primary.dark,
    marginTop: '2rem',
    paddingBottom: '1rem',
    borderBottom: `2px solid ${theme.palette.secondary.light}`,
  },
  description: {
    fontSize: '1.1rem',
    margin: '20px auto',
    height: 80,
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalSteps: {
    margin: '20px auto',
    height: 100,
    width: '50%',
  },
  btn: {
    width: 130,
    marginTop: 15,
    '&:last-child': {
      marginLeft: 15,
    },
  },
  backBtn: {
    position: 'absolute',
    left: '3rem',
    top: '1.5rem',
  }
}))

export default useStyles
