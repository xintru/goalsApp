import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 64px)',
  },
  card: {
    width: '40vw',
    minWidth: 500,
    minHeight: '20rem',
    padding: '2rem',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
    },
  },
}))

export default useStyles
