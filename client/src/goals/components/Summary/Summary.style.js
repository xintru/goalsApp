import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '17rem',
    backgroundColor: 'white',
    color: theme.palette.primary,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  avatar: {
    width: '8rem',
    height: '8rem',
    margin: 'auto',
    backgroundColor: theme.palette.secondary.light,
    fontSize: '5rem',
  },
  username: {
    color: theme.palette.primary.dark,
    textTransform: 'uppercase',
    fontWeight: 500,
    marginTop: '1rem',
  },
  progressInfo: {
    flex: 3,
    height: '20rem',
    paddingTop: '7rem',
  },
  title: {
    textAlign: 'left',
  },
}))

export default useStyles
