import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 64px)',
  },
  card: {
    width: '20vw',
    minWidth: 300,
    minHeight: '20rem',
    padding: '2rem',
    boxSizing: 'border-box',
  },
}))

export default useStyles
