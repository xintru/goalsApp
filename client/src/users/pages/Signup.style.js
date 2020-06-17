import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 64px)',
  },
  paper: {
    display: 'flex',
    justifyContent: 'flex-end',
    minWidth: 300,
  },
  title: {
    textAlign: 'center',
  },
  card: {
    width: '20vw',
    minWidth: 300,
    minHeight: '25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  textField: {
    width: '100%',
  },
  submitButton: {
    marginTop: 20,
  },
})

export default useStyles
