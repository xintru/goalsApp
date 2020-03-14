import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    width: '20vw',
    minWidth: 300,
    height: '20rem',
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
})

export default useStyles
